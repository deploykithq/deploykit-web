import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";
import { createHighlighter } from "shiki";

import type { Plugin } from "vite";
import type { Tokens } from "marked";

const VIRTUAL_ID = "virtual:blog-posts";
const RESOLVED_ID = `\0${VIRTUAL_ID}`;

const LOCALES = ["en", "es"] as const;
const REQUIRED_FIELDS = ["title", "description", "slug", "date", "author"] as const;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const WORDS_PER_MINUTE = 200;

const LANGUAGES = [
  "bash", "shell", "yaml", "json", "javascript", "typescript", "tsx", "jsx", "dockerfile",
  "nginx", "toml", "ini", "diff", "sql", "python", "go", "html", "css", "markdown",
] as const;
const LANGUAGE_ALIASES: Record<string, string> = { sh: "bash", zsh: "bash", console: "bash", yml: "yaml", js: "javascript", ts: "typescript", docker: "dockerfile", env: "ini", md: "markdown" };

interface TocEntryI {
  id: string;
  text: string;
  depth: number;
}

interface CompiledPostI {
  key: string;
  locale: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string | null;
  tags: string[];
  cover: string | null;
  author: string;
  readingMinutes: number;
  toc: TocEntryI[];
  html: string;
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const stripTags = (value: string) => value.replace(/<[^>]+>/g, "");

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** YAML convierte `2026-10-15` en Date; los posts llevan fechas ISO simples. */
const toIsoDate = (value: unknown, field: string, file: string): string => {
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) throw new Error(`${file}: "${field}" is not a valid date`);
  return date.toISOString().slice(0, 10);
};

const highlighterPromise = createHighlighter({ themes: ["vitesse-black"], langs: [...LANGUAGES] });

const compileMarkdown = async (source: string) => {
  const highlighter = await highlighterPromise;
  const toc: TocEntryI[] = [];
  const usedIds = new Map<string, number>();
  const marked = new Marked({ gfm: true });

  marked.use({
    renderer: {
      heading(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, { tokens, depth }: Tokens.Heading) {
        const inner = this.parser.parseInline(tokens);
        const text = stripTags(inner);
        const base = slugify(text) || "section";
        const seen = usedIds.get(base) ?? 0;
        usedIds.set(base, seen + 1);
        const id = seen ? `${base}-${seen}` : base;
        if (depth === 2 || depth === 3) toc.push({ id, text, depth });
        return `<h${depth} id="${id}"><a href="#${id}" class="heading-anchor" aria-hidden="true" tabindex="-1">#</a>${inner}</h${depth}>\n`;
      },
      code({ text, lang }: Tokens.Code) {
        const requested = (lang ?? "").trim().split(/\s+/)[0].toLowerCase();
        const language = LANGUAGE_ALIASES[requested] ?? requested;
        const supported = (LANGUAGES as readonly string[]).includes(language);
        const code = supported
          ? highlighter.codeToHtml(text, { lang: language, theme: "vitesse-black" })
          : `<pre class="shiki"><code>${escapeHtml(text)}</code></pre>`;
        const label = escapeHtml(requested || "text");
        return `<div class="code-block"><div class="code-block-bar"><span>${label}</span><button type="button" data-copy aria-label="Copy ${label} snippet">[ copy ]</button></div>${code}</div>\n`;
      },
      link(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, { href, title, tokens }: Tokens.Link) {
        const inner = this.parser.parseInline(tokens);
        const external = /^https?:\/\//.test(href) && !href.startsWith("https://deploykit.es");
        const titleAttr = title ? ` title="${escapeHtml(title)}"` : "";
        const rel = external ? ` target="_blank" rel="noopener noreferrer"` : "";
        return `<a href="${escapeHtml(href)}"${titleAttr}${rel}>${inner}</a>`;
      },
      image({ href, title, text }: Tokens.Image) {
        const titleAttr = title ? ` title="${escapeHtml(title)}"` : "";
        return `<img src="${escapeHtml(href)}" alt="${escapeHtml(text)}"${titleAttr} loading="lazy" decoding="async" />`;
      },
    },
  });

  const html = await marked.parse(source);
  return { html, toc };
};

const loadPosts = async (dir: string, includeDrafts: boolean): Promise<{ posts: CompiledPostI[]; files: string[] }> => {
  if (!fs.existsSync(dir)) return { posts: [], files: [] };

  const posts: CompiledPostI[] = [];
  const files: string[] = [];
  const slugs = new Map<string, string>();

  const keys = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  for (const key of keys) {
    const sources = LOCALES.map((locale) => {
      const file = path.join(dir, key, `${locale}.md`);
      if (!fs.existsSync(file)) {
        throw new Error(`[blog] content/blog/${key} is missing its "${locale}" translation (${locale}.md). Every post must exist in: ${LOCALES.join(", ")}.`);
      }
      files.push(file);
      return { locale, file, parsed: matter(fs.readFileSync(file, "utf8")) };
    });

    // Un borrador en cualquier idioma deja todo el post fuera de los builds de producción.
    if (!includeDrafts && sources.some(({ parsed }) => parsed.data.draft === true)) continue;

    for (const { locale, file, parsed } of sources) {
      const rel = path.relative(process.cwd(), file);
      const data = parsed.data as Record<string, unknown>;

      for (const field of REQUIRED_FIELDS) {
        if (data[field] === undefined || data[field] === "") throw new Error(`[blog] ${rel}: missing frontmatter field "${field}"`);
      }
      const slug = String(data.slug);
      if (!SLUG_PATTERN.test(slug)) throw new Error(`[blog] ${rel}: slug "${slug}" must be lowercase kebab-case`);
      const slugKey = `${locale}:${slug}`;
      if (slugs.has(slugKey)) throw new Error(`[blog] ${rel}: slug "${slug}" is already used by ${slugs.get(slugKey)}`);
      slugs.set(slugKey, rel);

      const { html, toc } = await compileMarkdown(parsed.content);
      const words = stripTags(html).split(/\s+/).filter(Boolean).length;

      posts.push({
        key,
        locale,
        slug,
        title: String(data.title),
        description: String(data.description),
        date: toIsoDate(data.date, "date", rel),
        updated: data.updated ? toIsoDate(data.updated, "updated", rel) : null,
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        cover: data.cover ? String(data.cover) : null,
        author: String(data.author),
        readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
        toc,
        html,
      });
    }
  }

  posts.sort((a, b) => b.date.localeCompare(a.date));
  return { posts, files };
};

/**
 * Compila `content/blog/<key>/<locale>.md` en build al
 * módulo `virtual:blog-posts`: frontmatter, HTML con código resaltado, TOC y
 * tiempo de lectura. El build falla si falta una traducción o el frontmatter es incorrecto.
 */
export const blogPlugin = (contentDir = "content/blog"): Plugin => {
  let dir = "";
  let includeDrafts = false;

  return {
    name: "deploykit-blog",
    configResolved(config) {
      dir = path.resolve(config.root, contentDir);
      includeDrafts = config.command === "serve";
    },
    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : undefined;
    },
    async load(id) {
      if (id !== RESOLVED_ID) return undefined;
      const { posts, files } = await loadPosts(dir, includeDrafts);
      files.forEach((file) => this.addWatchFile(file));
      return `export default ${JSON.stringify(posts)};`;
    },
    configureServer(server) {
      server.watcher.add(dir);
      const reload = (file: string) => {
        if (!path.resolve(file).startsWith(dir)) return;
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: "full-reload" });
      };
      server.watcher.on("add", reload);
      server.watcher.on("change", reload);
      server.watcher.on("unlink", reload);
    },
  };
};
