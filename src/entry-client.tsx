import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter, matchRoutes } from "react-router-dom";

import App from "./App";
import { LAZY_PAGES } from "./pages";

import { ROUTES } from "@lib/router/routes";

import "./index.css";

const container = document.getElementById("root")!;

const app = (
  <BrowserRouter>
    <App pages={LAZY_PAGES} />
  </BrowserRouter>
);

const bootstrap = async () => {
  const match = matchRoutes(ROUTES, window.location.pathname)?.[0]?.route;
  await LAZY_PAGES[match?.page ?? "notFound"].preload();

  // Las páginas prerenderizadas llegan con markup que hidratar; `vite dev` sirve una raíz vacía.
  if (container.hasChildNodes()) hydrateRoot(container, app);
  else createRoot(container).render(app);
};

bootstrap();
