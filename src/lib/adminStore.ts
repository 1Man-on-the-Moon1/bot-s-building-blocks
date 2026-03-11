// Admin authentication & mock data store
const ADMIN_KEY = "citramon_admin";
const ADMIN_PASSWORD = "admin2024"; // Change this before deploying

export function isAdminAuthenticated(): boolean {
  return sessionStorage.getItem(ADMIN_KEY) === "true";
}

export function adminLogin(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem(ADMIN_KEY, "true");
    return true;
  }
  return false;
}

export function adminLogout() {
  sessionStorage.removeItem(ADMIN_KEY);
}

// Mock data types
export interface MockUser {
  id: number;
  name: string;
  gender: "male" | "female";
  age: number;
  city: string;
  bio: string;
  rating: number;
  reviewsCount: number;
  isBanned: boolean;
  createdAt: string;
  lastActive: string;
}

export interface MockComplaint {
  id: number;
  fromUserId: number;
  fromUserName: string;
  targetUserId: number;
  targetUserName: string;
  type: string;
  status: "pending" | "resolved";
  createdAt: string;
}

export interface AdminStats {
  totalUsers: number;
  activeToday: number;
  newThisWeek: number;
  totalMatches: number;
  totalDates: number;
  pendingComplaints: number;
  bannedUsers: number;
}

// Mock data
export const mockUsers: MockUser[] = [
  { id: 1, name: "Алексей", gender: "male", age: 24, city: "Минск", bio: "Люблю спорт и кино", rating: 4.8, reviewsCount: 12, isBanned: false, createdAt: "2025-12-01", lastActive: "2026-03-11" },
  { id: 2, name: "Мария", gender: "female", age: 22, city: "Брест", bio: "Студентка, увлекаюсь фотографией", rating: 4.5, reviewsCount: 8, isBanned: false, createdAt: "2025-12-15", lastActive: "2026-03-10" },
  { id: 3, name: "Дмитрий", gender: "male", age: 28, city: "Гомель", bio: "Программист, ищу интересных людей", rating: 3.2, reviewsCount: 5, isBanned: false, createdAt: "2026-01-05", lastActive: "2026-03-09" },
  { id: 4, name: "Анна", gender: "female", age: 20, city: "Минск", bio: "Люблю путешествия и кулинарию", rating: 4.9, reviewsCount: 15, isBanned: false, createdAt: "2026-01-10", lastActive: "2026-03-11" },
  { id: 5, name: "Иван", gender: "male", age: 26, city: "Витебск", bio: "Музыкант, играю на гитаре", rating: 2.1, reviewsCount: 3, isBanned: true, createdAt: "2026-02-01", lastActive: "2026-02-28" },
  { id: 6, name: "Ольга", gender: "female", age: 25, city: "Гродно", bio: "Йога и здоровый образ жизни", rating: 4.7, reviewsCount: 10, isBanned: false, createdAt: "2026-02-10", lastActive: "2026-03-11" },
  { id: 7, name: "Сергей", gender: "male", age: 30, city: "Могилёв", bio: "Авто и мото энтузиаст", rating: 3.8, reviewsCount: 6, isBanned: false, createdAt: "2026-02-20", lastActive: "2026-03-08" },
  { id: 8, name: "Екатерина", gender: "female", age: 23, city: "Минск", bio: "Художница, люблю театр", rating: 4.3, reviewsCount: 9, isBanned: false, createdAt: "2026-03-01", lastActive: "2026-03-11" },
];

export const mockComplaints: MockComplaint[] = [
  { id: 1, fromUserId: 2, fromUserName: "Мария", targetUserId: 5, targetUserName: "Иван", type: "Не пришёл на встречу", status: "pending", createdAt: "2026-03-08" },
  { id: 2, fromUserId: 4, fromUserName: "Анна", targetUserId: 3, targetUserName: "Дмитрий", type: "Фейк", status: "pending", createdAt: "2026-03-09" },
  { id: 3, fromUserId: 6, fromUserName: "Ольга", targetUserId: 5, targetUserName: "Иван", type: "Не пришёл на встречу", status: "resolved", createdAt: "2026-03-05" },
];

export function getAdminStats(): AdminStats {
  return {
    totalUsers: mockUsers.length,
    activeToday: mockUsers.filter(u => u.lastActive === "2026-03-11").length,
    newThisWeek: mockUsers.filter(u => u.createdAt >= "2026-03-05").length,
    totalMatches: 23,
    totalDates: 8,
    pendingComplaints: mockComplaints.filter(c => c.status === "pending").length,
    bannedUsers: mockUsers.filter(u => u.isBanned).length,
  };
}
