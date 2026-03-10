import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";

const stack = [
  { icon: "🐍", name: "Python + AIOgram 3", desc: "Асинхронный Telegram Bot API" },
  { icon: "🗄️", name: "SQLite", desc: "Лёгкая БД, миграция на PostgreSQL" },
  { icon: "🐳", name: "Docker", desc: "Контейнеризация, деплой в 1 клик" },
  { icon: "🌐", name: "i18n модуль", desc: "RU/EN, расширяемая архитектура" },
  { icon: "⚡", name: "FSM", desc: "Конечный автомат для диалогов" },
  { icon: "📊", name: "Bayesian Rating", desc: "Устойчивый к манипуляциям рейтинг" },
];

const SlideTech = () => (
  <SlideLayout>
    <div className="flex flex-col h-full px-[120px] py-[100px]">
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
        <span className="text-[18px] font-semibold uppercase tracking-[6px] text-primary/80">Технологии</span>
        <h2 className="text-[64px] font-bold mt-4">Технологический <span className="text-gradient-primary">стек</span></h2>
      </motion.div>

      <div className="grid grid-cols-3 gap-8 mt-16">
        {stack.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="card-glass rounded-2xl p-8 flex items-center gap-6"
          >
            <span className="text-[48px]">{s.icon}</span>
            <div>
              <h3 className="text-[24px] font-semibold">{s.name}</h3>
              <p className="text-[18px] text-muted-foreground">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-auto"
      >
        <div className="card-glass rounded-3xl p-10">
          <h3 className="text-[28px] font-semibold mb-6">📐 Архитектура</h3>
          <div className="flex items-center justify-between text-[20px]">
            <div className="flex flex-col items-center gap-3">
              <div className="w-[200px] h-[80px] rounded-2xl bg-primary/15 flex items-center justify-center font-semibold">Telegram API</div>
            </div>
            <span className="text-[32px] text-muted-foreground">→</span>
            <div className="flex flex-col items-center gap-3">
              <div className="w-[200px] h-[80px] rounded-2xl bg-primary/15 flex items-center justify-center font-semibold">AIOgram Bot</div>
            </div>
            <span className="text-[32px] text-muted-foreground">→</span>
            <div className="flex flex-col items-center gap-3">
              <div className="w-[200px] h-[80px] rounded-2xl bg-accent/15 flex items-center justify-center font-semibold">FSM Engine</div>
            </div>
            <span className="text-[32px] text-muted-foreground">→</span>
            <div className="flex flex-col items-center gap-3">
              <div className="w-[200px] h-[80px] rounded-2xl bg-accent/15 flex items-center justify-center font-semibold">SQLite DB</div>
            </div>
            <span className="text-[32px] text-muted-foreground">→</span>
            <div className="flex flex-col items-center gap-3">
              <div className="w-[200px] h-[80px] rounded-2xl bg-primary/15 flex items-center justify-center font-semibold">Rating Engine</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </SlideLayout>
);

export default SlideTech;
