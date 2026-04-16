"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, MessageCircle, Bookmark, Share2, Info, Check, Star } from "lucide-react";
import { likeVideo, saveVideo } from "@/actions/reels";
import Link from "next/link";

interface Reel {
  id: string;
  url: string;
  tutorId: string;
  tutorName: string;
  subject: string;
  rating: number;
  price: number;
  title: string;
  initialLikes: number;
}

const mockReels: Reel[] = [
  {
    id: "vid-1",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    tutorId: "demo1",
    tutorName: "Aynur Əliyeva",
    subject: "Azərbaycan dili",
    rating: 4.8,
    price: 60,
    title: "Mürəkkəb cümlələrin sirri",
    initialLikes: 1240,
  },
  {
    id: "vid-2",
    url: "https://www.w3schools.com/html/mov_bbb.mp4", // Mock video
    tutorId: "demo2",
    tutorName: "Rəşad Məmmədov",
    subject: "Riyaziyyat",
    rating: 5.0,
    price: 100,
    title: "Triqonometriyanı 1 dəqiqədə anla!",
    initialLikes: 300,
  }
];

export default function ReelsFeed({ activeReels = mockReels }: { activeReels?: Reel[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="w-full h-[calc(100vh-4rem)] flex justify-center bg-black overflow-hidden relative">
      <div 
        ref={containerRef}
        className="h-full w-full max-w-[450px] overflow-y-scroll snap-y snap-mandatory relative scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {activeReels.map((reel) => (
          <ReelElement key={reel.id} reel={reel} />
        ))}
      </div>
    </div>
  );
}

function ReelElement({ reel }: { reel: Reel }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Antigravity Optimistic Updates
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(reel.initialLikes);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(e => console.log('Autoplay restriction', e));
          setIsPlaying(true);
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.7 }
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleLike = async () => {
    if (liked) return;
    setLiked(true);
    setLikesCount(prev => prev + 1);
    // Silent background execution for "Antigravity Speed"
    likeVideo(reel.id).catch(console.error);
  };

  const handleSave = async () => {
    if (saved) return;
    setSaved(true);
    saveVideo(reel.id).catch(console.error);
  };

  return (
    <div className="h-full w-full relative snap-start bg-[#06090e] group">
      {/* Video Content */}
      <video
        ref={videoRef}
        src={reel.url}
        className="w-full h-full object-cover cursor-pointer"
        onClick={togglePlay}
        loop
        muted
        playsInline
      />
      
      {/* Play/Pause Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 bg-black/30">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center pl-1 border border-white/20">
            <Share2 className="text-white fill-white w-8 h-8 opacity-70" />
            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[14px] border-l-brand-green-500 border-b-8 border-b-transparent ml-2 drop-shadow-[0_0_8px_rgba(0,223,137,0.8)]"/>
          </div>
        </div>
      )}

      {/* Vertical Actions Bar */}
      <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 z-10 text-white">
        <button onClick={handleLike} className="flex flex-col items-center gap-1 group/btn hover:-translate-y-1 transition duration-300">
          <div className={`p-3 backdrop-blur rounded-full transition ${liked ? 'bg-red-500/20' : 'bg-black/40 group-hover/btn:bg-white/10'}`}>
            <Heart size={28} className={`transition ${liked ? 'fill-red-500 text-red-500 scale-110 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]' : 'text-white'}`} />
          </div>
          <span className="text-[13px] font-bold text-shadow-sm">{likesCount >= 1000 ? (likesCount/1000).toFixed(1) + 'k' : likesCount}</span>
        </button>
        
        <button className="flex flex-col items-center gap-1 group/btn hover:-translate-y-1 transition duration-300">
          <div className="p-3 bg-black/40 backdrop-blur rounded-full group-hover/btn:bg-white/10 transition">
            <MessageCircle size={28} className="text-white" />
          </div>
          <span className="text-[13px] font-bold text-shadow-sm">42</span>
        </button>
        
        <button onClick={handleSave} className="flex flex-col items-center gap-1 group/btn hover:-translate-y-1 transition duration-300">
          <div className={`p-3 backdrop-blur rounded-full transition ${saved ? 'bg-brand-blue-500/20' : 'bg-black/40 group-hover/btn:bg-white/10'}`}>
            {saved ? (
              <Check size={28} className="text-brand-blue-500 drop-shadow-[0_0_10px_rgba(0,180,219,0.8)]" />
            ) : (
              <Bookmark size={28} className="text-white" />
            )}
          </div>
          <span className="text-[13px] font-bold text-shadow-sm">{saved ? 'Saxlanıldı' : 'Saxla'}</span>
        </button>
      </div>

      {/* Bottom Info Bar Overlay */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/60 to-transparent pt-32 pb-6 px-4 z-10 pointer-events-none">
        <div className="flex items-end justify-between pointer-events-auto">
          <div className="flex-1 pr-16">
            <Link href={`/profile/${reel.tutorId}`} className="inline-block group/name mb-2">
              <h3 className="font-extrabold text-xl text-white group-hover/name:text-brand-green-500 transition drop-shadow-md">@{reel.tutorName}</h3>
            </Link>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-brand-blue-500/20 text-brand-blue-500 border border-brand-blue-500/50 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide">
                {reel.subject}
              </span>
              <span className="flex items-center gap-1 bg-black/50 backdrop-blur px-2 py-0.5 rounded text-xs text-yellow-400 font-bold border border-white/10">
                <Star size={10} className="fill-yellow-400" /> {reel.rating.toFixed(1)}
              </span>
              <span className="bg-brand-green-500/20 text-brand-green-500 border border-brand-green-500/50 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide">
                {reel.price}₼ / aylıq
              </span>
            </div>
            <p className="text-sm text-gray-200 leading-snug drop-shadow-md line-clamp-2">{reel.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
