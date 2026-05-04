import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminDashboard from "@/components/AdminDashboard";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <Navbar />

      <section className="relative overflow-hidden px-6 pb-20 pt-32 sm:px-8 lg:px-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(46,196,182,0.18),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_35%)]" />

        <div className="mx-auto max-w-7xl">
          <AdminDashboard />
        </div>
      </section>

      <Footer />
    </main>
  );
}