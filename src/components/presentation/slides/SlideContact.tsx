import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";

const SlideContact = () => (
  <SlideLayout>
    <div className="absolute top-[-300px] right-[-200px] w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
    <div className="absolute bottom-[-200px] left-[-100px] w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />

    <div className="flex flex-col items-center justify-center h-full relative z-10 text-center px-40">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <span className="text-[120px]">💊</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-[90px] font-bold text-gradient-primary mb-6"
      >
        Присоединяйтесь
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-[36px] text-muted-foreground max-w-[800px] leading-relaxed mb-16"
      >
        CITRAMON DATING — дейтинг, где репутация решает всё.
        <br />Мы ищем инвесторов для запуска и масштабирования.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex gap-8"
      >
        <div className="card-glass rounded-2xl px-12 py-8 text-center glow-primary">
          <p className="text-[22px] text-muted-foreground mb-2">Seed раунд</p>
          <p className="text-[48px] font-bold text-gradient-warm">$50K</p>
        </div>
        <div className="card-glass rounded-2xl px-12 py-8 text-center">
          <p className="text-[22px] text-muted-foreground mb-2">Цель пользователей</p>
          <p className="text-[48px] font-bold">10K</p>
          <p className="text-[18px] text-muted-foreground">за 6 месяцев</p>
        </div>
        <div className="card-glass rounded-2xl px-12 py-8 text-center">
          <p className="text-[22px] text-muted-foreground mb-2">Break-even</p>
          <p className="text-[48px] font-bold">12 мес</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16 text-[26px] text-muted-foreground"
      >
        📧 contact@citramon.dating &nbsp;&nbsp;·&nbsp;&nbsp; 📱 Telegram: @citramon_dating
      </motion.div>
    </div>
  </SlideLayout>
);

export default SlideContact;
