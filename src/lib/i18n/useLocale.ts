import { useLocation } from "react-router-dom";

import { en } from "@lib/i18n/dictionaries/en";
import { es } from "@lib/i18n/dictionaries/es";
import { localeFromPath } from "@lib/i18n/locales";

import type { DictionaryT } from "@lib/i18n/dictionaries/en";
import type { LocaleT } from "@lib/i18n/locales";

export const DICTIONARIES: Record<LocaleT, DictionaryT> = { en, es };

/** El locale forma parte de la URL (`/es/...`), así que el router es la única fuente de verdad. */
export const useLocale = (): LocaleT => localeFromPath(useLocation().pathname);

export const useT = (): DictionaryT => DICTIONARIES[useLocale()];
