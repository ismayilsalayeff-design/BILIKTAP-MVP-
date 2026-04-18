import MapComponent from "@/components/MapComponent";
import FilterSidebar from "@/components/FilterSidebar";
import { prisma } from "@/lib/prisma";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; subject?: string; maxPrice?: string; minRating?: string }>;
}) {
  const resolvedParams = await searchParams;
  
  // Parsing filters
  const query = resolvedParams.q || "";
  const selectedSubject = resolvedParams.subject;
  const maxPrice = resolvedParams.maxPrice ? parseInt(resolvedParams.maxPrice) : 250;
  const minRating = resolvedParams.minRating ? parseFloat(resolvedParams.minRating) : 0;

  // DB Fetch with Name Search Support
  const rawTutors = await prisma.tutorProfile.findMany({
    where: {
      pricePerHour: { lte: maxPrice },
      smartScore: { gte: minRating },
      user: query ? { 
        name: { 
          contains: query,
          mode: 'insensitive',
        } 
      } : undefined,
    },
    include: {
      user: true,
      subjects: true,
    },
    orderBy: {
      smartScore: "desc",
    }
  });

  // Subject filtering (in-memory for MVP robustness with Prisma relations)
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
    lat: t.lat || 40.3794 + (Math.random() - 0.5) * 0.1,
    lng: t.lng || 49.8671 + (Math.random() - 0.5) * 0.1,
  }));

  // Render
  return (
    <div className="flex flex-col flex-1 md:flex-row h-[calc(100vh-4rem)]">
      {/* Sidebar - Integrated Live Filters */}
      <FilterSidebar />

      {/* Main Map View Area */}
      <div className="flex-1 relative bg-[#11151c] overflow-hidden">
        <MapComponent tutors={mapData} />
        
        {/* Results Count Overlay */}
        <div className="absolute top-6 left-6 z-10">
          <div className="bg-[#06090e]/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-xs font-bold text-white shadow-xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-green-500 animate-pulse"></span>
            {filteredTutors.length} müəllim tapıldı
          </div>
        </div>
      </div>
    </div>
  );
}
