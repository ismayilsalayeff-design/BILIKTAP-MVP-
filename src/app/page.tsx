import MapComponent from "@/components/MapComponent";
import { prisma } from "@/lib/prisma";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string; maxPrice?: string; minRating?: string }>;
}) {
  const resolvedParams = await searchParams;
  // Parsing filters
  const selectedSubject = resolvedParams.subject;
  const maxPrice = resolvedParams.maxPrice ? parseInt(resolvedParams.maxPrice) : 200;
  const minRating = resolvedParams.minRating ? parseFloat(resolvedParams.minRating) : 0;

  // DB Fetch
  const rawTutors = await prisma.tutorProfile.findMany({
    where: {
      pricePerHour: { lte: maxPrice },
      smartScore: { gte: minRating }, // we mock smartScore as the base rating for early queries
      // subject filtering would require querying the array, if we structured it
    },
    include: {
      user: true,
      subjects: true,
    }
  });

  // Since Subjects array matching can be complex in nested Prisma, we'll do quick memory filtering for MVP
  const filteredTutors = rawTutors.filter(t => {
    if (selectedSubject && selectedSubject !== "Bütün Fənlər") {
      const hasSubj = t.subjects.some(s => s.name === selectedSubject);
      if (!hasSubj) return false;
    }
    return true;
  });

  const mapData = filteredTutors.map(t => ({
    id: t.id,
    name: t.user.name,
    subject: t.subjects[0]?.name || "Fənn seçilməyib",
    pricePerHour: t.pricePerHour,
    rating: t.smartScore || 4.5,
    lat: t.lat || 40.3794 + (Math.random() - 0.5) * 0.1, // mock spread around baku if null
    lng: t.lng || 49.8671 + (Math.random() - 0.5) * 0.1,
  }));

  // Fallback mocks if DB is completely empty
  const finalMapData = mapData.length > 0 ? mapData : [
    {
      id: "demo1",
      name: "Aynur Əliyeva",
      subject: "Azərbaycan dili",
      pricePerHour: 60,
      rating: 4.8,
      lat: 40.385,
      lng: 49.855
    },
    {
      id: "demo2",
      name: "Rəşad Məmmədov",
      subject: "Riyaziyyat",
      pricePerHour: 100,
      rating: 5.0,
      lat: 40.400,
      lng: 49.880
    },
    {
      id: "demo3",
      name: "Fidan Qasımlı",
      subject: "İngilis dili",
      pricePerHour: 80,
      rating: 4.6,
      lat: 40.370,
      lng: 49.840
    },
    {
      id: "demo4",
      name: "Orxan Həsənov",
      subject: "Tarix",
      pricePerHour: 50,
      rating: 4.9,
      lat: 40.395,
      lng: 49.870
    },
    {
      id: "demo5",
      name: "Leyla Rüstəmova",
      subject: "Fizika",
      pricePerHour: 90,
      rating: 4.7,
      lat: 40.380,
      lng: 49.860
    },
    {
      id: "demo6",
      name: "Tofiq Quliyev",
      subject: "Proqramlaşdırma",
      pricePerHour: 150,
      rating: 5.0,
      lat: 40.410,
      lng: 49.850
    }
  ];

  return (
    <div className="flex flex-col flex-1 md:flex-row h-[calc(100vh-4rem)]">
      {/* Sidebar Mock - Teacher Filters */}
      <div className="hidden md:flex w-80 flex-col bg-[#06090e] border-r border-white/10 p-6 overflow-y-auto">
        <h2 className="text-lg font-bold mb-6 text-brand-green-500">Filtrlər</h2>
        
        <form className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-400 mb-2 block">Fənn</label>
            <select name="subject" defaultValue={selectedSubject || "Bütün Fənlər"} className="w-full p-2.5 border border-white/10 rounded-xl bg-[#11151c] text-white outline-none focus:border-brand-blue-500 transition cursor-pointer appearance-none">
              <option>Bütün Fənlər</option>
              <option>Azərbaycan dili</option>
              <option>Riyaziyyat</option>
              <option>İngilis dili</option>
              <option>Tarix</option>
              <option>Fizika</option>
              <option>Proqramlaşdırma</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-400 mb-2 flex justify-between">
              <span>Qiymət Limiti (Aylıq)</span>
              <span className="text-brand-green-500 font-bold">{maxPrice}₼</span>
            </label>
            <input type="range" name="maxPrice" defaultValue={maxPrice} min={30} max={300} step={10} className="w-full accent-brand-green-500 cursor-pointer" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-400 mb-2 block">Min. Antigravity Score</label>
            <div className="flex gap-2">
              {[4.0, 4.5, 4.8].map(rating => (
                <label key={rating} className={`flex-1 py-2 text-center border border-white/10 rounded-xl text-sm font-bold cursor-pointer transition ${minRating === rating ? 'bg-brand-blue-500/20 border-brand-blue-500 text-brand-blue-500' : 'hover:border-white/30 text-gray-400 hover:text-white'}`}>
                  <input type="radio" name="minRating" value={rating} defaultChecked={minRating === rating} className="hidden" />
                  {rating}+
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full py-3 mt-4 bg-white/5 border border-white/10 hover:border-brand-green-500 hover:bg-brand-green-500/10 text-white font-bold rounded-xl transition">
            Yenilə
          </button>
        </form>
      </div>

      {/* Main Map View Area */}
      <div className="flex-1 relative bg-[#11151c] overflow-hidden">
        <MapComponent tutors={finalMapData} />
      </div>
    </div>
  );
}
