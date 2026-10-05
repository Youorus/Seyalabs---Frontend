import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, extname, sep } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));
const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json", ".md": "text/plain; charset=utf-8", ".mp4": "video/mp4", ".png": "image/png", ".wav": "audio/wav", ".mp3": "audio/mpeg", ".srt": "text/plain; charset=utf-8" };
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    const path = resolve(root, `.${pathname === "/" ? "/production.html" : pathname}`);
    if (!path.startsWith(`${root}${sep}`) || !mime[extname(path)] || pathname.includes("/audio/") || pathname.includes("render-film") || pathname.includes("preview.mjs")) { res.writeHead(404); res.end("Introuvable"); return; }
    const info = await stat(path);
    res.setHeader("Content-Type", mime[extname(path)]); res.setHeader("X-Robots-Tag", "noindex"); res.setHeader("Cache-Control", "no-store");
    if (req.headers.range && /\.(mp4|mp3|wav)$/.test(path)) {
      const match = req.headers.range.match(/^bytes=(\d+)-(\d*)$/);
      if (!match) { res.writeHead(416); res.end(); return; }
      const start = Number(match[1]), end = match[2] ? Math.min(Number(match[2]), info.size - 1) : info.size - 1;
      if (start > end || start >= info.size) { res.writeHead(416); res.end(); return; }
      res.writeHead(206, { "Content-Range": `bytes ${start}-${end}/${info.size}`, "Accept-Ranges": "bytes", "Content-Length": end - start + 1 }); createReadStream(path, { start, end }).pipe(res);
    } else if (/\.(mp4|mp3|wav)$/.test(path)) {
      res.writeHead(200, { "Content-Length": info.size, "Accept-Ranges": "bytes" }); createReadStream(path).pipe(res);
    } else { res.writeHead(200); res.end(await readFile(path)); }
  } catch { res.writeHead(404); res.end("Introuvable"); }
});
server.listen(Number(process.env.SEYA_MOTION_PORT || 3210), "127.0.0.1", () => console.log(`Aperçu du film : http://localhost:${server.address().port}`));
