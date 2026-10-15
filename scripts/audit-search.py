#!/usr/bin/env python3
"""Audit read-only du HTML, de l'indexabilité et du domaine canonique."""

import argparse
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from html.parser import HTMLParser
import json
from pathlib import Path
import sys
from urllib.error import HTTPError
from urllib.parse import urljoin, urlsplit, urlunsplit
from urllib.request import HTTPRedirectHandler, Request, build_opener
from urllib.robotparser import RobotFileParser
import xml.etree.ElementTree as ET


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.meta, self.links, self.schemas = {}, [], []
        self.canonical, self.icon, self.language = "", "", ""
        self.title, self.h1, self.h1_count = "", [], 0
        self.in_title = self.in_h1 = self.in_schema = False
        self.schema_text = ""

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "html":
            self.language = attrs.get("lang", "")
        elif tag == "meta":
            self.meta[attrs.get("name", attrs.get("property", ""))] = attrs.get("content", "")
        elif tag == "link":
            if attrs.get("rel") == "canonical":
                self.canonical = attrs.get("href", "")
            elif attrs.get("rel") == "icon":
                self.icon = attrs.get("href", "")
        elif tag == "a" and attrs.get("href"):
            self.links.append(attrs["href"])
        elif tag == "title":
            self.in_title = True
        elif tag == "h1":
            self.in_h1 = True
            self.h1_count += 1
        elif tag == "script" and attrs.get("type") == "application/ld+json":
            self.in_schema, self.schema_text = True, ""

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
        elif tag == "h1":
            self.in_h1 = False
        elif tag == "script" and self.in_schema:
            self.schemas.append(json.loads(self.schema_text))
            self.in_schema = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        if self.in_h1:
            self.h1.append(data)
        if self.in_schema:
            self.schema_text += data


def request(url, headers=None, follow=True):
    req = Request(url, headers={"User-Agent": "SeyaLabs-SEO-Audit/1.0", **(headers or {})})
    opener = build_opener() if follow else build_opener(NoRedirect())
    try:
        response = opener.open(req, timeout=20)
    except HTTPError as error:
        response = error
    with response:
        return response.status, response.url, response.headers, response.read().decode("utf-8", errors="replace")


def parse_page(path):
    status, final, headers, body = request(urljoin(args.url, path))
    page = Page()
    page.feed(body)
    nodes = [node for schema in page.schemas for node in schema.get("@graph", [schema])]
    robots = ", ".join([page.meta.get("robots", ""), page.meta.get("googlebot", ""), headers.get("X-Robots-Tag", "")]).lower()
    expected = urljoin(args.canonical_origin, path)
    errors = []
    for valid, message in [
        (status == 200, f"HTTP {status}"),
        (page.h1_count == 1, f"{page.h1_count} H1"),
        (bool(page.title), "titre absent"),
        (bool(page.meta.get("description")), "description absente"),
        (urlsplit(page.canonical)._replace(path=urlsplit(page.canonical).path or "/") == urlsplit(expected), "canonical incorrecte"),
        (("noindex" in robots) == args.preview, "indexabilité inattendue"),
        (page.language == "fr", "langue HTML incorrecte"),
        (bool(page.meta.get("og:title")) and bool(page.meta.get("twitter:card")), "métadonnées de partage absentes"),
        (sum(node.get("@type") == "Organization" for node in nodes) == 1, "identité Organization absente ou dupliquée"),
        (sum(node.get("@type") == "WebSite" for node in nodes) == 1, "identité WebSite absente ou dupliquée"),
    ]:
        if not valid:
            errors.append(message)
    if path != "/":
        crumbs = next((node for node in nodes if node.get("@type") == "BreadcrumbList"), {})
        if not crumbs.get("itemListElement") or crumbs["itemListElement"][-1].get("item") != expected:
            errors.append("fil d’Ariane absent ou incorrect")
    return {"path": path, "status": status, "final_url": final, "title": page.title,
            "description": page.meta.get("description"), "h1": " ".join(page.h1),
            "canonical": page.canonical, "robots": robots, "schemas": nodes,
            "links": page.links, "favicon": page.icon, "errors": errors,
            "verification_meta": bool(page.meta.get("google-site-verification"))}


parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--url", default="http://localhost:3100")
parser.add_argument("--canonical-origin", default="https://seyalabs.com")
parser.add_argument("--preview", action="store_true", help="Attend noindex sur toutes les pages de la preview")
parser.add_argument("--output", default="test-results/search-audit.json")
args = parser.parse_args()
args.url = args.url.rstrip("/") + "/"
args.canonical_origin = args.canonical_origin.rstrip("/") + "/"

