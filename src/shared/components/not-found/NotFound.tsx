import React from "react";
import { useLocation } from "react-router-dom";

import { SiteNavbar } from "@shared/components/site";

import { useLocale, useT } from "@lib/i18n/useLocale";
import { useSeo } from "@lib/seo/useSeo";

import { localePath, stripLocale } from "@lib/i18n/locales";

export const NotFound: React.FC = () => {
  const locale = useLocale();
  const t = useT();
  const { pathname } = useLocation();

  useSeo({
    title: t.notFound.title,
    description: t.notFound.message,
    locale,
    path: pathname,
    noindex: true,
  });

  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />
      <main className="container mx-auto flex min-h-screen flex-col justify-center px-4 font-mono sm:px-6">
        <p className="text-xs uppercase tracking-widest text-dim">
          <span className="text-primary">$</span> cd {stripLocale(pathname)}
        </p>
        <h1 className="mt-6 text-6xl font-extrabold tracking-tight text-bright sm:text-8xl">
          {t.notFound.heading}
        </h1>
        <p className="mt-4 text-muted-foreground">{t.notFound.message}</p>
        <a href={localePath(locale, "/")} className="mt-8 text-sm text-foreground hover:text-primary">
          {t.notFound.home}
        </a>
      </main>
    </div>
  );
};
