import { LANDING_COPY_EN } from "@landing/infrastructure/ui/constants/landing.copy.en";
import { LANDING_COPY_ES } from "@landing/infrastructure/ui/constants/landing.copy.es";

import { useLocale } from "@lib/i18n/useLocale";

import type { LocaleT } from "@lib/i18n/locales";
import type { LandingCopyI } from "@landing/infrastructure/ui/interfaces/LandingI";

const COPY: Record<LocaleT, LandingCopyI> = { en: LANDING_COPY_EN, es: LANDING_COPY_ES };

export const useLandingCopy = (): LandingCopyI => COPY[useLocale()];
