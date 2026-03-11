import { motion } from "framer-motion";
import { Heart, ArrowRight, Sparkles, Shield, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  { icon: Star, text: "Рейтинг после реальных свиданий" },
  { icon: Shield, text: "Проверенные анкеты" },
  { icon: Sparkles, text: "Честные отзывы" },
];

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/3 w-60 h-60 bg-accent/8 rounded-full blur-[80px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-8 shadow-lg shadow-primary/20 relative z-10"
      >
        <Heart size={44} className="text-primary-foreground fill-current" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-3xl font-bold font-display mb-2 relative z-10"
      >
        Citramon Dating
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-muted-foreground text-sm mb-10 max-w-xs relative z-10"
      >
        Знакомства с рейтингом. Встречайтесь, оценивайте, находите лучших.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col gap-3 w-full max-w-xs mb-10 relative z-10"
      >
        {features.map((f, i) => (
          <motion.div
            key={f.text}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 + i * 0.08 }}
            className="flex items-center gap-3 rounded-2xl bg-card/60 border border-border/30 px-4 py-3"
          >
            <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
              <f.icon size={18} className="text-primary" />
            </div>
            <span className="text-sm text-foreground/80">{f.text}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        onClick={() => navigate("/onboarding")}
        className="w-full max-w-xs py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:brightness-110 active:scale-[0.97] transition-all relative z-10"
      >
        Начать
        <ArrowRight size={20} />
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
        className="text-xs text-muted-foreground mt-4 relative z-10"
      >
        Создание анкеты займёт 2 минуты
      </motion.p>
    </div>
  );
};

export default Welcome;
