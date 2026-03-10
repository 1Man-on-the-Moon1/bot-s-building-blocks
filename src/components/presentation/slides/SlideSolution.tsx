import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";

const SlideSolution = () => (
  <SlideLayout>
    <div className="flex h-full">
      {/* Left */}
      <div className="w-[55%] px-[120px] py-[100px] flex flex-col justify-center">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <span className="text-[18px] font-semibold uppercase tracking-[6px] text-accent/80">Решение</span>
          <h2 className="text-[64px] font-bold mt-4 leading-tight">
            <span className="text-gradient-warm">CITRAMON DATING</span>
          </h2>
          <p className="text-[26px] text-muted-foreground mt-6 leading-relaxed max-w-[700px]">
            Telegram-бот, где ваша репутация — это ваш главный актив. 
            Рейтинг формируется из реальных отзывов после подтверждённых встреч.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 space-y-5"
        >
          {[
            "Рейтинг на основе реальных свиданий",
            "Оценки публикуются одновременно — честность гарантирована",
            "Репутация сохраняется при пересоздании анкеты",
            "Newbie-буст 48ч для новых пользователей",
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-4 text-[22px]"
            >
              <div className="w-3 h-3 rounded-full bg-primary shrink-0" />
              <span>{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Right — visual */}
      <div className="w-[45%] flex items-center justify-center relative">
        <div className="absolute w-[400px] h-[400px] rounded-full bg-primary/10 blur-[80px]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative card-glass rounded-3xl p-12 w-[480px] glow-primary"
        >
          <div className="text-center mb-8">
            <div className="text-[64px] mb-4">👤</div>
            <h3 className="text-[32px] font-bold">Алиса, 24</h3>
            <p className="text-[18px] text-muted-foreground">Минск · Кофе, Путешествия</p>
          </div>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-[28px]">⭐</span>
            <span className="text-[36px] font-bold text-gradient-warm">4.8</span>
            <span className="text-[18px] text-muted-foreground">(12 отзывов)</span>
          </div>
          <div className="space-y-2 text-[16px]">
            <div className="flex gap-2 flex-wrap justify-center">
              <span className="bg-primary/15 text-primary px-4 py-1.5 rounded-full">Интересный собеседник (8)</span>
              <span className="bg-primary/15 text-primary px-4 py-1.5 rounded-full">Пунктуальность (10)</span>
              <span className="bg-accent/15 text-accent px-4 py-1.5 rounded-full">Соответствует фото (11)</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </SlideLayout>
);

export default SlideSolution;
