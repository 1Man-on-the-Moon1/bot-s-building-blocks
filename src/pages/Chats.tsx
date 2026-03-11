import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const mockChats = [
  { id: 1, name: "Алина", lastMsg: "Привет! Когда встретимся?", time: "12:34", unread: 2, rating: 4.7 },
  { id: 2, name: "Мария", lastMsg: "Отличное свидание, спасибо! 😊", time: "вчера", unread: 0, rating: 4.9 },
  { id: 3, name: "Дарья", lastMsg: "Давай в кафе на Немиге?", time: "вчера", unread: 0, rating: 4.3 },
];

const Chats = () => (
  <div className="px-4 pt-safe-top">
    <div className="py-4">
      <h1 className="text-2xl font-bold font-display">Чаты</h1>
    </div>

    {mockChats.length === 0 ? (
      <div className="flex flex-col items-center justify-center h-[60vh] text-muted-foreground">
        <MessageCircle size={48} className="mb-4 opacity-30" />
        <p>Пока нет чатов</p>
        <p className="text-sm">Лайкайте анкеты для мэтча!</p>
      </div>
    ) : (
      <div className="flex flex-col gap-2">
        {mockChats.map((chat, i) => (
          <motion.button
            key={chat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border/30 hover:bg-secondary/50 transition-colors text-left w-full"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center text-xl shrink-0">
              😊
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">{chat.name}</span>
                <span className="text-xs text-muted-foreground">{chat.time}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{chat.lastMsg}</p>
            </div>
            {chat.unread > 0 && (
              <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold shrink-0">
                {chat.unread}
              </span>
            )}
          </motion.button>
        ))}
      </div>
    )}
  </div>
);

export default Chats;
