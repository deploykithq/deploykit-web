import { localePath } from "@lib/i18n/locales";
import { GITHUB_URL } from "@lib/project";

import type { DictionaryT } from "@lib/i18n/dictionaries/en";
import type { LocaleT } from "@lib/i18n/locales";
import type { FooterColumnI, NavLinkI } from "./SiteI";

/** Las anclas de sección apuntan a la landing para que también funcionen desde docs y blog. */
export const getNavLinks = (locale: LocaleT, t: DictionaryT): NavLinkI[] => {
  const home = localePath(locale, "/");
  return [
    { href: `${home}#features`, label: t.nav.features },
    { href: `${home}#how-it-works`, label: t.nav.howItWorks },
    { href: `${home}#demo`, label: t.nav.demo },
    { href: localePath(locale, "/docs"), label: t.nav.docs },
    { href: localePath(locale, "/blog"), label: t.nav.blog },
  ];
};

/** Columnas de enlaces del footer. */
export const getFooterColumns = (locale: LocaleT, t: DictionaryT): FooterColumnI[] => {
  const home = localePath(locale, "/");
  const docs = (section: string) => localePath(locale, `/docs/${section}`);
  return [
    {
      title: t.footer.product,
      links: [
        { label: t.nav.features, href: `${home}#features` },
        { label: t.nav.howItWorks, href: `${home}#how-it-works` },
        { label: t.nav.demo, href: `${home}#demo` },
        { label: t.footer.blog, href: localePath(locale, "/blog") },
      ],
    },
    {
      title: t.footer.docs,
      links: [
        { label: t.footer.installation, href: docs("installation") },
        { label: t.footer.cliReference, href: docs("cli") },
        { label: t.footer.apiReference, href: docs("api") },
      ],
    },
    {
      title: t.footer.project,
      links: [
        { label: "GitHub", href: GITHUB_URL },
        { label: t.footer.contributing, href: `${GITHUB_URL}?tab=contributing-ov-file` },
        { label: t.footer.license, href: `${GITHUB_URL}?tab=MIT-1-ov-file` },
        { label: t.footer.rss, href: localePath(locale, "/rss.xml") },
      ],
    },
  ];
};
