export const LOCALES = ["en", "es"] as const;

export type LocaleT = (typeof LOCALES)[number];

/** El inglés vive en la raíz, los demás locales bajo `/<locale>`. */
export const DEFAULT_LOCALE: LocaleT = "en";

export const LOCALE_LABELS: Record<LocaleT, string> = {
  en: "English",
  es: "Español",
};

/** Etiquetas BCP 47 para `og:locale` y el formato de fechas. */
export const LOCALE_TAGS: Record<LocaleT, string> = {
  en: "en_US",
  es: "es_ES",
};

export const isLocale = (value: string): value is LocaleT =>
  (LOCALES as readonly string[]).includes(value);

export const localeFromPath = (pathname: string): LocaleT => {
  const first = pathname.split("/")[1] ?? "";
  return isLocale(first) && first !== DEFAULT_LOCALE ? first : DEFAULT_LOCALE;
};

/** `/es/blog/x` → `/blog/x`; las rutas del locale por defecto se devuelven sin cambios. */
export const stripLocale = (pathname: string): string => {
  const locale = localeFromPath(pathname);
  if (locale === DEFAULT_LOCALE) return pathname || "/";
  const rest = pathname.slice(locale.length + 1);
  return rest === "" ? "/" : rest;
};

/** Antepone el locale a una ruta neutra (`/blog`): `/es/blog`. */
export const localePath = (locale: LocaleT, path: string): string => {
  if (locale === DEFAULT_LOCALE) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

/** La misma página en otro locale, suponiendo que su ruta es igual en todos. */
export const switchLocale = (pathname: string, target: LocaleT): string =>
  localePath(target, stripLocale(pathname));
