"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string; // STUDENT or TUTOR

  if (!name || !email || !password || !role) {
    return { error: "Zəhmət olmasa, bütün sahələri doldurun." };
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return { error: "Bu email ilə artıq qeydiyyatdan keçilib." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    if (role === "TUTOR") {
      await prisma.tutorProfile.create({
        data: {
          userId: user.id,
          bio: "Yeni müəllim",
        },
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Register Error:", error);
    return { error: "Qeydiyyat zamanı xəta baş verdi." };
  }
}
