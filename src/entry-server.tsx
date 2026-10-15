import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

import App from "./App";

import { BlogListPage } from "@blog/infrastructure/ui/pages/BlogListPage";
import { BlogPostPage } from "@blog/infrastructure/ui/pages/BlogPostPage";
import { DocsPageEn } from "@docs/infrastructure/ui/pages/DocsPageEn";
import { DocsPageEs } from "@docs/infrastructure/ui/pages/DocsPageEs";
import { LandingPage } from "@landing/infrastructure/ui/pages/LandingPage";
import { NotFound } from "@shared/components/not-found";

import { renderHead } from "@lib/seo/renderHead";
import { SeoCollectorContext } from "@lib/seo/useSeo";

import type { PagesT } from "./App";
import type { SeoCollectorI } from "@lib/seo/seo.types";

export { buildRss, buildSitemap, getPrerenderPaths } from "./prerender.data";

const PAGES: PagesT = {
  landing: LandingPage,
  docsEn: DocsPageEn,
  docsEs: DocsPageEs,
  blogList: BlogListPage,
  blogPost: BlogPostPage,
  notFound: NotFound,
};

export interface RenderResultI {
  html: string;
  head: string;
  lang: string;
}

export const render = (url: string): RenderResultI => {
  const collector: SeoCollectorI = { meta: null };

  const html = renderToString(
    <SeoCollectorContext.Provider value={collector}>
      <StaticRouter location={url}>
        <App pages={PAGES} />
      </StaticRouter>
    </SeoCollectorContext.Provider>,
  );

  if (!collector.meta) throw new Error(`Page at ${url} did not declare its SEO meta (useSeo).`);

  return { html, head: renderHead(collector.meta), lang: collector.meta.locale };
};
