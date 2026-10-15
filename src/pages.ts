import { createElement, lazy, useState } from "react";

import type { ComponentType } from "react";
import type { PageKeyT } from "@lib/router/routes";

type LoaderT = () => Promise<ComponentType>;

/** Todos los módulos de página, cargados bajo demanda. La entrada de servidor los importa de forma eager. */
export const PAGE_LOADERS: Record<PageKeyT, LoaderT> = {
  landing: () => import("@landing/infrastructure/ui/pages/LandingPage").then((m) => m.LandingPage),
  docsEn: () => import("@docs/infrastructure/ui/pages/DocsPageEn").then((m) => m.DocsPageEn),
  docsEs: () => import("@docs/infrastructure/ui/pages/DocsPageEs").then((m) => m.DocsPageEs),
  blogList: () => import("@blog/infrastructure/ui/pages/BlogListPage").then((m) => m.BlogListPage),
  blogPost: () => import("@blog/infrastructure/ui/pages/BlogPostPage").then((m) => m.BlogPostPage),
  notFound: () => import("@shared/components/not-found").then((m) => m.NotFound),
};

export type PreloadablePageT = (() => ReturnType<typeof createElement>) & {
  preload: () => Promise<void>;
};

/**
 * `React.lazy` que puede resolverse por adelantado. La hidratación precarga la
 * página actual para que el primer render coincida con el HTML prerenderizado sin suspender.
 */
const preloadable = (load: LoaderT): PreloadablePageT => {
  let loaded: ComponentType | null = null;
  const Lazy = lazy(() => load().then((component) => ({ default: component })));

  // La elección se fija por montaje para que una precarga posterior nunca cambie el tipo de elemento bajo React.
  const Page = (() => {
    const [Component] = useState<ComponentType>(() => loaded ?? Lazy);
    return createElement(Component);
  }) as PreloadablePageT;
  Page.preload = () =>
    load().then((component) => {
      loaded = component;
    });
  return Page;
};

export const LAZY_PAGES = Object.fromEntries(
  Object.entries(PAGE_LOADERS).map(([key, load]) => [key, preloadable(load)]),
) as Record<PageKeyT, PreloadablePageT>;
