import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";

const phases = [
  {
    q: "Q2 2026",
    title: "MVP и запуск",
    items: ["Запуск в Минске", "Первые 1000 пользователей", "Сбор отзывов и итерация"],
    status: "current",
  },
  {
    q: "Q3 2026",
    title: "Рост",
    items: ["Все 6 городов Беларуси", "Premium-подписка", "Push-уведомления", "Партнёрства с заведениями"],
    status: "next",
  },
  {
    q: "Q4 2026",
    title: "Масштабирование",
    items: ["Миграция на PostgreSQL", "Mini App в Telegram", "A/B тестирование алгоритмов"],
    status: "future",
  },
  {
    q: "2027",
    title: "Экспансия",
    items: ["Россия, Казахстан, СНГ", "AI-рекомендации", "Видео-профили", "Серия А"],
    status: "future",
  },
];

const SlideRoadmap = () => (
  <SlideLayout>
    <div className="flex flex-col h-full px-[120px] py-[100px]">
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
        <span className="text-[18px] font-semibold uppercase tracking-[6px] text-accent/80">Roadmap</span>
        <h2 className="text-[64px] font-bold mt-4">План <span className="text-gradient-warm">развития</span></h2>
      </motion.div>

      <div className="grid grid-cols-4 gap-8 mt-16 flex-1 relative">
        {/* Timeline line */}
        <div className="absolute top-[40px] left-[60px] right-[60px] h-[3px] bg-border z-0" />

        {phases.map((phase, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.15 }}
            className="relative z-10 flex flex-col"
          >
            {/* Dot */}
            <div className="flex justify-center mb-8">
              <div className={`w-[20px] h-[20px] rounded-full ${
                phase.status === 'current' ? 'bg-primary glow-primary' : 
                phase.status === 'next' ? 'bg-accent' : 'bg-muted-foreground/30'
              }`} />
            </div>

            <div className={`card-glass rounded-3xl p-8 flex-1 ${
              phase.status === 'current' ? 'border border-primary/30' : ''
            }`}>
              <span className={`text-[16px] font-mono ${
                phase.status === 'current' ? 'text-primary' : 'text-muted-foreground'
              }`}>{phase.q}</span>
              <h3 className="text-[26px] font-bold mt-3 mb-6">{phase.title}</h3>
              <ul className="space-y-3">
                {phase.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-[18px] text-muted-foreground">
                    <span className="text-primary shrink-0">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </SlideLayout>
);

export default SlideRoadmap;
