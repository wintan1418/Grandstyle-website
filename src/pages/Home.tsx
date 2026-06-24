import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import TrustMarquee from "../components/TrustMarquee";
import ServicesIndex from "../components/ServicesIndex";
import Philosophy from "../components/Philosophy";
import FeaturedWork from "../components/FeaturedWork";
import ProcessTeaser from "../components/ProcessTeaser";
import Testimonial from "../components/Testimonial";
import FAQ from "../components/FAQ";
import ClosingCTA from "../components/ClosingCTA";

const Home = () => {
  const { hash } = useLocation();

  // When arriving from another route with a #section hash, scroll to it.
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const el = document.getElementById(id);
    if (el) {
      requestAnimationFrame(() => {
        const top = el.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: "smooth" });
      });
    }
  }, [hash]);

  return (
    <main id="main-content">
      <Hero />
      <TrustMarquee />
      <ServicesIndex />
      <Philosophy />
      <FeaturedWork />
      <ProcessTeaser />
      <Testimonial />
      <FAQ />
      <ClosingCTA />
    </main>
  );
};

export default Home;
