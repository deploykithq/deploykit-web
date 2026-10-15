import React from "react";

import { DocsPage } from "@docs/infrastructure/ui/pages/DocsPage";

import { DOCS_CONTENT_EN } from "@docs/infrastructure/ui/constants/docs.content.en";

export const DocsPageEn: React.FC = () => <DocsPage content={DOCS_CONTENT_EN} />;
