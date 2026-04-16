import TutorCard from "@/components/TutorCard";
import { ArrowLeftRight } from "lucide-react";

export default function ComparePage() {
  const tutor1 = {
    name: "Dr. John Doe",
    subject: "Quantum Physics",
    price: 45,
    rating: 4.9,
    reviewsCount: 124,
    location: "Baku, Azerbaijan",
    smartScore: 9.8
  };

  const tutor2 = {
    name: "Jane Smith",
    subject: "Advanced Calculus",
    price: 60,
    rating: 5.0,
    reviewsCount: 89,
    location: "Online",
    smartScore: 9.5
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Compare Tutors</h1>
        <p className="text-slate-500 text-center mb-10">Select side-by-side to make the most informed decision.</p>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200 dark:border-slate-800 relative">
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-slate-800 border cursor-pointer hover:scale-110 active:scale-95 transition border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center text-indigo-600 shadow-lg z-10">
            <ArrowLeftRight size={20} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-6">
              <TutorCard {...tutor1} />
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Comparison Metrics</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-slate-500">Explanation Clarity</span><span className="font-bold text-green-500">5.0</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Response Time</span><span className="font-bold">1 hr</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Trial Lesson</span><span className="font-bold">Free</span></div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <TutorCard {...tutor2} />
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Comparison Metrics</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-slate-500">Explanation Clarity</span><span className="font-bold">4.8</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Response Time</span><span className="font-bold text-amber-500">5 hrs</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Trial Lesson</span><span className="font-bold">$15</span></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
