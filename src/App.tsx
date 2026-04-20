import Header from "./components/Header";
import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import ServicePillars from "./components/ServicePillars";
import FeaturedWork from "./components/FeaturedWork";
import ProcessTeaser from "./components/ProcessTeaser";
import Testimonial from "./components/Testimonial";
import FAQ from "./components/FAQ";
import ClosingCTA from "./components/ClosingCTA";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import BackToTop from "./components/BackToTop";
import ReadingProgress from "./components/ReadingProgress";

function App() {
  return (
    <div className="min-h-screen bg-paper text-ink font-body antialiased">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-ink focus:text-paper focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:tracking-wide"
      >
        Skip to content
      </a>
      <ReadingProgress />
      <Header />
      <main id="main-content">
        <Hero />
        <Manifesto />
        <ServicePillars />
        <FeaturedWork />
        <ProcessTeaser />
        <Testimonial />
        <FAQ />
        <ClosingCTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
}

export default App;
