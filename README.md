# BilikTap Antigravity MVP 🚀

BilikTap müəllimlər və tələbələri bir araya gətirən tam müasir, yüksək sürətli (Antigravity dizaynlı) və interaktiv təhsil platformasıdır.

## 🌟 Əsas Xüsusiyyətlər
- **Antigravity UI/UX:** Qaranlıq mövzu, yaşıl və mavi vurğularla sürətli və yüngül interfeys.
- **Xəritə Üzərindən Kəşf (Google Maps API):** Müəllimləri şəhərin fərqli bölgələrində dinamik şəkildə tapın.
- **Reels Tərzində Videolar:** Müəllimləri və onların dərslərini birbaşa qısa videolar şəklində izləyin, yadda saxlayın və bəyənin (Optimistic UI mantığı ilə).
- **Təhlükəsiz Autentifikasiya:** NextAuth və bcrypt vasitəsilə 100% təhlükəsiz giriş/qeydiyyat sistemi və qorunan panellər.
- **Dinamik Filtrləmə Sistemi:** Müəllimləri ixtisaslara, qiymətlərə və "Antigravity" balına görə saniyələr içində tapın.

## 🛠 İstifadədə Olan Texnologiyalar
- **Frontend/Backend:** Next.js 15 (App Router), Server Actions
- **Verilənlər Bazası:** Prisma (SQLite)
- **Stil və Dizayn:** TailwindCss v4, Glassmorphism effektləri, Lucide-React
- **Autentifikasiya:** NextAuth.js (Credentials Provider)

## 📦 Necə Başlamalı?

1. Layihəni kompüterinizə yükləyin (və ya Clone edin):
   ```bash
   git clone https://github.com/SƏNİN_ADIN/biliktap-mpv.git
   ```

2. Paketləri quraşdırın:
   ```bash
   npm install
   ```

3. `.env` faylı yaradın və aşağıdakıları daxil edin:
   ```env
   DATABASE_URL="file:./dev.db"
   AUTH_SECRET="my-super-secret-antigravity-key"
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="AIz...Sizin Google Maps Açarınız"
   ```

4. Verilənlər bazasını sinxronlaşdırın və ilk məlumatları (20 test müəllimi) yükləyin:
   ```bash
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

5. Serveri başladın:
   ```bash
   npm run dev
   ```

Server işə düşdükdən sonra brauzerdə `http://localhost:3000` linkinə daxil olaraq layihəni incələyə bilərsiniz. Uğurlar! 🛸
