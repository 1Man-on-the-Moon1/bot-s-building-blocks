import { motion } from "framer-motion";
import { Star, MapPin, Calendar, Edit3 } from "lucide-react";

const tags = ["Пунктуальный", "Вежливый", "Соответствие фото", "Интересный"];

const Profile = () => (
  <div className="px-4 pt-safe-top">
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
      <div className="h-48 bg-gradient-to-br from-primary/25 via-card to-accent/15 flex items-center justify-center relative">
        <span className="text-7xl">🙂</span>
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm">
          <Star size={14} className="fill-accent text-accent" />
          <span className="text-sm font-bold">4.8</span>
        </div>
      </div>

      <div className="p-5">
        <h2 className="text-xl font-bold">Александр, 25</h2>
        <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
          <MapPin size={14} />
          Минск
        </div>

        <p className="text-sm text-foreground/70 mt-3">
          Разработчик, люблю музыку и горные лыжи 🎿🎵
        </p>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1.5 rounded-full bg-secondary text-xs font-medium text-foreground/70">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>

    {/* Stats */}
    <div className="grid grid-cols-3 gap-2 mt-4">
      {[
        { value: "12", label: "Свиданий" },
        { value: "4.8", label: "Рейтинг" },
        { value: "89%", label: "Отзывы +" },
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

    {/* Recent reviews */}
    <div className="mt-6">
      <h3 className="text-base font-semibold mb-3">Последние отзывы</h3>
      {[
        { from: "Алина", text: "Приятный собеседник, пришёл вовремя!", stars: 5 },
        { from: "Мария", text: "Интересный, но немного застенчивый 😅", stars: 4 },
      ].map((review, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.05 }}
          className="rounded-2xl bg-card border border-border/30 p-4 mb-2"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-semibold">{review.from}</span>
            <div className="flex gap-0.5">
              {Array.from({ length: review.stars }).map((_, s) => (
                <Star key={s} size={12} className="fill-accent text-accent" />
              ))}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{review.text}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default Profile;