status, _, _, sitemap = request(urljoin(args.url, "sitemap.xml"))
if status != 200:
    sys.exit(f"Sitemap inaccessible : HTTP {status}")
locations = [element.text for element in ET.fromstring(sitemap).iter() if element.tag.endswith("}loc")]
paths = [urlsplit(url).path or "/" for url in locations]
report = {"checked_at": datetime.now(timezone.utc).isoformat(), "target": args.url,
          "preview": args.preview, "pages": [], "errors": [], "warnings": []}
if not paths or len(paths) != len(set(paths)):
    report["errors"].append("Sitemap vide ou URL dupliquées")
if any(urlsplit(url).netloc != urlsplit(args.canonical_origin).netloc for url in locations):
    report["errors"].append("Le sitemap contient un domaine non canonique")

with ThreadPoolExecutor(max_workers=4) as pool:
    for path, future in [(path, pool.submit(parse_page, path)) for path in paths]:
        try:
            report["pages"].append(future.result())
        except Exception as error:
            report["errors"].append(f"{path}: {error}")

for field in ("title", "description"):
    values = [page[field] for page in report["pages"]]
    if len(values) != len(set(values)):
        report["errors"].append(f"{field}: valeurs dupliquées")
for page in report["pages"]:
    report["errors"].extend(f"{page['path']}: {error}" for error in page["errors"])

inbound = {path: 0 for path in paths}
for page in report["pages"]:
    destinations = set()
    for href in page["links"]:
        link = urlsplit(urljoin(page["canonical"], href))
        if link.netloc == urlsplit(args.canonical_origin).netloc:
            destinations.add(link.path or "/")
    for path in destinations:
        if path in inbound and path != page["path"]:
            inbound[path] += 1
report["internal_inbound_links"] = inbound
report["errors"].extend(f"{path}: page orpheline" for path, count in inbound.items() if path != "/" and not count)

status, _, _, robots = request(urljoin(args.url, "robots.txt"))
robot_parser = RobotFileParser()
robot_parser.parse(robots.splitlines())
if status != 200 or not robot_parser.can_fetch("Googlebot", args.url):
    report["errors"].append("robots.txt bloque l’accueil ou est inaccessible")
if urljoin(args.canonical_origin, "sitemap.xml") not in robots:
    report["errors"].append("Sitemap absent de robots.txt")

home = next((page for page in report["pages"] if page["path"] == "/"), None)
if home:
    website = next((node for node in home["schemas"] if node.get("@type") == "WebSite"), {})
    organization = next((node for node in home["schemas"] if node.get("@type") == "Organization"), {})
    if website.get("name") != "SEYA LABS" or organization.get("name") != "SEYA LABS":
        report["errors"].append("Nom de marque incohérent dans les identités")
    report["search_console_html_verification_present"] = home["verification_meta"]
    report["search_console_note"] = "L’absence de balise ne permet pas de conclure sur une éventuelle validation DNS."
    for asset in [home["favicon"], organization.get("logo")]:
        if isinstance(asset, dict):
            asset = asset.get("contentUrl") or asset.get("url")
        if not asset:
            report["errors"].append("Favicon ou logo absent")
            continue
        asset_path = urlsplit(asset).path
        if request(urljoin(args.url, asset_path))[0] != 200:
            report["errors"].append(f"Asset de marque inaccessible : {asset_path}")

# Sur une preview, le Host simule www sans modifier le DNS ni contacter la production.
redirect_path = "/solutions/application-metier?source=seo-audit"
is_local = urlsplit(args.url).hostname in ("localhost", "127.0.0.1")
redirect_target = urljoin(args.url, redirect_path) if is_local else urlunsplit(("https", "www.seyalabs.com", "/solutions/application-metier", "source=seo-audit", ""))
status, _, headers, _ = request(redirect_target, headers={"Host": "www.seyalabs.com"} if is_local else None, follow=False)
location = headers.get("Location", "")
report["www_redirect"] = {"status": status, "location": location}
if status not in (301, 308) or location != urljoin(args.canonical_origin, redirect_path):
    report["warnings"].append("www ne redirige pas définitivement vers le domaine canonique en conservant chemin et paramètres")

output = Path(args.output)
output.parent.mkdir(parents=True, exist_ok=True)
output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
print(f"{len(report['pages'])} pages — {len(report['errors'])} erreur(s), {len(report['warnings'])} avertissement(s). Rapport : {output}")
for message in report["errors"][:10] + report["warnings"]:
    print(f"- {message}")
sys.exit(1 if report["errors"] else 0)
