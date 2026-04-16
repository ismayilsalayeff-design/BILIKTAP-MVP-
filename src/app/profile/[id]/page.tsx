import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Star, Map as MapIcon, GraduationCap, Video, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import ReviewModal from "@/components/ReviewModal";
import { auth } from "@/auth";

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const session = await auth();

  const tutor = await prisma.tutorProfile.findFirst({
    where: { id: params.id },
    include: {
      user: true,
      subjects: true,
      reviews: {
        include: { studentUser: true },
        orderBy: { createdAt: "desc" },
      },
      videos: true,
    },
  });

  if (!tutor) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-[#06090e] pt-8 pb-20 px-4 md:px-8 max-w-5xl mx-auto">
      <div className="glass rounded-3xl p-6 md:p-10 mb-8 border border-brand-green-500/20 shadow-[0_0_40px_rgba(0,223,137,0.05)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green-500/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
          {/* Avatar and Antigravity Score */}
          <div className="flex flex-col items-center gap-4 min-w-[200px]">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-brand-blue-500 to-brand-green-500 p-1 flex items-center justify-center">
              <div className="w-full h-full bg-[#11151c] rounded-[22px] flex items-center justify-center font-bold text-4xl text-white">
                {tutor.user.name.charAt(0)}
              </div>
            </div>
            
            <div className="bg-black/50 border border-brand-green-500/30 px-6 py-3 rounded-2xl text-center w-full shadow-[0_0_20px_rgba(0,223,137,0.1)]">
              <span className="text-[10px] text-brand-green-500 uppercase font-bold tracking-widest block mb-1">Antigravity Score</span>
              <div className="flex items-center justify-center gap-1 font-bold text-2xl text-white">
                {tutor.smartScore > 0 ? tutor.smartScore.toFixed(1) : "5.0"} <Star className="fill-brand-green-500 text-brand-green-500 w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white">{tutor.user.name}</h1>
              {tutor.isVerified && <CheckCircle2 className="text-brand-blue-500 w-6 h-6 drop-shadow-[0_0_8px_rgba(0,180,219,0.8)]" />}
            </div>
            
            <p className="text-gray-400 mb-6 max-w-2xl text-lg leading-relaxed">{tutor.bio || "Müəllim hələ özü haqqında məlumat əlavə etməyib."}</p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm font-medium">
                <GraduationCap className="text-brand-blue-500 w-5 h-5" />
                Dərs təcrübəsi: <span className="text-white">{tutor.experienceYears} il</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm font-medium">
                <MapIcon className="text-brand-green-500 w-5 h-5" />
                <span className="text-white">{tutor.locationString || "Təyin edilməyib"}</span>
              </div>
            </div>

            {/* Subjects Map */}
            <div className="flex gap-2 flex-wrap mb-8">
              {tutor.subjects?.length > 0 ? tutor.subjects.map(sub => (
                <span key={sub.id} className="bg-brand-blue-500/10 text-brand-blue-500 border border-brand-blue-500/30 px-3 py-1 rounded-lg text-sm font-bold">
                  {sub.name}
                </span>
              )) : (
                <span className="bg-brand-blue-500/10 text-brand-blue-500 border border-brand-blue-500/30 px-3 py-1 rounded-lg text-sm font-bold">Riyaziyyat (Mock)</span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button className="bg-gradient-to-r from-brand-green-500 to-brand-green-600 hover:from-brand-green-600 hover:to-brand-green-500 text-white font-extrabold px-8 py-3.5 rounded-xl transition shadow-[0_0_15px_rgba(105,185,119,0.3)] hover:shadow-[0_0_25px_rgba(105,185,119,0.5)]">
                Dərs Yazan - {tutor.pricePerHour}₼ / aylıq
              </button>
              {session?.user.role === "STUDENT" && (
                <ReviewModal tutorId={tutor.id} />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Videos / Reels */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b border-white/10 pb-4">
            <Video className="text-brand-blue-500" /> Antigravity Reels
          </h2>
          {tutor.videos.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {tutor.videos.map(v => (
                 <div key={v.id} className="aspect-[9/16] bg-black rounded-2xl relative overflow-hidden group border border-white/10">
                   <img src={v.thumbnailUrl || "https://placehold.co/400x600/black/00df89?text=Video"} alt="thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                     <Link href="/reels" className="bg-brand-green-500 text-black font-bold px-4 py-2 rounded-lg">İzlə</Link>
                   </div>
                 </div>
              ))}
            </div>
          ) : (
            <div className="glass p-6 rounded-2xl text-center text-gray-400 border-dashed border-2 border-white/10">
              Bu müəllimin hələ videosu yoxdur.
            </div>
          )}
        </div>

        {/* Reviews */}
        <div>
          <h2 className="text-xl font-bold mb-4 border-b border-white/10 pb-4">Rəylər ({tutor.reviews.length})</h2>
          <div className="space-y-4">
            {tutor.reviews.length > 0 ? tutor.reviews.map(review => (
              <div key={review.id} className="glass p-5 rounded-2xl border border-white/5 hover:border-white/10 transition">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-white">{review.studentUser.name}</span>
                  <div className="flex items-center gap-1 font-bold text-yellow-400 bg-black/50 px-2 py-0.5 rounded text-sm">
                    {review.rating.toFixed(1)} <Star className="fill-yellow-400 w-3 h-3" />
                  </div>
                </div>
                <p className="text-gray-300 text-sm">{review.comment}</p>
                <div className="mt-3 text-[10px] text-gray-500 flex gap-3">
                  <span>İzah: {review.explanationRating}/5</span>
                  <span>Ünsiyyət: {review.communicationRating}/5</span>
                  <span>Punksuallıq: {review.punctualityRating}/5</span>
                </div>
              </div>
            )) : (
              <div className="glass p-6 rounded-2xl text-center text-gray-400 border border-white/5">
                Hələ heç bir rəy əlavə edilməyib.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
