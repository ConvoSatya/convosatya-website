import type { Metadata } from "next";
import CareersPage from "@/components/CareersPage";

export const metadata: Metadata = {
    title: "Careers | ConvoSatya",
    description: "Join ConvoSatya — help build AI that protects people from scams.",
};

export default function Careers() {
    return <CareersPage />;
}