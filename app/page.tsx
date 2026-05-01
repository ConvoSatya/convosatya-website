import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import DemoSection from "../components/DemoSection";
import ProblemStats from "../components/ProblemStats";
import WhyConvoSatya from "../components/WhyConvoSatya";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <DemoSection />
      <ProblemStats />
      <WhyConvoSatya />
      <Footer />
    </>
  );
}
