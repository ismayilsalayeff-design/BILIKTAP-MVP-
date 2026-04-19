export type Language = "aze" | "rus" | "eng";

export const translations = {
  aze: {
    navbar: {
      discovery: "Kəşf et",
      reels: "Reels",
      login: "Giriş",
      dashboard: "Panel",
      map: "Xəritə",
      logout: "Çıxış",
    },
    filter: {
      title: "Filtrlər",
      search: "Müəllim axtarışı",
      searchPlaceholder: "Müəllim adı ilə axtar...",
      subject: "Fənn",
      allSubjects: "Bütün Fənlər",
      price: "Qiymət (₼/saat)",
      rating: "Minimum Reytinq",
      apply: "Tətbiq et",
      reset: "Sıfırla",
    },
    map: {
      lookForTutors: "Kosmos taranır... (Antigravity)",
      noTutorsFound: "Bu kriteriyalara uyğun müəllim tapılmadı.",
      viewProfile: "Profilə bax",
      perMonth: "₼ / aylıq",
      tutorsFound: "müəllim tapıldı",
      error: "Xəritə yüklənə bilmədi",
      errorDesc: "Google Maps API açarı əksikdir və ya şəbəkə xətası baş verdi.",
    },
    reels: {
      noVideos: "Video tapılmadı",
      noVideosDesc: "Hazırda sistemdə izləməyə video yoxdur.",
    }
  },
  rus: {
    navbar: {
      discovery: "Поиск",
      reels: "Reels",
      login: "Вход",
      dashboard: "Панель",
      map: "Карта",
      logout: "Выход",
    },
    filter: {
      title: "Фильтры",
      search: "Поиск учителя",
      searchPlaceholder: "Поиск по имени...",
      subject: "Предмет",
      allSubjects: "Все предметы",
      price: "Цена (₼/час)",
      rating: "Минимальный рейтинг",
      apply: "Применить",
      reset: "Сбросить",
    },
    map: {
      lookForTutors: "Сканирование космоса...",
      noTutorsFound: "Учителя не найдены по этим критериям.",
      viewProfile: "Профиль",
      perMonth: "₼ / мес",
      tutorsFound: "учителей найдено",
      error: "Не удалось загрузить карту",
      errorDesc: "Ключ Google Maps API отсутствует или произошла ошибка сети.",
    },
    reels: {
      noVideos: "Видео не найдено",
      noVideosDesc: "На данный момент в системе нет видео.",
    }
  },
  eng: {
    navbar: {
      discovery: "Discovery",
      reels: "Reels",
      login: "Login",
      dashboard: "Dashboard",
      map: "Map",
      logout: "Logout",
    },
    filter: {
      title: "Filters",
      search: "Tutor Search",
      searchPlaceholder: "Search by name...",
      subject: "Subject",
      allSubjects: "All Subjects",
      price: "Price (₼/hr)",
      rating: "Min Rating",
      apply: "Apply",
      reset: "Reset",
    },
    map: {
      lookForTutors: "Scanning Space...",
      noTutorsFound: "No tutors found matching these criteria.",
      viewProfile: "View Profile",
      perMonth: "₼ / mo",
      tutorsFound: "tutors found",
      error: "Failed to load map",
      errorDesc: "Google Maps API key is missing or a network error occurred.",
    },
    reels: {
      noVideos: "No videos found",
      noVideosDesc: "There are currently no videos to watch.",
    }
  }
};
