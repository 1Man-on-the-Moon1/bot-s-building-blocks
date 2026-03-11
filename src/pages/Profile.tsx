import { motion } from "framer-motion";
import { Star, MapPin, Edit3, LogOut } from "lucide-react";
import { getUserProfile, clearUserProfile } from "@/lib/userStore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const profile = getUserProfile();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUserProfile();
    navigate("/welcome", { replace: true });
  };

  const tags = ["Пунктуальный", "Вежливый", "Соответствие фото", "Интересная"];

  return (
    <div className="px-4 pt-safe-top pb-8">
      <div className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-bold font-display">Профиль</h1>
        <button className="w-9 h-9 rounded-xl bg-card border border-border/30 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <Edit3 size={16} />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-card border border-border/30 overflow-hidden"
      >
        {/* Avatar area */}
        <div className="h-48 bg-gradient-to-br from-primary/25 via-card to-accent/15 flex items-center justify-center relative overflow-hidden">
          {profile.photo ? (
            <img src={profile.photo} alt="Фото" className="w-full h-full object-cover" />
          ) : (
            <span className="text-7xl">🙂</span>
          )}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm">
            <Star size={14} className="fill-accent text-accent" />
            <span className="text-sm font-bold">5.0</span>
          </div>
        </div>

        <div className="p-5">
          <h2 className="text-xl font-bold">
            {profile.name || "Пользователь"}{profile.age ? `, ${profile.age}` : ""}
          </h2>
          {profile.city && (
            <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
              <MapPin size={14} />
              {profile.city}
            </div>
          )}

          {profile.bio && (
            <p className="text-sm text-foreground/70 mt-3">{profile.bio}</p>
          )}

          {profile.interests.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {profile.interests.map((interest) => (
                <span key={interest} className="px-3 py-1.5 rounded-full bg-secondary text-xs font-medium text-foreground/70">
                  {interest}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        {[
          { value: "0", label: "Свиданий" },
          { value: "5.0", label: "Рейтинг" },
          { value: "—", label: "Отзывы" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="rounded-2xl bg-card border border-border/30 p-4 text-center"
          >
            <div className="text-lg font-bold">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Reviews placeholder */}
      <div className="mt-6">
        <h3 className="text-base font-semibold mb-3">Последние отзывы</h3>
        <div className="rounded-2xl bg-card border border-border/30 p-6 text-center">
          <p className="text-sm text-muted-foreground">Пока нет отзывов</p>
          <p className="text-xs text-muted-foreground mt-1">Они появятся после первого свидания</p>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full mt-6 py-3 rounded-2xl border border-destructive/30 text-destructive text-sm font-medium flex items-center justify-center gap-2 hover:bg-destructive/10 transition-colors"
      >
        <LogOut size={16} />
        Удалить анкету и выйти
      </button>
    </div>
  );
};

export default Profile;
