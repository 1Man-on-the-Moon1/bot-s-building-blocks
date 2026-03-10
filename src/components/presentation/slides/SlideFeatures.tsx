import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";

const features = [
  { icon: "❤️", title: "Лента анкет", desc: "Лайк / Пропуск / Жалоба с мгновенным мэтчем при взаимной симпатии" },
  { icon: "💬", title: "Встроенный чат", desc: "Полноценная переписка внутри бота после мэтча" },
  { icon: "📅", title: "Свидания онлайн и офлайн", desc: "Выбор формата встречи, подтверждение прибытия обоих участников" },
  { icon: "⭐", title: "Рейтинг и отзывы", desc: "Оценки 1–5 с тегами: пунктуальность, соответствие фото, вежливость" },
  { icon: "🛡️", title: "Модерация и жалобы", desc: "Система жалоб, бан, теневой бан, админ-панель с мгновенными уведомлениями" },
  { icon: "🌐", title: "Мультиязычность", desc: "Полная поддержка русского и английского языков" },
];

const SlideFeatures = () => (
  <SlideLayout>
    <div className="flex flex-col h-full px-[120px] py-[100px]">
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <span className="text-[18px] font-semibold uppercase tracking-[6px] text-primary/80">Возможности</span>
        <h2 className="text-[64px] font-bold mt-4 text-gradient-primary">Полный цикл знакомства</h2>
      </motion.div>

      <div className="grid grid-cols-3 gap-8 mt-16 flex-1">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="card-glass rounded-3xl p-8 flex flex-col"
          >
            <span className="text-[48px] mb-4">{f.icon}</span>
            <h3 className="text-[26px] font-semibold mb-3">{f.title}</h3>
            <p className="text-[18px] text-muted-foreground leading-relaxed flex-1">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </SlideLayout>
);

export default SlideFeatures;
