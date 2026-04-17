import Header from "./components/Header";
import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import ServicePillars from "./components/ServicePillars";
import FeaturedWork from "./components/FeaturedWork";
import ProcessTeaser from "./components/ProcessTeaser";
import TrustStrip from "./components/TrustStrip";
import Testimonial from "./components/Testimonial";
import JournalPreview from "./components/JournalPreview";
import ClosingCTA from "./components/ClosingCTA";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-paper text-ink font-body antialiased">
      <Header />
      <main id="top">
        <Hero />
        <Manifesto />
        <ServicePillars />
        <FeaturedWork />
        <ProcessTeaser />
        <TrustStrip />
        <Testimonial />
        <JournalPreview />
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
