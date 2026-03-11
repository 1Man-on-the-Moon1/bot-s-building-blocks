import { Heart, MessageCircle, User, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const tabs = [
  { path: "/", icon: Heart, label: "Лента" },
  { path: "/chats", icon: MessageCircle, label: "Чаты" },
  { path: "/profile", icon: User, label: "Профиль" },
  { path: "/settings", icon: Settings, label: "Ещё" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-bottom">
      <div className="mx-3 mb-3 rounded-2xl bg-card/90 backdrop-blur-xl border border-border/50 flex items-center justify-around py-2 px-1">
        {tabs.map((tab) => {
          const active = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center gap-0.5 py-1.5 px-4 rounded-xl transition-colors relative"
            >
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-primary/15 rounded-xl"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <tab.icon
                size={22}
                className={active ? "text-primary" : "text-muted-foreground"}
              />
              <span
                className={`text-[11px] font-medium ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
