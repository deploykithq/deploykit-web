import type { LocaleT } from "@lib/i18n/locales";

/** Rutas de esta misma página en cada idioma, para las páginas cuyo path cambia (slugs traducidos). */
export type AlternatesT = Partial<Record<LocaleT, string>>;

export interface NavLinkI {
  href: string;
  label: string;
}

export interface FooterColumnI {
  title: string;
  links: NavLinkI[];
}
