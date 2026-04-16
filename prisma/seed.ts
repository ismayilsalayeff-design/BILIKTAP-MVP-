import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const subjects = [
  "Azərbaycan dili", "Riyaziyyat", "İngilis dili", "Tarix", 
  "Fizika", "Proqramlaşdırma", "Kimya", "Biologiya"
];

const firstNames = ["Aynur", "Rəşad", "Fidan", "Orxan", "Leyla", "Tofiq", "Səidə", "Nurlan", "Zəhra", "Cavidan", "Aysel", "Emil", "Günay", "Ramin", "Lalə", "Samir", "Nəzrin", "Kamil", "Fəridə", "İlham"];
const lastNames = ["Əliyeva", "Məmmədov", "Qasımlı", "Həsənov", "Rüstəmova", "Quliyev", "Hüseynova", "İsmayılov", "Abbasova", "Sultanov", "Əkbərova", "Nağıyev", "Cəfərova", "Nəbiyev", "Babayeva", "Muradov", "Şükürova", "Qədimov", "Seyidova", "Rəhimov"];

async function main() {
  console.log("Seeding database with 20 tutors...");

  // Create subjects first
  const subjectRecords = [];
  for (const name of subjects) {
    const s = await prisma.subject.upsert({
      where: { name },
      update: {},
      create: { name }
    });
    subjectRecords.push(s);
  }

  const hashedPassword = await bcrypt.hash("123456", 10);

  // Generate 20 tutors
  for (let i = 0; i < 20; i++) {
    const fName = firstNames[i];
    const lName = lastNames[i];
    const email = `tutor${i + 1}@biliktap.az`;
    const randomSubj = subjectRecords[Math.floor(Math.random() * subjectRecords.length)];
    const lat = 40.35 + Math.random() * 0.1; // random spread around Baku
    const lng = 49.82 + Math.random() * 0.1;

    const price = Math.floor(Math.random() * 15 + 5) * 10; // 50 to 200
    const score = 4.0 + Math.random(); // 4.0 to 5.0
    const exp = Math.floor(Math.random() * 10) + 1; // 1 to 10

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
            bio: `Mən ${fName}. Uzun illərdir ki, bu fənn üzrə tədrislə məşğulam.`,
            experienceYears: exp,
            pricePerHour: price,
            lat,
            lng,
            locationString: "Bakı şəhəri",
            isVerified: i % 3 === 0, // Verify some
            smartScore: score,
            subjects: {
              connect: { id: randomSubj.id }
            }
          }
        }
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
