"use client";

import { useState } from "react";
import { registerUser } from "@/actions/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    
    const res = await registerUser(formData);
    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/login?registered=true");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass w-full max-w-md p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-green-500 to-brand-blue-500" />
        
        <h1 className="text-3xl font-bold mb-2">Platforma qoşul</h1>
        <p className="text-gray-400 mb-8 text-sm">Sürətli və fərqli təcrübə yaşa ("Antigravity" rejimi)</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Ad Soyad</label>
            <input name="name" required className="w-full bg-[#0a0f16] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-brand-green-500 transition-colors" placeholder="Ali Məmmədov" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">E-mail</label>
            <input name="email" type="email" required className="w-full bg-[#0a0f16] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-brand-green-500 transition-colors" placeholder="ali@xezer.com" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Şifrə</label>
            <input name="password" type="password" required className="w-full bg-[#0a0f16] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-brand-green-500 transition-colors" placeholder="••••••••" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Rolunuz</label>
            <select name="role" required className="w-full bg-[#0a0f16] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-brand-green-500 transition-colors appearance-none cursor-pointer">
              <option value="STUDENT">Tələbə</option>
              <option value="TUTOR">Müəllim</option>
            </select>
          </div>

          <button disabled={loading} type="submit" className="w-full py-3.5 mt-4 bg-gradient-to-r from-brand-green-500 to-brand-green-600 hover:from-brand-green-600 hover:to-brand-green-500 text-black font-extrabold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? "Gözləyin..." : "Qeydiyyatdan keç"}
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-gray-400">
          Artıq hesabınız var? <Link href="/login" className="text-brand-green-500 hover:underline">Daxil ol</Link>
        </p>
      </div>
    </div>
  );
}
