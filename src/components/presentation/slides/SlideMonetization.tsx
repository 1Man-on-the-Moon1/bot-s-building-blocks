import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";

const tiers = [
  {
    name: "Free",
    price: "$0",
    icon: "🆓",
    features: ["5 лайков в день", "Базовый профиль", "1 фото", "Просмотр рейтинга"],
    highlight: false,
  },
  {
    name: "Premium",
    price: "$4.99/мес",
    icon: "💎",
    features: ["Безлимитные лайки", "До 5 фото", "Кто лайкнул вас", "Приоритет в ленте", "Расширенные фильтры"],
    highlight: true,
  },
  {
    name: "VIP",
    price: "$9.99/мес",
    icon: "👑",
    features: ["Всё из Premium", "Суперлайк × 5/день", "Читать отзывы до мэтча", "VIP-бейдж", "Поддержка 24/7"],
    highlight: false,
  },
];

const SlideMonetization = () => (
  <SlideLayout>
    <div className="flex flex-col h-full px-[120px] py-[100px]">
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
        <span className="text-[22px] font-semibold uppercase tracking-[6px] text-accent/80">Монетизация</span>
        <h2 className="text-[80px] font-bold mt-4">Модель <span className="text-gradient-warm">Freemium</span></h2>
      </motion.div>

      <div className="grid grid-cols-3 gap-10 mt-16 flex-1 items-start">
        {tiers.map((tier, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.15 }}
            className={`rounded-3xl p-10 flex flex-col h-full ${
              tier.highlight
                ? "bg-primary/10 border-2 border-primary/30 glow-primary"
                : "card-glass"
            }`}
          >
            <div className="text-center mb-8">
              <span className="text-[70px]">{tier.icon}</span>
              <h3 className="text-[40px] font-bold mt-4">{tier.name}</h3>
              <p className="text-[44px] font-bold text-gradient-warm mt-2">{tier.price}</p>
            </div>
            <ul className="space-y-4 flex-1">
              {tier.features.map((f, j) => (
                <li key={j} className="flex items-center gap-3 text-[24px]">
                  <span className="text-primary text-[20px]">✓</span>
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-8 text-center"
      >
        <p className="text-[24px] text-muted-foreground">
          Дополнительно: <span className="text-foreground font-semibold">Boost-пакеты</span> (попадание в топ ленты) · <span className="text-foreground font-semibold">Подарки</span> (виртуальные) · <span className="text-foreground font-semibold">Рекламные партнёрства</span> с кафе и заведениями
        </p>
      </motion.div>
    </div>
  </SlideLayout>
);

export default SlideMonetization;
