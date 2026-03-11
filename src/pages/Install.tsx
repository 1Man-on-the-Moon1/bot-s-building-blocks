import { motion } from "framer-motion";
import { Download, Share, PlusSquare } from "lucide-react";

const Install = () => (
  <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent/60 flex items-center justify-center mb-6"
    >
      <Download size={36} className="text-primary-foreground" />
    </motion.div>

    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-2xl font-bold font-display mb-3"
    >
      Установить Citramon
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="text-muted-foreground text-sm mb-8 max-w-xs"
    >
      Установите приложение на главный экран для быстрого доступа
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-2xl bg-card border border-border/30 p-5 text-left w-full max-w-sm"
    >
      <h3 className="text-sm font-semibold mb-4">Как установить:</h3>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-xs font-bold">1</span>
          </div>
          <div>
            <p className="text-sm font-medium">Android (Chrome)</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Нажмите ⋮ → «Установить приложение»
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-xs font-bold">2</span>
          </div>
          <div>
            <p className="text-sm font-medium flex items-center gap-1">
              iPhone (Safari)
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
              Нажмите <Share size={12} /> → «На экран «Домой»» <PlusSquare size={12} />
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);

export default Install;
