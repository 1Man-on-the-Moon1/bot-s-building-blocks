import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";

const SlideRating = () => (
  <SlideLayout>
    <div className="flex h-full">
      {/* Left */}
      <div className="w-[50%] px-[120px] py-[100px] flex flex-col justify-center">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <span className="text-[22px] font-semibold uppercase tracking-[6px] text-accent/80">Конкурентное преимущество</span>
          <h2 className="text-[72px] font-bold mt-4 leading-tight">
            Система рейтинга —<br />
            <span className="text-gradient-warm">ядро продукта</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 space-y-8"
        >
          <div className="card-glass rounded-2xl p-8">
            <h3 className="text-[30px] font-semibold mb-3">🔒 Одновременная публикация</h3>
            <p className="text-[22px] text-muted-foreground leading-relaxed">
              Отзывы обоих участников публикуются одновременно — никто не может написать «месть-отзыв» в ответ
            </p>
          </div>
          <div className="card-glass rounded-2xl p-8">
            <h3 className="text-[30px] font-semibold mb-3">📊 Байесовский рейтинг</h3>
            <p className="text-[22px] text-muted-foreground leading-relaxed">
              Новички получают рейтинг 5.0 с весом 2 — защита от случайного одного негативного отзыва
            </p>
          </div>
          <div className="card-glass rounded-2xl p-8">
            <h3 className="text-[30px] font-semibold mb-3">♻️ Персистентность</h3>
            <p className="text-[22px] text-muted-foreground leading-relaxed">
              Рейтинг сохраняется даже при удалении и пересоздании анкеты — нельзя «обнулить» репутацию
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right — tags */}
      <div className="w-[50%] flex flex-col items-center justify-center px-16 relative">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative space-y-8 w-full max-w-[550px]"
        >
          <h3 className="text-[36px] font-semibold text-center mb-6">Теги оценки</h3>
          
          <div>
            <p className="text-[20px] uppercase tracking-[4px] text-primary/60 mb-4">Позитивные</p>
            <div className="flex flex-wrap gap-3">
              {["Соответствует фото", "Интересный собеседник", "Пунктуальность", "Вежливость", "Опрятный вид", "Харизма"].map((t, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className="bg-primary/15 text-primary px-6 py-3 rounded-2xl text-[22px] font-medium"
                >
                  ✅ {t}
                </motion.span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[20px] uppercase tracking-[4px] text-destructive/60 mb-4">Негативные</p>
            <div className="flex flex-wrap gap-3">
              {["Не соответствует фото", "Скука", "Опоздание", "Токсичность", "Постоянно в телефоне"].map((t, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.08 }}
                  className="bg-destructive/15 text-destructive px-6 py-3 rounded-2xl text-[22px] font-medium"
                >
                  ❌ {t}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </SlideLayout>
);

export default SlideRating;
