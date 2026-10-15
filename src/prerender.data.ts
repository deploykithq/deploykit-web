import { BlogAdapter } from "@blog/application/adapters/blog.adapter";
import { BlogUseCases } from "@blog/infrastructure/usecases/blog.usecases";
import { DOCS_SECTION_IDS } from "@docs/infrastructure/ui/constants/docs.constants";

import { DICTIONARIES } from "@lib/i18n/useLocale";

import { DEFAULT_LOCALE, LOCALES, localePath } from "@lib/i18n/locales";
import { blogPath, postPath } from "@blog/infrastructure/ui/utils/blogPaths";
import { docsPath } from "@docs/infrastructure/ui/utils/docsPath";
import { absoluteUrl, SITE_NAME } from "@lib/seo/site";

import type { LocaleT } from "@lib/i18n/locales";

const blog = new BlogUseCases(new BlogAdapter());

interface SitemapEntryI {
  /** La misma página en cada locale. */
  paths: Record<LocaleT, string>;
  lastmod?: string;
}

const perLocale = (build: (locale: LocaleT) => string): Record<LocaleT, string> =>
  Object.fromEntries(LOCALES.map((l) => [l, build(l)])) as Record<LocaleT, string>;

const sitemapEntries = (): SitemapEntryI[] => {
  const posts = blog.listPosts(DEFAULT_LOCALE);
  const latestPost = posts[0]?.updated ?? posts[0]?.date;

  return [
    { paths: perLocale((l) => localePath(l, "/")) },
    ...DOCS_SECTION_IDS.map((id) => ({ paths: perLocale((l) => docsPath(l, id)) })),
    { paths: perLocale(blogPath), lastmod: latestPost },
    ...posts.map((post) => {
      const translations = blog.getTranslations(post.key);
      return {
        paths: perLocale((l) => postPath(l, translations[l]!.slug)),
        lastmod: post.updated ?? post.date,
      };
    }),
  ];
};

/** Todas las URL que debe escribir el prerender, en ambos locales. */
export const getPrerenderPaths = (): string[] =>
  sitemapEntries().flatMap((entry) => LOCALES.map((l) => entry.paths[l]));

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const buildSitemap = (): string => {
  const urls = sitemapEntries().flatMap((entry) =>
    LOCALES.map((locale) => {
      const links = [
        ...LOCALES.map(
          (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${absoluteUrl(entry.paths[l])}" />`,
        ),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(entry.paths[DEFAULT_LOCALE])}" />`,
      ];
      return [
        "  <url>",
        `    <loc>${absoluteUrl(entry.paths[locale])}</loc>`,
        ...(entry.lastmod ? [`    <lastmod>${entry.lastmod}</lastmod>`] : []),
        ...links,
        "  </url>",
      ].join("\n");
    }),
  );

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
};

export const buildRss = (locale: LocaleT): string => {
  const t = DICTIONARIES[locale];
  const posts = blog.listPosts(locale);
  const feedUrl = absoluteUrl(localePath(locale, "/rss.xml"));

  const items = posts.map((post) => {
    const url = absoluteUrl(postPath(locale, post.slug));
    return [
      "    <item>",
      `      <title>${escapeXml(post.title)}</title>`,
      `      <link>${url}</link>`,
      `      <guid isPermaLink="true">${url}</guid>`,
      `      <description>${escapeXml(post.description)}</description>`,
      `      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>`,
      ...post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`),
      "    </item>",
    ].join("\n");
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(`${SITE_NAME} — ${t.blog.title}`)}</title>`,
    `    <link>${absoluteUrl(blogPath(locale))}</link>`,
    `    <description>${escapeXml(t.blog.description)}</description>`,
    `    <language>${locale}</language>`,
    `    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />`,
    ...items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
};
