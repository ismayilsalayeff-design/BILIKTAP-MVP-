"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, Filter, Star, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const subjects = [
  "Azərbaycan dili",
  "Riyaziyyat",
  "İngilis dili",
  "Tarix",
  "Fizika",
  "Proqramlaşdırma",
  "Kimya",
  "Biologiya",
  "İnformatika"
];

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { t, language } = useLanguage();

  // Initial state from URL
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [subject, setSubject] = useState(searchParams.get("subject") || "");
  const [minPrice, setMinPrice] = useState(parseInt(searchParams.get("minPrice") || "0"));
  const [maxPrice, setMaxPrice] = useState(parseInt(searchParams.get("maxPrice") || "250"));
  const [minRating, setMinRating] = useState(parseFloat(searchParams.get("minRating") || "0"));

  // Create update function with URL sync
  const updateFilters = useCallback(
    (updates: { q?: string; subject?: string; minPrice?: number; maxPrice?: number; minRating?: number }) => {
      const params = new URLSearchParams(searchParams);
      
      if (updates.q !== undefined) {
        if (updates.q) params.set("q", updates.q);
        else params.delete("q");
      }
      
      if (updates.subject !== undefined) {
        if (updates.subject && updates.subject !== "Bütün Fənlər") params.set("subject", updates.subject);
        else params.delete("subject");
      }
      
      if (updates.minPrice !== undefined) {
        if (updates.minPrice > 0) params.set("minPrice", updates.minPrice.toString());
        else params.delete("minPrice");
      }

      if (updates.maxPrice !== undefined) {
        if (updates.maxPrice < 250) params.set("maxPrice", updates.maxPrice.toString());
        else params.delete("maxPrice");
      }
      
      if (updates.minRating !== undefined) {
        if (updates.minRating > 0) params.set("minRating", updates.minRating.toString());
        else params.delete("minRating");
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  // Debounced search for the name input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query !== (searchParams.get("q") || "")) {
        updateFilters({ q: query });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [query, updateFilters, searchParams]);

  const handleReset = () => {
    setQuery("");
    setSubject("");
    setMinPrice(0);
    setMaxPrice(250);
    setMinRating(0);
    router.push(pathname);
  };

  return (
    <div className="flex flex-col h-full bg-[#06090e] border-r border-white/10 p-6 overflow-y-auto w-full md:w-80">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Filter size={20} className="text-brand-green-500" /> {t("filter.title")}
        </h2>
        {(query || (subject && subject !== "Bütün Fənlər") || minRating > 0 || minPrice > 0 || maxPrice < 250) && (
          <button 
            onClick={handleReset}
            className="text-xs text-brand-green-400 hover:text-white transition flex items-center gap-1 font-bold tracking-widest"
          >
            <X size={14} /> {t("filter.reset")}
          </button>
        )}
      </div>

      <div className="space-y-8">
        {/* Unified Name Search */}
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-3 block">{t("filter.search")}</label>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-brand-green-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder={t("filter.searchPlaceholder")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[#11151c] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:border-brand-green-500 transition-all placeholder:text-gray-700"
            />
          </div>
        </div>

        {/* Subject Filter */}
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-3 block">{t("filter.subject")}</label>
          <select 
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              updateFilters({ subject: e.target.value });
            }}
            className="w-full bg-[#11151c] border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-brand-green-500 transition-all cursor-pointer appearance-none"
          >
            <option value="">{t("filter.allSubjects")}</option>
            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Precise Price Range */}
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 block">
            {t("filter.price")}
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <span className="text-[10px] text-gray-600 uppercase font-black tracking-tighter">{t("filter.minPrice")}</span>
              <input 
                type="number" 
                value={minPrice}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0;
                  setMinPrice(val);
                  updateFilters({ minPrice: val });
                }}
                className="w-full bg-[#11151c] border border-white/5 rounded-lg py-2 px-3 text-sm text-white outline-none focus:border-brand-green-500/50 transition-all"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-gray-600 uppercase font-black tracking-tighter">{t("filter.maxPrice")}</span>
              <input 
                type="number" 
                value={maxPrice}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 250;
                  setMaxPrice(val);
                  updateFilters({ maxPrice: val });
                }}
                className="w-full bg-[#11151c] border border-white/5 rounded-lg py-2 px-3 text-sm text-white outline-none focus:border-brand-green-500/50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 block">{t("filter.rating")}</label>
          <div className="grid grid-cols-3 gap-2">
            {[0, 4.0, 4.5, 4.8].filter(r => r > 0 || minRating === 0).map(rating => (
              <button
                key={rating}
                onClick={() => {
                  setMinRating(rating);
                  updateFilters({ minRating: rating });
                }}
                className={`py-2 rounded-xl text-sm font-bold border transition-all flex items-center justify-center gap-1 ${
                  minRating === rating 
                  ? 'bg-brand-blue-500/20 border-brand-blue-500 text-brand-blue-500 shadow-[0_0_15px_rgba(27,58,110,0.3)]' 
                  : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                }`}
              >
                {rating === 0 ? (language === 'eng' ? 'All' : language === 'rus' ? 'Все' : 'Hamısı') : (
                  <>
                    <Star size={12} className={minRating === rating ? 'fill-brand-blue-500' : ''} />
                    {rating}+
                  </>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8 border-t border-white/5">
        <p className="text-[10px] text-gray-600 text-center uppercase tracking-widest font-bold">
          BilikTap Antigravity Engine
        </p>
      </div>
    </div>
  );
}
