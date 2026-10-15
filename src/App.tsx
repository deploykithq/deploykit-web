import { Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { ROUTES } from "@lib/router/routes";

import type { ComponentType } from "react";
import type { PageKeyT } from "@lib/router/routes";

export type PagesT = Record<PageKeyT, ComponentType>;

interface AppPropsI {
  /** Componentes lazy en el navegador, eager durante el prerender. */
  pages: PagesT;
}

/** Las navegaciones del router empiezan arriba, o en el `#anchor` al que apuntan. */
const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return null;
};

const App = ({ pages }: AppPropsI) => {
  const NotFound = pages.notFound;

  return (
    <>
      <ScrollManager />
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Routes>
          {ROUTES.map(({ path, page }) => {
            const Page = pages[page];
            return <Route key={path} path={path} element={<Page />} />;
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
