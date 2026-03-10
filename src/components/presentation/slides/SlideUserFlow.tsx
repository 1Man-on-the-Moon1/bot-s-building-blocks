import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";

const steps = [
  { num: "01", icon: "📝", title: "Регистрация", desc: "Язык → Имя → Пол → Возраст → Город → Фото → Био → Интересы", color: "primary" },
  { num: "02", icon: "❤️", title: "Лента и лайки", desc: "Просмотр анкет с рейтингом, лайк или пропуск, мгновенный мэтч", color: "primary" },
  { num: "03", icon: "💬", title: "Чат", desc: "Переписка после мэтча, обсуждение деталей встречи", color: "accent" },
  { num: "04", icon: "📅", title: "Свидание", desc: "Онлайн (Zoom/Meet) или офлайн, кнопка «Я на месте»", color: "accent" },
  { num: "05", icon: "⭐", title: "Оценка", desc: "1–5 звёзд + теги после подтверждённой встречи обоих", color: "primary" },
];

const SlideUserFlow = () => (
  <SlideLayout>
    <div className="flex flex-col h-full px-[120px] py-[100px]">
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
        <span className="text-[22px] font-semibold uppercase tracking-[6px] text-accent/80">User Flow</span>
        <h2 className="text-[80px] font-bold mt-4">Путь пользователя</h2>
      </motion.div>

      <div className="flex items-center justify-between mt-20 flex-1 relative">
        {/* Connecting line */}
        <div className="absolute top-[70px] left-[100px] right-[100px] h-[2px] bg-border" />

        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.15 }}
            className="flex flex-col items-center text-center relative z-10 w-[280px]"
          >
            <div className={`w-[140px] h-[140px] rounded-3xl card-glass flex items-center justify-center text-[72px] mb-8 ${step.color === 'primary' ? 'glow-primary' : 'glow-accent'}`}>
              {step.icon}
            </div>
            <span className="text-[20px] font-mono text-muted-foreground mb-2">{step.num}</span>
            <h3 className="text-[34px] font-semibold mb-3">{step.title}</h3>
            <p className="text-[22px] text-muted-foreground leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </SlideLayout>
);

export default SlideUserFlow;
