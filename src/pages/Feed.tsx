import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Star, MapPin } from "lucide-react";

const mockProfiles = [
  { id: 1, name: "Алина", age: 24, city: "Минск", rating: 4.7, bio: "Люблю путешествия и хорошие книги ✈️📚", tags: ["Пунктуальная", "Общительная"] },
  { id: 2, name: "Дарья", age: 22, city: "Гомель", rating: 4.3, bio: "Фотограф, кошатница, танцую сальсу 💃", tags: ["Весёлая", "Креативная"] },
  { id: 3, name: "Мария", age: 26, city: "Брест", rating: 4.9, bio: "Врач, йога по утрам, кофеман ☕", tags: ["Пунктуальная", "Вежливая", "Интересная"] },
  { id: 4, name: "Екатерина", age: 23, city: "Минск", rating: 4.1, bio: "Студентка, обожаю настолки и квизы 🎲", tags: ["Общительная"] },
];

const Feed = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitX, setExitX] = useState(0);

  const profile = mockProfiles[currentIndex % mockProfiles.length];

  const handleSwipe = (direction: "left" | "right") => {
    setExitX(direction === "right" ? 300 : -300);
    setTimeout(() => {
      setCurrentIndex((i) => i + 1);
      setExitX(0);
    }, 200);
  };

  return (
    <div className="px-4 pt-safe-top">
      {/* Header */}
      <div className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-bold font-display">Citramon</h1>
        <div className="flex items-center gap-1 text-accent text-sm font-semibold">
          <Star size={16} className="fill-accent" />
          <span>4.8</span>
        </div>
      </div>

      {/* Card stack */}
      <div className="relative h-[65vh] w-full max-w-sm mx-auto">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ x: exitX, opacity: 0, rotate: exitX > 0 ? 12 : -12 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute inset-0 rounded-3xl bg-card border border-border/50 overflow-hidden flex flex-col"
          >
            {/* Photo placeholder */}
            <div className="flex-1 bg-gradient-to-br from-primary/20 via-card to-accent/10 flex items-center justify-center">
              <span className="text-8xl">😊</span>
            </div>

            {/* Info */}
            <div className="p-5">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-xl font-bold">{profile.name}, {profile.age}</span>
                <div className="flex items-center gap-1 text-accent text-sm">
                  <Star size={14} className="fill-accent" />
                  {profile.rating}
                </div>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                <MapPin size={14} />
                {profile.city}
              </div>
              <p className="text-sm text-foreground/80 mb-3">{profile.bio}</p>
              <div className="flex flex-wrap gap-1.5">
                {profile.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full bg-secondary text-xs font-medium text-foreground/70">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-6 mt-6">
        <button
          onClick={() => handleSwipe("left")}
          className="w-14 h-14 rounded-full bg-card border border-border/50 flex items-center justify-center text-destructive hover:bg-destructive/10 transition-colors active:scale-90"
        >
          <X size={26} />
        </button>
        <button
          onClick={() => handleSwipe("right")}
          className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/30 hover:brightness-110 transition-all active:scale-90"
        >
          <Heart size={28} className="fill-current" />
        </button>
      </div>
    </div>
  );
};

export default Feed;
