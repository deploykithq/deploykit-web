import { LazyMotion, domAnimation } from "framer-motion";
import {
  Navbar,
  HeroSection,
  StatsSection,
  FeaturesSection,
  DemoSection,
  HowItWorksSection,
  TechSection,
  TestimonialsSection,
  CTASection,
  Footer,
} from "@landing/infrastructure/ui/components";

export const LandingPage = () => {
  return (
    <LazyMotion features={domAnimation} strict>
      <div className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <DemoSection />
        <HowItWorksSection />
        <section className="relative py-20 sm:py-32 overflow-hidden">
          <TechSection />
          <TestimonialsSection />
        </section>
        <CTASection />
        <Footer />
      </div>
    </LazyMotion>
  );
};
