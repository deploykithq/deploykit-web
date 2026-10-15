import { DEFAULT_LOCALE, LOCALE_TAGS, LOCALES } from "@lib/i18n/locales";
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME } from "@lib/seo/site";

import type { SeoMetaI } from "@lib/seo/seo.types";

const escapeAttr = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/** El JSON dentro de <script> no debe poder cerrar la etiqueta. */
const escapeJson = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");

/**
 * Todas las etiquetas del head propias de cada página, marcadas con `data-seo` para que el cliente pueda
 * sustituirlas al navegar. El prerender escribe esa misma cadena.
 */
export const renderHead = (meta: SeoMetaI): string => {
  const canonical = absoluteUrl(meta.path);
  const image = absoluteUrl(meta.image ?? DEFAULT_OG_IMAGE);
  const tags: string[] = [];

  const add = (tag: string) => tags.push(tag.replace(/^<(\w+)/, "<$1 data-seo"));
  const metaName = (name: string, content: string) =>
    add(`<meta name="${name}" content="${escapeAttr(content)}" />`);
  const metaProp = (property: string, content: string) =>
    add(`<meta property="${property}" content="${escapeAttr(content)}" />`);

  add(`<title>${escapeAttr(meta.title)}</title>`);
  metaName("description", meta.description);
  if (meta.noindex) metaName("robots", "noindex, follow");
  add(`<link rel="canonical" href="${canonical}" />`);

  if (meta.alternates) {
    for (const locale of LOCALES) {
      const path = meta.alternates[locale];
      if (path) add(`<link rel="alternate" hreflang="${locale}" href="${absoluteUrl(path)}" />`);
    }
    const fallback = meta.alternates[DEFAULT_LOCALE];
    if (fallback) add(`<link rel="alternate" hreflang="x-default" href="${absoluteUrl(fallback)}" />`);
  }

  metaProp("og:site_name", SITE_NAME);
  metaProp("og:type", meta.type ?? "website");
  metaProp("og:title", meta.title);
  metaProp("og:description", meta.description);
  metaProp("og:url", canonical);
  metaProp("og:image", image);
  metaProp("og:locale", LOCALE_TAGS[meta.locale]);
  for (const locale of LOCALES) {
    if (locale !== meta.locale && meta.alternates?.[locale]) {
      metaProp("og:locale:alternate", LOCALE_TAGS[locale]);
    }
  }
  if (meta.publishedTime) metaProp("article:published_time", meta.publishedTime);
  if (meta.modifiedTime) metaProp("article:modified_time", meta.modifiedTime);
  meta.tags?.forEach((tag) => metaProp("article:tag", tag));

  metaName("twitter:card", "summary_large_image");
  metaName("twitter:title", meta.title);
  metaName("twitter:description", meta.description);
  metaName("twitter:image", image);

  meta.jsonLd?.forEach((data) =>
    add(`<script type="application/ld+json">${escapeJson(data)}</script>`),
  );

  return tags.join("\n    ");
};
