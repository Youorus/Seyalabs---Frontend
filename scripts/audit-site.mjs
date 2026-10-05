import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const base = process.env.AUDIT_URL || 'http://localhost:3000';
const output = new URL('../test-results/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch(process.platform === 'darwin' ? { executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' } : {});
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
await context.route(/https:\/\/([^/]*\.)?(googletagmanager\.com|google-analytics\.com|analytics\.google\.com|doubleclick\.net)\//, (route) => route.abort());
const page = await context.newPage();
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
const xml = await (await fetch(`${base}/sitemap.xml`)).text();
const paths = [...new Set([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]).pathname).concat(['/realisations', '/mentions-legales', '/confidentialite']))];
const report = { pages: [], viewports: [], interactions: [], pageErrors: errors };
const titles = new Set();
const descriptions = new Set();
const internalLinks = new Set();
const linkGraph = new Map();
const trainingEnquiries = [];
const sitemapPaths = new Set([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]).pathname));
const canonicalOrigin = new URL([...xml.matchAll(/<loc>(.*?)<\/loc>/g)][0][1]).origin;
try {
  await page.goto(base, { waitUntil: 'networkidle' });
  const refusal = page.locator('.consent-banner').getByRole('button', { name: 'Tout refuser', exact: true });
  if (await refusal.count()) await refusal.click();
  for (const path of paths) {
    const response = await page.goto(`${base}${path}`, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200, `${path}: expected 200`);
    if (path === '/') await page.screenshot({ path: new URL('home-hero.png', output).pathname });
    assert.equal(await page.locator('h1').count(), 1, `${path}: one H1`);
    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    assert.ok(title && !titles.has(title), `${path}: unique title`); titles.add(title);
    assert.ok(description && !descriptions.has(description), `${path}: unique description`); descriptions.add(description);
    assert.equal(new URL(canonical).href, new URL(path, canonicalOrigin).href);
    assert.equal(await page.locator('html').getAttribute('lang'), 'fr');
    assert.ok(await page.locator('meta[property="og:title"]').getAttribute('content'));
    assert.ok(await page.locator('meta[name="twitter:card"]').getAttribute('content'));
    const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((script) => JSON.parse(script));
    if (path.startsWith('/insights/')) {
      const articleSchema = schemas.find((schema) => schema['@type'] === 'Article');
      assert.ok(articleSchema, `${path}: Article schema`);
      assert.equal(articleSchema.mainEntityOfPage, new URL(path, canonicalOrigin).href);
      assert.equal(articleSchema.headline, await page.locator('h1').innerText());
      assert.equal(articleSchema.datePublished.slice(0, 10), await page.locator('.article-byline time').getAttribute('datetime'));
    }
    if (path.startsWith('/formations/')) {
      const courseSchema = schemas.find((schema) => schema['@type'] === 'Course');
      assert.ok(courseSchema, `${path}: Course schema`);
      assert.equal(courseSchema.url, new URL(path, canonicalOrigin).href);
      assert.equal(courseSchema.name, await page.locator('.course-name').innerText());
      assert.deepEqual(courseSchema.teaches, await page.locator('.training-objective-list li').allTextContents());
      assert.equal(courseSchema.provider.name, 'SEYA LABS');
      const contactHref = await page.getByRole('link', { name: 'Demander cette formation', exact: true }).getAttribute('href');
      const contactUrl = new URL(contactHref, canonicalOrigin);
      assert.equal(contactUrl.searchParams.get('type'), 'formation');
      assert.equal(contactUrl.searchParams.get('formation'), path.split('/').at(-1));
      trainingEnquiries.push({ href: contactHref, name: courseSchema.name });
      const solutionPath = `/solutions/${path.split('/').at(-1)}`;
      if (sitemapPaths.has(solutionPath)) assert.equal(await page.locator(`main a[href="${solutionPath}"]`).count(), 1, `${path}: link to corresponding delivery service`);
    }
    if (/^\/(expertises|solutions)\/.+/.test(path)) {
      assert.equal(await page.locator('.service-training-link a').getAttribute('href'), `/formations/${path.split('/').at(-1)}`, `${path}: corresponding training available`);
      assert.equal(await page.locator('.service-decisions').count(), 1, `${path}: scope and tradeoffs explained`);
      assert.ok(await page.locator('.guidance-acceptance li').count() >= 3, `${path}: practical acceptance criteria`);
    }
    if (path === '/formations') {
      const catalogue = schemas.find((schema) => schema['@type'] === 'ItemList');
      assert.equal(catalogue.numberOfItems, await page.locator('.training-card').count());
      assert.equal(catalogue.itemListElement.length, catalogue.numberOfItems);
      assert.equal(await page.locator('.training-family').count(), 4);
      for (const href of await page.locator('.training-family-nav a').evaluateAll((links) => links.map((link) => link.getAttribute('href')))) {
        assert.equal(await page.locator(href).count(), 1, `${path}: valid family anchor`);
      }
    }
    const robots = await page.locator('meta[name="robots"]').getAttribute('content');
    const googleBot = await page.locator('meta[name="googlebot"]').getAttribute('content');
    if (process.env.AUDIT_INDEXABLE && sitemapPaths.has(path)) {
      assert.equal(/\bnoindex\b/.test(robots), process.env.AUDIT_INDEXABLE !== 'true', `${path}: indexability`);
      assert.equal(/\bnoindex\b/.test(googleBot), process.env.AUDIT_INDEXABLE !== 'true', `${path}: Google indexability`);
    }
    if (await page.locator('.legal-content .notice, .empty-work').count()) assert.ok(/\bnoindex\b/.test(robots), `${path}: exclude unpublished proof or incomplete legal content`);
    assert.ok(googleBot.includes('max-image-preview:large'), `${path}: image preview`);
    const text = await page.locator('body').innerText();
    assert.ok(!/lorem ipsum|placeholder/i.test(text), `${path}: no placeholders`);
    const links = await page.locator('a[href]').evaluateAll((links) => links.map((link) => link.getAttribute('href')));
    links.filter((href) => href.startsWith('/') && !href.startsWith('//')).forEach((href) => internalLinks.add(href.split('#')[0]));
    linkGraph.set(path, links.filter((href) => href.startsWith('/') && !href.startsWith('//')).map((href) => href.split(/[?#]/)[0]));
    const mainWords = (await page.locator('main').innerText()).trim().split(/\s+/).length;
    const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    report.pages.push({ path, title, canonical, robots, mainWords, accessibilityViolations: axe.violations.map(({ id, nodes }) => ({ id, targets: nodes.map((node) => node.target) })) });
    console.log(`${path} — ${axe.violations.length} accessibility violation(s)`);
  }
  for (const href of internalLinks) { const response = await fetch(`${base}${href}`); assert.equal(response.status, 200, `Broken link: ${href}`); }
  console.log(`${internalLinks.size} internal destinations verified.`);
  const depth = new Map([['/', 0]]);
  const pending = ['/'];
  for (let i = 0; i < pending.length; i++) {
    for (const destination of linkGraph.get(pending[i]) || []) {
      if (sitemapPaths.has(destination) && !depth.has(destination)) { depth.set(destination, depth.get(pending[i]) + 1); pending.push(destination); }
    }
  }
  for (const path of sitemapPaths) { assert.ok(depth.has(path), `Orphaned indexable page: ${path}`); assert.ok(depth.get(path) <= 3, `Page too deep: ${path}`); }
  report.crawl = { indexablePages: sitemapPaths.size, maxDepth: Math.max(...depth.values()), orphanedPages: 0 };
  const crawlerContext = await browser.newContext({ javaScriptEnabled: false });
  const crawler = await crawlerContext.newPage();
  const crawlerPaths = paths.filter((path) => /^\/(insights|expertises|solutions|formations)\/.+/.test(path));
  for (const path of crawlerPaths) {
    await crawler.goto(`${base}${path}`);
    const renderedText = await crawler.locator('main').innerText();
    assert.equal(await crawler.locator('main h1').count(), 1, `${path}: heading available without JavaScript`);
    assert.ok(renderedText.length > 1500, `${path}: main content available without JavaScript`);
    assert.ok(await crawler.locator('main a[href^="/solutions/"], main a[href^="/expertises/"]').count() > 0, `${path}: crawlable service links`);
  }
  await crawlerContext.close();
  report.interactions.push({ name: `Content available without JavaScript on ${crawlerPaths.length} commercial and editorial pages`, passed: true });
  await page.goto(`${base}/insights/cahier-des-charges-application-metier`);
  const downloadEvent = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Télécharger le modèle gratuit' }).click();
  const download = await downloadEvent;
  assert.equal(download.suggestedFilename(), 'modele-cahier-des-charges-application-metier.md');
  assert.equal(await download.failure(), null);
  report.interactions.push({ name: 'Free project brief template download', passed: true });
  for (const width of [375, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of ['/', '/contact', '/solutions/assistant-ia', '/solutions/application-metier', '/solutions/plateformes-web-mobile', '/solutions/saas', '/insights', '/insights/quand-remplacer-excel-par-une-application-metier', '/insights/logiciel-sur-mesure-ou-saas', '/insights/cahier-des-charges-application-metier', '/formations', ...paths.filter((item) => item.startsWith('/formations/'))]) {
      await page.goto(`${base}${path}`, { waitUntil: 'networkidle' });
      const dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
      report.viewports.push({ width, path, overflow: dimensions.scroll > dimensions.width });
      assert.ok(dimensions.scroll <= dimensions.width, `Overflow at ${width}px on ${path}: ${JSON.stringify(dimensions)}`);
    }
    if ([375, 1440].includes(width)) { await page.goto(base, { waitUntil: 'networkidle' }); await page.screenshot({ path: new URL(`home-${width}.png`, output).pathname, fullPage: true }); }
  }
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto(base);
  await page.getByRole('button', { name: 'Ouvrir le menu' }).click();
  assert.equal(await page.getByRole('dialog').isVisible(), true);
  const menuAxe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  report.interactions.push({ name: 'Mobile menu', violations: menuAxe.violations.map(({ id }) => id) });
  await page.keyboard.press('Escape');
  assert.equal(await page.getByRole('dialog').isVisible(), false);
  assert.equal(await page.getByRole('button', { name: 'Ouvrir le menu' }).evaluate((el) => el === document.activeElement), true);
  await page.getByRole('button', { name: 'Ouvrir le menu' }).click();
  await page.getByRole('navigation', { name: 'Navigation mobile' }).getByRole('link', { name: 'Formations' }).click();
  await page.waitForURL('**/formations');
  assert.equal(await page.getByRole('dialog').isVisible(), false);
  await page.screenshot({ path: new URL('formations-375.png', output).pathname, fullPage: true });
  report.interactions.push({ name: 'Training tab in mobile navigation', passed: true });
  await page.goto(`${base}/contact`);
  await page.getByRole('button', { name: 'Envoyer mon projet' }).click();
  assert.ok(await page.locator('[aria-invalid="true"]').count() >= 7);
  assert.equal(await page.locator('#name').evaluate((el) => el === document.activeElement), true);
  await page.locator('#name').fill('Camille Martin');
  await page.locator('#company').fill('Exemple de test');
  await page.locator('#email').fill('camille@example.org');
  await page.locator('#projectType').selectOption('Application métier');
  await page.locator('#budget').selectOption('À définir');
  await page.locator('#timeline').selectOption('Exploration');
  await page.locator('#message').fill('Nous souhaitons centraliser la gestion des dossiers de notre équipe.');
  await page.locator('#consent').check();
  // No email is sent, and no external webhook is called by this audit.
  await page.route('**/api/contact', (route) => route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ error: 'Envoi de test désactivé.' }) }));
  await page.getByRole('button', { name: 'Envoyer mon projet' }).click();
  assert.equal(await page.locator('a[href^="mailto:"]').count() > 1, true);
  await page.evaluate(() => { document.activeElement?.blur(); window.scrollTo(0, 0); });
  await page.screenshot({ path: new URL('contact-375.png', output).pathname, fullPage: true });
  report.interactions.push({ name: 'Form validation, focus and email fallback', passed: true });
  await page.goto(`${base}/formations`);
  await page.locator('.training-card').filter({ has: page.getByRole('heading', { name: 'Automatisation & workflows métier', exact: true }) }).getByRole('link', { name: 'Voir le programme' }).click();
  await page.waitForURL('**/formations/automatisation');
  await page.getByRole('link', { name: 'Demander cette formation', exact: true }).click();
  await page.waitForURL('**/contact?type=formation&formation=automatisation');
  assert.equal(await page.locator('#projectType').inputValue(), 'Formation');
  assert.ok((await page.locator('#message').inputValue()).includes('Automatisation & workflows métier'));
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), `${canonicalOrigin}/contact`);
  await page.locator('#name').fill('Camille Martin');
  await page.locator('#company').fill('Exemple de test');
  await page.locator('#email').fill('camille@example.org');
  await page.locator('#budget').selectOption('À définir');
  await page.locator('#timeline').selectOption('Exploration');
  await page.locator('#message').fill(`${await page.locator('#message').inputValue()}Participants : 6. Objectif : construire un premier workflow de suivi.`);
  await page.locator('#consent').check();
  await page.getByRole('button', { name: 'Envoyer ma demande', exact: true }).click();
  const trainingEmail = new URL(await page.locator('form a[href^="mailto:"][href*="?subject="]').getAttribute('href'));
  assert.equal(trainingEmail.searchParams.get('subject'), 'Formation — Exemple de test');
  assert.ok(trainingEmail.searchParams.get('body').includes('Type de demande : Formation'));
  assert.ok(trainingEmail.searchParams.get('body').includes('Automatisation & workflows métier'));
  const trainingFormAxe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  assert.equal(trainingFormAxe.violations.length, 0, 'Training enquiry form accessibility');
  report.interactions.push({ name: 'Training catalogue to prefilled enquiry and qualified email fallback', passed: true });
  for (const enquiry of trainingEnquiries) {
    await page.goto(`${base}${enquiry.href}`);
    assert.equal(await page.locator('#projectType').inputValue(), 'Formation');
    assert.ok((await page.locator('#message').inputValue()).includes(enquiry.name), `${enquiry.name}: prefilled training`);
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), `${canonicalOrigin}/contact`);
  }
  report.interactions.push({ name: `Prefilled enquiries for all ${trainingEnquiries.length} programmes`, passed: true });
  await page.goto(base);
  await page.getByRole('tab', { name: '02 DESIGN' }).click();
  assert.equal(await page.getByRole('tabpanel').filter({ visible: true }).getByRole('heading').innerText(), 'Dessiner le système.');
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.getByRole('tab', { name: '03 BUILD' }).getAttribute('aria-selected'), 'true');
  await page.getByRole('button', { name: 'Simplifier le système' }).click();
  assert.equal(await page.getByRole('button', { name: 'Voir les connexions' }).getAttribute('aria-pressed'), 'true');
  report.interactions.push({ name: 'Timeline keyboard and System Flow', passed: true });
  const normalContext = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' });
  const normal = await normalContext.newPage();
  normal.on('pageerror', (error) => errors.push(error.message));
  await normal.goto(base, { waitUntil: 'networkidle' });
  await normal.evaluate(() => window.scrollTo(0, 400));
  await normal.waitForFunction(() => Number(document.querySelector('.system-flow').style.getPropertyValue('--flow-progress')) > 0.1);
  await normal.getByRole('tab', { name: '02 DESIGN' }).click();
  await normal.waitForFunction(() => document.getElementById('process-panel-1').getAnimations().some((animation) => animation.playState === 'running'));
  await normal.waitForFunction(() => getComputedStyle(document.getElementById('process-panel-1')).opacity === '1');
  await normal.locator('header').getByRole('link', { name: 'Démarrer un projet', exact: true }).click();
  await normal.waitForURL('**/contact');
  await normal.waitForFunction(() => window.scrollY < 2);
  assert.ok((await normal.locator('h1').innerText()).includes('besoin'));
  assert.equal(await normal.locator('body').evaluate((el) => getComputedStyle(el).backgroundColor), 'rgb(243, 240, 232)');
  await normal.screenshot({ path: new URL('contact-desktop.png', output).pathname, fullPage: true });
  await normal.locator('header').getByRole('link', { name: 'Solutions', exact: true }).click();
  await normal.waitForURL('**/solutions');
  await normal.locator('.business-need').filter({ has: normal.getByRole('heading', { name: 'Assistant IA', exact: true }) }).getByRole('link').click();
  await normal.waitForURL('**/solutions/assistant-ia');
  await normal.waitForFunction(() => window.scrollY < 2);
  await normal.screenshot({ path: new URL('service-desktop.png', output).pathname });
  report.interactions.push({ name: 'Scroll motion, Framer Motion on interaction and client navigation', passed: true });
  const og = await fetch(`${base}/opengraph-image`);
  assert.equal(og.status, 200);
  assert.ok(og.headers.get('content-type').includes('image/png'));
  await writeFile(new URL('open-graph.png', output), Buffer.from(await og.arrayBuffer()));
  await normalContext.close();
  assert.equal((await fetch(`${base}/solutions/non-existent`)).status, 404);
  assert.equal((await fetch(`${base}/realisations/non-existent`)).status, 404);
  assert.equal((await fetch(`${base}/formations/non-existent`)).status, 404);
  assert.equal(errors.length, 0, `Browser errors: ${errors.join(', ')}`);
  const violations = report.pages.flatMap((item) => item.accessibilityViolations);
  assert.equal(violations.length, 0, `Accessibility violations: ${JSON.stringify(violations)}`);
  assert.equal(menuAxe.violations.length, 0, 'Mobile menu accessibility');
  console.log(`PASS: ${paths.length} pages, ${report.viewports.length} responsive checks, form and navigation interactions.`);
} finally {
  await writeFile(new URL('audit.json', output), JSON.stringify(report, null, 2));
  await browser.close();
}
