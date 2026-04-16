import { Star, MapPin, Video, BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";

interface TutorCardProps {
  name: string;
  subject: string;
  price: number;
  rating: number;
  reviewsCount: number;
  location: string;
  smartScore: number;
}

export default function TutorCard({ name, subject, price, rating, reviewsCount, location, smartScore }: TutorCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-900 transition-all group overflow-hidden relative">
      {/* SmartScore Badge */}
      <div className="absolute top-0 right-0 bg-gradient-to-bl from-amber-400 to-orange-500 text-white font-bold text-xs py-1 px-3 rounded-bl-xl shadow-md z-10 flex items-center gap-1">
        💎 {smartScore.toFixed(1)} SmartScore
      </div>

      <div className="flex gap-4">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-slate-800 flex items-center justify-center shrink-0 border-2 border-white shadow-sm overflow-hidden relative">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} alt={name} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1">
          <h3 className="font-bold text-slate-800 dark:text-white text-lg leading-tight group-hover:text-indigo-600 transition-colors">
            {name}
          </h3>
          <p className="text-indigo-600 font-medium text-sm mb-1">{subject}</p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 mt-2">
            <div className="flex items-center gap-1">
              <Star className="text-amber-400 fill-amber-400 w-4 h-4" />
              <span className="font-semibold text-slate-700 dark:text-slate-300">{rating}</span>
              <span>({reviewsCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {location}
            </div>
            <div className="flex items-center gap-1">
              <Video className="w-4 h-4" />
              Intro Video
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-2xl font-bold text-slate-800 dark:text-white">${price}</span>
          <span className="text-slate-500 text-sm">/hr</span>
        </div>
        <Link href="/profile" className="flex items-center gap-1 bg-slate-50 hover:bg-indigo-50 text-indigo-600 font-medium dark:bg-slate-800 dark:hover:bg-slate-700 px-4 py-2 rounded-xl transition text-sm">
          View Profile <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
