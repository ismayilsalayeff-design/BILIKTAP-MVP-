"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Email və ya şifrə yanlışdır.");
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass w-full max-w-md p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-blue-500 to-brand-green-500" />
        
        <h1 className="text-3xl font-bold mb-2">Xoş Gəldin</h1>
        <p className="text-gray-400 mb-8 text-sm">Gəzintiyə geri dön</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">E-mail</label>
            <input name="email" type="email" required className="w-full bg-[#0a0f16] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-brand-blue-500 transition-colors" placeholder="ali@xezer.com" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Şifrə</label>
            <input name="password" type="password" required className="w-full bg-[#0a0f16] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-brand-blue-500 transition-colors" placeholder="••••••••" />
          </div>

          <button disabled={loading} type="submit" className="w-full py-3.5 mt-4 bg-gradient-to-r from-brand-blue-500 to-brand-blue-600 hover:from-brand-blue-600 hover:to-brand-blue-500 text-white font-bold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,180,219,0.3)] hover:shadow-[0_0_20px_rgba(0,180,219,0.5)]">
            {loading ? "Gözləyin..." : "Daxil ol"}
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-gray-400">
          Hesabınız yoxdur? <Link href="/register" className="text-brand-blue-500 hover:underline">Qeydiyyatdan keç</Link>
        </p>
      </div>
    </div>
  );
}
