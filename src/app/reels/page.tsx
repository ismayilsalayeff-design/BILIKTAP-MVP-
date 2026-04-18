import ReelsFeed from "@/components/ReelsFeed";
import { prisma } from "@/lib/prisma";

export default async function ReelsPage() {
  const videos = await prisma.video.findMany({
    include: {
      tutorProfile: {
        include: {
          user: true,
          subjects: true,
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  const dynamicReels = videos.map(v => ({
    id: v.id,
    url: v.url,
    tutorId: v.tutorProfile.id,
    tutorName: v.tutorProfile.user.name,
    subject: v.tutorProfile.subjects[0]?.name || "Ümumi",
    rating: v.tutorProfile.smartScore || 5.0,
    price: v.tutorProfile.pricePerHour,
    title: v.title || "Tədris videosu",
    initialLikes: v.likes,
  }));

  return (
    <div className="bg-slate-950 min-h-screen flex items-center justify-center pt-16">
      <ReelsFeed activeReels={dynamicReels} />
    </div>
  );
}
