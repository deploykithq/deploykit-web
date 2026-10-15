import { localePath } from "@lib/i18n/locales";

import type { LocaleT } from "@lib/i18n/locales";

export const blogPath = (locale: LocaleT): string => localePath(locale, "/blog");

export const postPath = (locale: LocaleT, slug: string): string => localePath(locale, `/blog/${slug}`);

/** `2026-10-15` → "15 Oct 2026" / "15 oct 2026". UTC fijo para que prerender y navegador coincidan. */
export const formatPostDate = (date: string, locale: LocaleT): string =>
  new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${date}T00:00:00Z`),
  );
