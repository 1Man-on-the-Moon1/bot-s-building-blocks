import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";

const SlideTitle = () => (
  <SlideLayout>
    {/* Decorative circles */}
    <div className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
    <div className="absolute bottom-[-300px] left-[-200px] w-[800px] h-[800px] rounded-full bg-accent/5 blur-3xl" />
    
    <div className="flex flex-col items-center justify-center h-full px-40 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <span className="text-[80px]">💊</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-[96px] font-bold leading-none tracking-tight text-gradient-primary mb-8"
      >
        CITRAMON DATING
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-[32px] text-muted-foreground font-light max-w-[1000px] leading-relaxed"
      >
        Telegram-бот для знакомств с системой рейтингов и верификацией через реальные встречи
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 flex gap-6"
      >
        <div className="card-glass rounded-2xl px-8 py-4 text-[20px] text-muted-foreground">
          🇧🇾 Беларусь · 6 городов
        </div>
        <div className="card-glass rounded-2xl px-8 py-4 text-[20px] text-muted-foreground">
          🌐 RU / EN
        </div>
        <div className="card-glass rounded-2xl px-8 py-4 text-[20px] text-muted-foreground">
          ⭐ Система рейтингов
        </div>
      </motion.div>
    </div>
  </SlideLayout>
);

export default SlideTitle;
