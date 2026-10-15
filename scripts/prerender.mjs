// Escribe HTML estático de cada ruta tras `vite build` + el build SSR de src/entry-server.tsx.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const dist = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

const { render, getPrerenderPaths, buildSitemap, buildRss } = await import(pathToFileURL(ssrEntry).href);

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
if (!template.includes("<!--app-head-->") || !template.includes('<div id="root"></div>')) {
  throw new Error("dist/index.html is missing the <!--app-head--> or #root placeholder");
}

const write = (file, contents) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, contents);
};

const toHtml = (url) => {
  const { html, head, lang } = render(url);
  return template
    .replace('<html lang="en">', `<html lang="${lang}">`)
    .replace("<!--app-head-->", head)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
};

// Cada página se escribe como `docs/cli.html` y como `docs/cli/index.html`: los servidores estáticos
// difieren en cuál usan para resolver `/docs/cli` (vite preview / sirv, Netlify, nginx try_files…).
const routes = getPrerenderPaths();
for (const url of routes) {
  const html = toHtml(url);
  if (url === "/") {
    write(path.join(dist, "index.html"), html);
    continue;
  }
  write(path.join(dist, `${url}.html`), html);
  write(path.join(dist, url, "index.html"), html);
}

// Los hosts los sirven para rutas desconocidas; uno por locale para que el 404 salga en el idioma del visitante.
write(path.join(dist, "404.html"), toHtml("/404"));
write(path.join(dist, "es", "404.html"), toHtml("/es/404"));

write(path.join(dist, "sitemap.xml"), buildSitemap());
write(path.join(dist, "rss.xml"), buildRss("en"));
write(path.join(dist, "es", "rss.xml"), buildRss("es"));

fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });

console.log(`prerendered ${routes.length} pages + 404s, sitemap.xml and RSS feeds`);
