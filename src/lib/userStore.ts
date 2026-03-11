export interface UserProfile {
  name: string;
  gender: "male" | "female" | "";
  age: number;
  city: string;
  photo: string; // base64 or URL
  bio: string;
  interests: string[];
  onboardingComplete: boolean;
  createdAt: string;
}

const STORAGE_KEY = "citramon_user";

const defaultProfile: UserProfile = {
  name: "",
  gender: "",
  age: 0,
  city: "",
  photo: "",
  bio: "",
  interests: [],
  onboardingComplete: false,
  createdAt: "",
};

export function getUserProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultProfile };
    return { ...defaultProfile, ...JSON.parse(raw) };
  } catch {
    return { ...defaultProfile };
  }
}

export function saveUserProfile(profile: Partial<UserProfile>) {
  const current = getUserProfile();
  const updated = { ...current, ...profile };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function clearUserProfile() {
  localStorage.removeItem(STORAGE_KEY);
}

export function isOnboardingComplete(): boolean {
  return getUserProfile().onboardingComplete;
}
