import { motion } from "framer-motion";
import { Globe, Bell, Shield, HelpCircle, LogOut, ChevronRight, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const sections = [
  {
    title: "Приложение",
    items: [
      { icon: Globe, label: "Язык", value: "Русский" },
      { icon: Bell, label: "Уведомления", value: "Вкл" },
      { icon: Smartphone, label: "Установить приложение", value: "", action: "install" },
    ],
  },
  {
    title: "Аккаунт",
    items: [
      { icon: Shield, label: "Конфиденциальность", value: "" },
      { icon: HelpCircle, label: "Помощь", value: "" },
      { icon: LogOut, label: "Выйти", value: "", destructive: true },
    ],
  },
];

const AppSettings = () => {
  const navigate = useNavigate();

  const handleInstall = () => {
    // deferredPrompt would be stored globally in a real PWA
    const dp = (window as any).__pwaInstallPrompt;
    if (dp) {
      dp.prompt();
    } else {
      navigate("/install");
    }
  };

  return (
    <div className="px-4 pt-safe-top">
      <div className="py-4">
        <h1 className="text-2xl font-bold font-display">Настройки</h1>
      </div>

      {sections.map((section, si) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: si * 0.1 }}
          className="mb-6"
        >
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-1">
            {section.title}
          </h2>
          <div className="rounded-2xl bg-card border border-border/30 overflow-hidden divide-y divide-border/30">
            {section.items.map((item) => (
              <button
                key={item.label}
                onClick={item.action === "install" ? handleInstall : undefined}
                className="flex items-center gap-3 px-4 py-3.5 w-full text-left hover:bg-secondary/30 transition-colors"
              >
                <item.icon
                  size={18}
                  className={item.destructive ? "text-destructive" : "text-muted-foreground"}
                />
                <span className={`flex-1 text-sm ${item.destructive ? "text-destructive" : ""}`}>
                  {item.label}
                </span>
                {item.value && (
                  <span className="text-sm text-muted-foreground">{item.value}</span>
                )}
                <ChevronRight size={16} className="text-muted-foreground/50" />
              </button>
            ))}
          </div>
        </motion.div>
      ))}

      <div className="text-center text-xs text-muted-foreground/50 mt-8 pb-4">
        Citramon Dating v1.0.0
      </div>
    </div>
  );
};

export default AppSettings;
