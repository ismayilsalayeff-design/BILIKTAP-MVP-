import Link from "next/link";
import { Search, Map as MapIcon, PlaySquare, UserCircle, Bell, User } from "lucide-react";
import { auth, signOut } from "@/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="fixed top-0 inset-x-0 h-16 glass z-50 flex items-center px-4 md:px-8 justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="bg-[#f0f4f8] px-3 py-1.5 rounded-xl hidden sm:flex items-center justify-center shadow-[0_0_15px_rgba(105,185,119,0.2)] group-hover:shadow-[0_0_20px_rgba(27,58,110,0.5)] transition-all">
          {/* Logo SVG replacing broken image link */}
          <svg width="140" height="36" viewBox="0 0 400 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background elements */}
            <path d="M50 10 C 20 10, 10 35, 10 50 C 10 75, 40 90, 50 95 C 60 90, 90 75, 90 50 C 90 35, 80 10, 50 10 Z" stroke="#1b3a6e" strokeWidth="6" fill="none"/>
            <path d="M75 75 L 105 105" stroke="#1b3a6e" strokeWidth="8" strokeLinecap="round"/>
            <path d="M85 85 L 100 100" stroke="#69b977" strokeWidth="4" strokeLinecap="round"/>
            
            {/* Book Icon Inside */}
            <path d="M25 55 L 25 45 C 25 35, 45 40, 50 45 C 55 40, 75 35, 75 45 L 75 55 C 75 45, 55 50, 50 55 C 45 50, 25 45, 25 55 Z" stroke="#69b977" strokeWidth="4" fill="none"/>
            <path d="M50 45 L 50 65" stroke="#69b977" strokeWidth="4"/>
            <path d="M25 55 L 25 65 C 25 55, 45 60, 50 65 C 55 60, 75 55, 75 65 L 75 55" stroke="#69b977" strokeWidth="4" fill="none"/>
            
            {/* Text 'BilikTap' */}
            <text x="120" y="65" fontFamily="Arial, sans-serif" fontSize="48" fontWeight="bold" fill="#1b3a6e">Bilik<tspan fill="#1b3a6e" fontWeight="normal">Tap</tspan></text>
          </svg>
        </div>
        <div className="sm:hidden w-10 h-10 rounded-lg bg-brand-blue-500 flex items-center justify-center text-white font-extrabold text-xl shadow-[0_0_10px_rgba(27,58,110,0.5)] group-hover:shadow-[0_0_20px_rgba(105,185,119,0.5)] transition-all">
          BT
        </div>
      </Link>

      {/* Main Nav Items (Desktop) */}
      <div className="hidden md:flex items-center gap-8 font-medium text-gray-300">
        <Link href="/" className="hover:text-brand-green-500 transition flex items-center gap-2">
          <MapIcon size={20} />
          Xəritə
        </Link>
        <Link href="/reels" className="hover:text-brand-blue-500 transition flex items-center gap-2">
          <PlaySquare size={20} />
          Reels
        </Link>
        <Link href="/search" className="hover:text-brand-green-500 transition flex items-center gap-2">
          <Search size={20} />
          Axtarış
        </Link>
      </div>

      {/* Right side Profile & Actions */}
      <div className="flex items-center gap-4">
        {session ? (
          <>
            <button className="p-2 text-gray-300 hover:text-brand-green-500 transition rounded-full hover:bg-white/5">
              <Bell size={22} />
            </button>
            <Link href="/dashboard" className="flex items-center gap-2 p-1 pr-4 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 transition">
              <div className="bg-[#11151c] rounded-full p-1 border border-white/10">
                <User size={24} className="text-brand-green-500" />
              </div>
              <span className="font-medium text-sm hidden sm:block text-white">{session.user?.name?.split(" ")[0]}</span>
            </Link>
            <form action={async () => { "use server"; await signOut(); }}>
              <button className="text-xs font-bold px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition">Çıxış</button>
            </form>
          </>
        ) : (
          <Link href="/login" className="flex items-center gap-2 py-2 px-5 rounded-full bg-white/5 border border-white/10 hover:border-brand-blue-500 hover:bg-brand-blue-500/10 transition group">
            <UserCircle size={20} className="text-gray-400 group-hover:text-brand-blue-500 transition" />
            <span className="font-medium text-sm hidden sm:block text-white transition group-hover:text-brand-blue-500">Daxil ol</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
