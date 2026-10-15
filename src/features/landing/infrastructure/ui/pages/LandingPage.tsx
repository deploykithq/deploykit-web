import React from "react";
import { LazyMotion, domAnimation } from "framer-motion";

import { SiteFooter, SiteNavbar } from "@shared/components/site";

import { CTASection } from "@landing/infrastructure/ui/components/CTASection";
import { DemoSection } from "@landing/infrastructure/ui/components/DemoSection";
import { FeaturesSection } from "@landing/infrastructure/ui/components/FeaturesSection";
import { HeroSection } from "@landing/infrastructure/ui/components/HeroSection";
import { HowItWorksSection } from "@landing/infrastructure/ui/components/HowItWorksSection";
import { StatsSection } from "@landing/infrastructure/ui/components/StatsSection";
import { TechSection } from "@landing/infrastructure/ui/components/TechSection";
import { TestimonialsSection } from "@landing/infrastructure/ui/components/TestimonialsSection";

import { useLandingCopy } from "@landing/infrastructure/ui/hooks/useLandingCopy";
import { useLocale } from "@lib/i18n/useLocale";
import { useSeo } from "@lib/seo/useSeo";

import { LOCALES, localePath } from "@lib/i18n/locales";
import { absoluteUrl, SITE_NAME } from "@lib/seo/site";

export const LandingPage: React.FC = () => {
  const { meta } = useLandingCopy();
  const locale = useLocale();

  useSeo({
    title: meta.title,
    description: meta.description,
    locale,
    path: localePath(locale, "/"),
    alternates: Object.fromEntries(LOCALES.map((l) => [l, localePath(l, "/")])),
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: SITE_NAME,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Linux",
        description: meta.description,
        url: absoluteUrl(localePath(locale, "/")),
        inLanguage: locale,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
    ],
  });

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="min-h-screen overflow-x-hidden">
        <SiteNavbar />
        <main>
          <HeroSection />
          <TechSection />
          <StatsSection />
          <FeaturesSection />
          <HowItWorksSection />
          <DemoSection />
          <TestimonialsSection />
          <CTASection />
        </main>
        <SiteFooter screen="0:landing*" />
      </div>
    </LazyMotion>
  );
};
