import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const subjects = [
  "Azərbaycan dili", "Riyaziyyat", "İngilis dili", "Tarix", 
  "Fizika", "Proqramlaşdırma", "Kimya", "Biologiya", "İnformatika"
];

const specificTutors = [
  { name: "Zöhrab Əliyev", subject: "Fizika", price: 100, loc: "Bakı, Neftçilər", lat: 40.411, lng: 49.943 },
  { name: "Rövşən Səfərov", subject: "Riyaziyyat", price: 100, loc: "Bakı, Qara Qarayev", lat: 40.418, lng: 49.932 },
  { name: "Günel İsmayilova", subject: "Azərbaycan dili", price: 100, loc: "Bakı, 8-ci km", lat: 40.422, lng: 49.954 },
  { name: "Samirə Abutalıbova", subject: "İngilis dili", price: 100, loc: "Gəncə", lat: 40.68, lng: 46.36 },
  { name: "Anar Rəşidov", subject: "İnformatika", price: 100, loc: "Naxçıvan", lat: 39.21, lng: 45.41 },
];

const regions = [
  { name: "Bakı", lat: 40.40, lng: 49.86 },
  { name: "Gəncə", lat: 40.68, lng: 46.36 },
  { name: "Naxçıvan", lat: 39.21, lng: 45.41 },
  { name: "Lənkəran", lat: 38.75, lng: 48.85 },
  { name: "Sumqayıt", lat: 40.58, lng: 49.67 }
];

const firstNames = ["Aynur", "Rəşad", "Fidan", "Orxan", "Leyla", "Tofiq", "Səidə", "Nurlan", "Zəhra", "Cavidan", "Aysel", "Emil", "Günay", "Ramin", "Lalə", "Samir", "Nəzrin", "Kamil", "Fəridə", "İlham"];
const lastNames = ["Əliyeva", "Məmmədov", "Qasımlı", "Həsənov", "Rüstəmova", "Quliyev", "Hüseynova", "İsmayılov", "Abbasova", "Sultanov", "Əkbərova", "Nağıyev", "Cəfərova", "Nəbiyev", "Babayeva", "Muradov", "Şükürova", "Qədimov", "Seyidova", "Rəhimov"];

async function main() {
  console.log("Seeding database (25 tutors total)...");

  // Clean old tutors if using Push
  // (Optional: prisma.user.deleteMany({ where: { role: 'TUTOR' } }))

  // Create subjects
  const subjectMap: Record<string, any> = {};
  for (const name of subjects) {
    const s = await prisma.subject.upsert({
      where: { name },
      update: {},
      create: { name }
    });
    subjectMap[name] = s;
  }

  const hashedPassword = await bcrypt.hash("123456", 10);

  // 1. Create Specific Tutors
  console.log("Creating specific tutors...");
  const createdTutors = [];
  for (const t of specificTutors) {
    const email = t.name.toLowerCase().replace(/ /g, ".") + "@biliktap.az";
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        name: t.name,
        email: email,
        password: hashedPassword,
        role: "TUTOR",
        tutorProfile: {
          create: {
            bio: `Mən ${t.name}. ${t.subject} fənni üzrə peşəkar tədris xidməti təklif edirəm.`,
            experienceYears: 5,
            pricePerHour: t.price,
            lat: t.lat,
            lng: t.lng,
            locationString: t.loc,
            isVerified: true,
            smartScore: 4.9,
            subjects: {
              connect: { id: subjectMap[t.subject].id }
            }
          }
        }
      },
      include: { tutorProfile: true }
    });
    createdTutors.push(user.tutorProfile!);
  }

  // 2. Generate 20 random tutors (Total 25)
  console.log("Generating 20 random tutors across Azerbaijan...");
  for (let i = 0; i < 20; i++) {
    const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const email = `tutor_final_${i + 1}@biliktap.az`;
    const randomSubjName = subjects[Math.floor(Math.random() * subjects.length)];
    
    const region = regions[Math.floor(Math.random() * regions.length)];
    const lat = region.lat + (Math.random() - 0.5) * 0.05;
    const lng = region.lng + (Math.random() - 0.5) * 0.05;

    const price = Math.floor(Math.random() * 20 + 5) * 10;
    const score = 3.5 + Math.random() * 1.5;

    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        name: `${fName} ${lName}`,
        email: email,
        password: hashedPassword,
        role: "TUTOR",
        tutorProfile: {
          create: {
            bio: `Mən ${fName} ${lName}. Uzun illərdir ki, ${randomSubjName} fənni üzrə tədrislə məşğulam.`,
            experienceYears: 5,
            pricePerHour: price,
            lat,
            lng,
            locationString: region.name,
            isVerified: Math.random() > 0.7,
            smartScore: score,
            subjects: {
              connect: { id: subjectMap[randomSubjName].id }
            }
          }
        }
      },
      include: { tutorProfile: true }
    });
    createdTutors.push(user.tutorProfile!);
  }

  // 3. Generate Videos (Reels) for these tutors
  console.log("Creating videos for reels...");
  for (const tp of createdTutors) {
    await prisma.video.create({
      data: {
        tutorId: tp.id,
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
        title: "Tədris videosu",
        likes: Math.floor(Math.random() * 500),
        durationSec: 30
      }
    });
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
