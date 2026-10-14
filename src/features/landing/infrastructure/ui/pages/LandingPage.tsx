import { LazyMotion, domAnimation } from "framer-motion";
import {
  Navbar,
  HeroSection,
  TechSection,
  StatsSection,
  FeaturesSection,
  HowItWorksSection,
  DemoSection,
  TestimonialsSection,
  CTASection,
  Footer,
} from "@landing/infrastructure/ui/components";

export const LandingPage = () => {
  return (
    <LazyMotion features={domAnimation} strict>
      <div className="min-h-screen overflow-x-hidden">
        <Navbar />
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
        <Footer />
      </div>
    </LazyMotion>
  );
};
