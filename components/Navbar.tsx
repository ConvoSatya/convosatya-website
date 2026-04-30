import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        {/* Left: Logo + Brand */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <Image
            src="/logo.png"
            alt="ConvoSatya logo"
            width={32}
            height={32}
            priority
          />
          <span className="text-xl tracking-tight">
            <span className="font-medium text-[#0F172A]">Convo</span>
            <span className="font-semibold text-[#15803D]">Satya</span>
          </span>
        </Link>

        {/* Right: Nav Links */}
        <div className="flex items-center gap-8">
          <Link href="#product" className="text-sm font-medium text-gray-600 hover:text-gray-900 no-underline transition-colors">
            Product
          </Link>
          <Link href="#demo" className="text-sm font-medium text-gray-600 hover:text-gray-900 no-underline transition-colors">
            Demo
          </Link>
          <Link href="#contact" className="text-sm font-medium text-gray-600 hover:text-gray-900 no-underline transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
