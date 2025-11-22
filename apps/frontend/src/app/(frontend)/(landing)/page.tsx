import Testimonials from "./_landingComponents/Testimonials";
import Footer from "./_landingComponents/Footer";
import BrandScroller from "./_landingComponents/BrandScroller";
import Header from "./_landingComponents/Header";
import HeroSection from "./_landingComponents/HeroSection";
import FeaturesSection from "./_landingComponents/FeaturesSection";
import ResumePreview from "./_landingComponents/ResumePreview";

const LandingPage = () => {
  return (
    <section className="lg:min-h-screen pt-15 sm:pt-15">
      <HeroSection />
      <BrandScroller />
      <FeaturesSection />
      <Testimonials />
      <Footer />
    </section>
  );
};

export default LandingPage;
