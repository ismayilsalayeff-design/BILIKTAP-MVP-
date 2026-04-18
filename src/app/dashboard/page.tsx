import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Save, Settings, Video as VideoIcon } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session || !session.user) {
    redirect("/login");
  }

  // Fetch tutor profile if user is a TUTOR
  const isTutor = session.user.role === "TUTOR";
  let tutorProfile = null;
  
  if (isTutor) {
    tutorProfile = await prisma.tutorProfile.findUnique({
      where: { userId: session.user.id },
    });
  }

  async function updateProfile(formData: FormData) {
    "use server";
    const sessionLocal = await auth();
    if (!sessionLocal || sessionLocal.user.role !== "TUTOR") return;

    const bio = formData.get("bio") as string;
    const price = parseFloat(formData.get("price") as string);
    const location = formData.get("location") as string;

    await prisma.tutorProfile.update({
      where: { userId: sessionLocal.user.id },
      data: {
        bio,
        pricePerHour: isNaN(price) ? 0 : price,
        locationString: location,
      }
    });

    revalidatePath("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#06090e] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">İdarə Paneli (Dashboard)</h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* User Basic Info */}
          <div className="glass p-6 rounded-2xl border border-white/10 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-brand-green-500/20 border border-brand-green-500/50 flex items-center justify-center text-4xl font-bold text-brand-green-500 mb-4">
              {session.user.name?.charAt(0)}
            </div>
            <h2 className="text-xl font-bold text-white mb-1">{session.user.name}</h2>
            <p className="text-gray-400 text-sm mb-4">{session.user.email}</p>
            <span className="bg-brand-blue-500/20 text-brand-blue-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {session.user.role}
            </span>
          </div>

          {/* Tutor Specific Settings */}
          <div className="md:col-span-2 space-y-6">
            {!isTutor ? (
              <div className="glass p-6 rounded-2xl border border-white/10 text-center text-gray-400">
                Tələbə paneli üçün əlavə funksiyalar hazırlanır. Üstünlük hazırda "Antigravity" müəllimlərindədir.
              </div>
            ) : (
              <>
                <div className="glass p-6 rounded-2xl border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Settings className="text-brand-green-500" /> Profil Tənzimləmələri
                  </h3>
                  <form action={updateProfile} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-400">Haqqında (Bio)</label>
                      <textarea name="bio" defaultValue={tutorProfile?.bio} rows={3} className="w-full bg-[#0a0f16] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-brand-green-500 transition-colors"></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-400">Qiymət ($/saat)</label>
                        <input name="price" type="number" defaultValue={tutorProfile?.pricePerHour} className="w-full bg-[#0a0f16] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-brand-green-500 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-400">Məkan</label>
                        <input name="location" defaultValue={tutorProfile?.locationString || ""} className="w-full bg-[#0a0f16] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-brand-green-500 transition-colors" placeholder="Məs: Bakı, Nərimanov" />
                      </div>
                    </div>
                    <div className="flex justify-end pt-2">
                      <button type="submit" className="bg-brand-green-500 text-black font-bold px-6 py-2.5 rounded-xl hover:bg-brand-green-600 transition flex items-center gap-2 shadow-[0_0_15px_rgba(0,223,137,0.3)]">
                        <Save size={18} /> Yadda Saxla
                      </button>
                    </div>
                  </form>
                </div>

                {/* Video / Reels Upload Placeholder */}
                <div className="glass p-6 rounded-2xl border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <VideoIcon className="text-brand-blue-500" /> Video (Reels) Yüklə
                  </h3>
                  <div className="border-2 border-dashed border-white/10 hover:border-brand-blue-500/50 transition bg-[#0a0f16] rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer">
                    <div className="bg-white/5 p-4 rounded-full mb-3">
                      <VideoIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-400">Yeni video MP4 faylını bura sürükləyin (Tezliklə)</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
