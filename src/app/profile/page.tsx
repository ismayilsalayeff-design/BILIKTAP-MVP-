import { MapPin, Star, PlayCircle, Calendar, GraduationCap, CheckCircle2, MessageSquare, Plus } from "lucide-react";

export default function TutorProfile() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header Profile Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
          
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-slate-100 border-4 border-white shadow-lg overflow-hidden shrink-0 z-10">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDoe" alt="Tutor avatar" className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 w-full z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                  Dr. John Doe
                  <CheckCircle2 className="text-blue-500 fill-white" />
                </h1>
                <p className="text-lg text-indigo-600 font-medium">Quantum Physics & Mathematics Tutors</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-slate-900 dark:text-white">$45<span className="text-base font-normal text-slate-500">/hr</span></div>
                <div className="inline-flex items-center gap-1 bg-amber-50 dark:bg-amber-900/30 text-amber-600 px-3 py-1 rounded-full text-sm font-semibold mt-1">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  4.9 (124 reviews)
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-slate-600 dark:text-slate-400 font-medium mb-6">
              <div className="flex items-center gap-2"><MapPin size={18}/> Baku, Azerbaijan</div>
              <div className="flex items-center gap-2"><GraduationCap size={18}/> 10 Years Exp.</div>
              <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg"><Calendar size={18}/> Available Today</div>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95">
                Book a Trial Lesson
              </button>
              <button className="p-3 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 hover:text-indigo-600 rounded-xl transition">
                <MessageSquare />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Info Column */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">About Me</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Passionate about numbers and the universe. I simplify complex concepts and make learning enjoyable. My methodology focuses on deep understanding rather than memorization. I utilize visual aids, real-world examples, and interactive problem solving.
              </p>
            </div>

            {/* Video Reels Section */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white flex items-center gap-2">
                <PlayCircle className="text-indigo-600" /> Demo Videos
              </h2>
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-48 h-72 shrink-0 bg-slate-800 rounded-2xl relative overflow-hidden group snap-start cursor-pointer shadow-md">
                    <img src={`https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&q=80`} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center pl-1 group-hover:scale-110 transition">
                         <PlayCircle className="text-white w-8 h-8 opacity-90" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Structured Reviews */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">Student Feedback</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                <div className="text-center"><div className="font-bold text-2xl text-slate-800 dark:text-white">5.0</div><div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Explanation</div></div>
                <div className="text-center"><div className="font-bold text-2xl text-slate-800 dark:text-white">4.8</div><div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Communication</div></div>
                <div className="text-center"><div className="font-bold text-2xl text-slate-800 dark:text-white">5.0</div><div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Punctuality</div></div>
                <div className="text-center"><div className="font-bold text-2xl text-slate-800 dark:text-white">4.9</div><div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Overall</div></div>
              </div>
              
              <div className="space-y-6">
                {[1, 2].map(i => (
                  <div key={i} className="border-b border-slate-100 dark:border-slate-800 pb-6 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                       <span className="font-bold text-slate-800 dark:text-white">Jane Student</span>
                       <span className="text-sm text-slate-400 block mb-2">2 days ago</span>
                    </div>
                    <div className="flex text-amber-400 mb-3"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
                    <p className="text-slate-600 dark:text-slate-400">Incredible tutor! Brought my grades from a C to an A+ in just two months. Explains quantum mechanics in a way that actually makes sense.</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column / Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-600 w-full overflow-hidden relative to-purple-700 rounded-3xl p-8 text-white shadow-xl">
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl border border-white/20" />
               <h3 className="font-bold text-lg mb-2 z-10 relative">💎 SmartScore System</h3>
               <p className="text-indigo-100 text-sm mb-4 leading-relaxed z-10 relative">This tutor ranks in the top 1% of our platform based on engagement, reviews, and response times.</p>
               <div className="text-5xl font-black z-10 relative">9.8<span className="text-xl text-indigo-300 font-medium">/10</span></div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="font-bold text-slate-800 dark:text-white mb-4">Availability</h3>
              <div className="space-y-2">
                {['Mon', 'Wed', 'Fri'].map(day => (
                   <div key={day} className="flex justify-between text-sm py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
                     <span className="font-medium text-slate-600 dark:text-slate-300">{day}</span>
                     <span className="text-indigo-600 font-semibold bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded">14:00 - 18:00</span>
                   </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
