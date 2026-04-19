import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/context/LanguageContext";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BilikTap | Antigravity Discovery",
  description: "Find, evaluate, and choose the best tutors with blazing speed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} dark h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-[#06090e] text-white selection:bg-brand-green-500 selection:text-black">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1 w-full pt-16">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
