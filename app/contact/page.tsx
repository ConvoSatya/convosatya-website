import type { Metadata } from "next";

import Navbar from "../../components/Navbar";
import ContactContent from "../../components/ContactContent";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Contact - ConvoSatya",
  description:
    "Get in touch with ConvoSatya — questions, partnerships, research collaborations, or early access requests.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <ContactContent />
      <Footer />
    </>
  );
}
