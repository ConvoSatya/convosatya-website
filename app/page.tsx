import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import DemoSection from "../components/DemoSection";
import ProblemStats from "../components/ProblemStats";
import PlatformCapabilities from "../components/PlatformCapabilities";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <DemoSection />
      <ProblemStats />
      <PlatformCapabilities />
      <Footer />
    </>
  );
}
