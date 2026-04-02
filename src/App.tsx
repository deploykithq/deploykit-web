import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "@landing/infrastructure/ui/pages/LandingPage";

const DocsPage = lazy(() =>
  import("@docs/infrastructure/ui/pages/DocsPage").then((m) => ({
    default: m.DocsPage,
  })),
);

const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <BrowserRouter>
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
