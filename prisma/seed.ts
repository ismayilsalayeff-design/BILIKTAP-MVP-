import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const subjects = [
  "Azərbaycan dili", "Riyaziyyat", "İngilis dili", "Tarix", 
  "Fizika", "Proqramlaşdırma", "Kimya", "Biologiya", "İnformatika"
];

// Coastline protection for Baku: longitude must not exceed ~49.92
const isSea = (lat: number, lng: number) => {
  if (lng > 49.92 && lat < 40.52) return true; // Most coastal areas of Baku/Absheron
  return false;
};

const specificTutors = [
  { name: "Zöhrab Əliyev", subject: "Fizika", price: 100, loc: "Bakı, Neftçilər", lat: 40.411, lng: 49.90 }, // Adjusted slightly West
  { name: "Rövşən Səfərov", subject: "Riyaziyyat", price: 120, loc: "Bakı, Qara Qarayev", lat: 40.418, lng: 49.91 },
  { name: "Günel İsmayilova", subject: "Azərbaycan dili", price: 80, loc: "Bakı, 8-ci km", lat: 40.422, lng: 49.91 },
  { name: "Samirə Abutalıbova", subject: "İngilis dili", price: 90, loc: "Gəncə", lat: 40.68, lng: 46.36 },
  { name: "Anar Rəşidov", subject: "İnformatika", price: 110, loc: "Naxçıvan", lat: 39.21, lng: 45.41 },
];

const regions = [
  { name: "Bakı", lat: 40.38, lng: 49.82 }, // Moved center West
  { name: "Gəncə", lat: 40.68, lng: 46.36 },
  { name: "Naxçıvan", lat: 39.21, lng: 45.41 },
  { name: "Lənkəran", lat: 38.75, lng: 48.85 },
  { name: "Sumqayıt", lat: 40.58, lng: 49.67 },
  { name: "Şəki", lat: 41.20, lng: 47.19 },
  { name: "Quba", lat: 41.36, lng: 48.51 }
];

const firstNames = ["Aynur", "Rəşad", "Fidan", "Orxan", "Leyla", "Tofiq", "Səidə", "Nurlan", "Zəhra", "Cavidan", "Aysel", "Emil", "Günay", "Ramin", "Lalə", "Samir", "Nəzrin", "Kamil", "Fəridə", "İlham", "Tural", "Nigar", "Elvin", "Şəlalə", "Mənsur"];
const lastNames = ["Əliyeva", "Məmmədov", "Qasımlı", "Həsənov", "Rüstəmova", "Quliyev", "Hüseynova", "İsmayılov", "Abbasova", "Sultanov", "Əkbərova", "Nağıyev", "Cəfərova", "Nəbiyev", "Babayeva", "Muradov", "Şükürova", "Qədimov", "Seyidova", "Rəhimov", "Paşayev", "Aydınlı", "Məmmədli", "Vəliyev"];

async function main() {
  console.log("Seeding database (100 tutors total)...");

  const subjectMap: Record<string, any> = {};
  for (const name of subjects) {
    const s = await prisma.subject.upsert({ where: { name }, update: {}, create: { name } });
    subjectMap[name] = s;
  }

  const hashedPassword = await bcrypt.hash("123456", 10);
  const createdTutors = [];
  
  // 1. Specific Tutors
  for (const t of specificTutors) {
    const email = t.name.toLowerCase().replace(/ /g, ".") + "@biliktap.az";
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        name: t.name, email, password: hashedPassword, role: "TUTOR",
        tutorProfile: {
          create: {
            bio: `Mən ${t.name}. ${t.subject} fənni üzrə peşəkar tədris xidməti təklif edirəm.`,
            experienceYears: 7, pricePerHour: t.price, lat: t.lat, lng: t.lng, locationString: t.loc, isVerified: true, smartScore: 4.9,
            subjects: { connect: { id: subjectMap[t.subject].id } }
          }
        }
      },
      include: { tutorProfile: true }
    });
    createdTutors.push(user.tutorProfile!);
  }

  // 2. Regional Tutors (10 per non-Baku city)
  let tutorCount = 5;
  for (const region of regions) {
    const countToCreate = region.name === "Bakı" ? 40 : 10;
    console.log(`Generating ${countToCreate} tutors for ${region.name}...`);
    
    for (let i = 0; i < countToCreate; i++) {
      const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const email = `reg_tutor_${region.name.toLowerCase()}_${i}@biliktap.az`;
      const randomSubjName = subjects[Math.floor(Math.random() * subjects.length)];
      
      let lat, lng;
      let attempts = 0;
      do {
        lat = region.lat + (Math.random() - 0.5) * (region.name === "Bakı" ? 0.1 : 0.08);
        lng = region.lng + (Math.random() - 0.5) * (region.name === "Bakı" ? 0.1 : 0.08);
        attempts++;
      } while (region.name === "Bakı" && isSea(lat, lng) && attempts < 10);

      const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
          name: `${fName} ${lName}`, email, password: hashedPassword, role: "TUTOR",
          tutorProfile: {
            create: {
              bio: `Salam, mən ${fName} ${lName}. ${randomSubjName} üzrə tədrislə məşğulam.`,
              experienceYears: Math.floor(Math.random() * 12 + 2), pricePerHour: 30 + Math.random() * 220, lat, lng, locationString: region.name, isVerified: Math.random() > 0.5, smartScore: 3.5 + Math.random() * 1.5,
              subjects: { connect: { id: subjectMap[randomSubjName].id } }
            }
          }
        },
        include: { tutorProfile: true }
      });
      createdTutors.push(user.tutorProfile!);
      tutorCount++;
    }
  }

  // 3. Reels (first 40)
  console.log("Creating reels...");
  for (const tp of createdTutors.slice(0, 40)) {
    await prisma.video.upsert({
      where: { id: `vid-safe-${tp.id}` },
      update: {},
      create: {
        id: `vid-safe-${tp.id}`, tutorId: tp.id, url: "https://www.w3schools.com/html/mov_bbb.mp4", title: "Dərs videosu", likes: Math.floor(Math.random() * 1500), durationSec: 30
      }
    });
  }

  console.log(`Seeding complete! Total: ${createdTutors.length} tutors.`);
}

main().catch(e => console.error(e)).finally(async () => await prisma.$disconnect());
