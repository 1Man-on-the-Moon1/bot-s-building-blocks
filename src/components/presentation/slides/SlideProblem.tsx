import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";

const problems = [
  { icon: "🎭", title: "Фейки и несоответствия", desc: "70% пользователей дейтинг-приложений сталкивались с фейковыми фото или обманом в описании" },
  { icon: "👻", title: "Ghosting без последствий", desc: "Нет ответственности за поведение — люди просто исчезают после общения" },
  { icon: "📱", title: "Усталость от свайпов", desc: "Бесконечный скроллинг без реальных встреч, gamification без цели" },
  { icon: "🙈", title: "Нет обратной связи", desc: "Невозможно узнать, каков человек на свидании, до самой встречи" },
];

const SlideProblem = () => (
  <SlideLayout>
    <div className="flex flex-col h-full px-[120px] py-[100px]">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-[18px] font-semibold uppercase tracking-[6px] text-primary/80">Проблема</span>
        <h2 className="text-[64px] font-bold mt-4 leading-tight">
          Дейтинг сломан.
          <br />
          <span className="text-gradient-primary">Доверие — на нуле.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 gap-8 mt-16 flex-1">
        {problems.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
            className="card-glass rounded-3xl p-10 flex gap-8 items-start"
          >
            <span className="text-[48px] shrink-0">{p.icon}</span>
            <div>
              <h3 className="text-[28px] font-semibold mb-3">{p.title}</h3>
              <p className="text-[20px] text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </SlideLayout>
);

export default SlideProblem;
