import { DEFAULT_SECTION } from "@docs/infrastructure/ui/constants/docs.constants";

import { localePath } from "@lib/i18n/locales";

import type { LocaleT } from "@lib/i18n/locales";

export const docsPath = (locale: LocaleT, section: string): string =>
  localePath(locale, section === DEFAULT_SECTION ? "/docs" : `/docs/${section}`);
