import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";

const stats = [
  { value: "9.4M", label: "Население Беларуси", sub: "Начальный рынок" },
  { value: "2.5M", label: "18–35 лет", sub: "Целевая аудитория" },
  { value: "6", label: "Крупных городов", sub: "День 1 покрытие" },
  { value: "78%", label: "Telegram-пенетрация", sub: "В Беларуси" },
];

const SlideMarket = () => (
  <SlideLayout>
    <div className="flex flex-col h-full px-[120px] py-[100px]">
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
        <span className="text-[22px] font-semibold uppercase tracking-[6px] text-primary/80">Рынок</span>
        <h2 className="text-[80px] font-bold mt-4 text-gradient-primary">Целевой рынок</h2>
      </motion.div>

      <div className="grid grid-cols-4 gap-8 mt-16">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="card-glass rounded-3xl p-10 text-center"
          >
            <span className="text-[70px] font-bold text-gradient-warm">{s.value}</span>
            <p className="text-[28px] font-semibold mt-4">{s.label}</p>
            <p className="text-[20px] text-muted-foreground mt-2">{s.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-8 mt-12 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="card-glass rounded-3xl p-10"
        >
          <h3 className="text-[36px] font-semibold mb-6">🎯 Почему Telegram-бот?</h3>
          <ul className="space-y-4 text-[24px] text-muted-foreground">
            <li className="flex gap-3"><span className="text-primary">•</span> Нулевая стоимость установки для пользователя</li>
            <li className="flex gap-3"><span className="text-primary">•</span> Мгновенный пуш через Telegram</li>
            <li className="flex gap-3"><span className="text-primary">•</span> Вирусный рост через пересылку бота</li>
            <li className="flex gap-3"><span className="text-primary">•</span> Минимальная стоимость разработки vs. мобильного приложения</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="card-glass rounded-3xl p-10"
        >
          <h3 className="text-[36px] font-semibold mb-6">🏆 Конкуренты</h3>
          <ul className="space-y-4 text-[24px] text-muted-foreground">
            <li className="flex gap-3"><span className="text-accent">•</span> <strong className="text-foreground">Tinder / Bumble</strong> — нет рейтингов, нет ответственности</li>
            <li className="flex gap-3"><span className="text-accent">•</span> <strong className="text-foreground">Mamba / Badoo</strong> — перегружены, не локальные</li>
            <li className="flex gap-3"><span className="text-accent">•</span> <strong className="text-foreground">TG-боты</strong> — примитивные, без экосистемы доверия</li>
          </ul>
          <p className="text-[22px] text-primary mt-6 font-semibold">
            Мы — единственные с рейтинг-системой на основе реальных встреч
          </p>
        </motion.div>
      </div>
    </div>
  </SlideLayout>
);

export default SlideMarket;
