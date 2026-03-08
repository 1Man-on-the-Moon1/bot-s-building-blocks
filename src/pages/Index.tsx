import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const files = [
  { name: "bot_enhanced.py", path: "/src/data/bot_enhanced.py", desc: "Основной файл бота (все хэндлеры)" },
  { name: "config.py", path: "/src/data/config.py", desc: "Конфигурация бота" },
  { name: "database.py", path: "/src/data/database.py", desc: "Работа с базой данных" },
  { name: "i18n.py", path: "/src/data/i18n.py", desc: "Модуль локализации (RU/EN)" },
  { name: ".env", path: "/src/data/env.txt", desc: "Файл окружения (переименуйте в .env)" },
];

const changeLog = [
  { icon: "🔄", title: "Переименование", desc: "ЦИТРАМОН → CITRAMON DATING во всех сообщениях (RU/EN)" },
  { icon: "💬", title: "Чат: кнопка Назад", desc: "После отправки сообщения остаёмся в чате, кнопка ◀️ Назад всегда доступна" },
  { icon: "⭐", title: "Оценка только после свидания", desc: "Убрана кнопка «Оценить» из мэтчей. Рейтинг ставится только после завершённого свидания" },
  { icon: "📅", title: "Дубликат приглашений", desc: "Приглашение отправляется ОДИН раз, только после выбора Онлайн/Офлайн. Блокировка повторных" },
  { icon: "📝", title: "Отзывы", desc: "Под каждой анкетой кнопка «Отзывы» с агрегированной статистикой: средний рейтинг, теги, последние отзывы" },
  { icon: "📊", title: "Рейтинг v2", desc: "Байесовская средняя: новички стартуют с 5.0, рейтинг обновляется мгновенно после оценки" },
  { icon: "📱", title: "Онлайн-свидание", desc: "После подтверждения бот предлагает обменяться ссылкой: Zoom, Яндекс Телемост, Google Meet" },
];

const Index = () => {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = async (fileName: string, filePath: string) => {
    setDownloading(fileName);
    try {
      const response = await fetch(filePath);
      const text = await response.text();
      const blob = new Blob([text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloading(null);
    }
  };

  const handleDownloadAll = async () => {
    for (const file of files) {
      await handleDownload(file.name, file.path);
      await new Promise((r) => setTimeout(r, 300));
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            💊 CITRAMON DATING — обновлённые файлы v3
          </h1>
          <p className="text-muted-foreground">
            Скачайте все файлы бота и замените их в своём проекте
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">📋 Что изменено</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {changeLog.map((item) => (
              <div key={item.title} className="flex gap-3 items-start">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-3">
          {files.map((file) => (
            <Card key={file.name} className="flex items-center justify-between p-4">
              <div>
                <p className="font-mono font-semibold text-foreground">{file.name}</p>
                <p className="text-sm text-muted-foreground">{file.desc}</p>
              </div>
              <Button
                onClick={() => handleDownload(file.name, file.path)}
                disabled={downloading === file.name}
                size="sm"
              >
                {downloading === file.name ? "⏳" : "⬇️"} Скачать
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button onClick={handleDownloadAll} size="lg">
            ⬇️ Скачать все файлы
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">📝 Инструкция по обновлению</CardTitle>
            <CardDescription>Без потери зарегистрированных пользователей</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>1. Скачайте все файлы (кроме .env — он у вас уже есть)</p>
            <p>2. На сервере:</p>
            <pre className="bg-muted p-3 rounded text-xs">
{`cd citramon
# Остановите бота
sudo systemctl stop citramon

# Обновите файлы
git pull
# или загрузите файлы вручную

# Установите новую зависимость (если нужна)
source venv/bin/activate
pip install aiogram python-dotenv

# Запустите бота
sudo systemctl start citramon
sudo systemctl status citramon`}
            </pre>
            <p className="text-foreground font-medium mt-4">⚠️ ВАЖНО:</p>
            <p>• НЕ удаляйте <code className="bg-muted px-1 rounded">vibestar.db</code> — это база с пользователями</p>
            <p>• НЕ удаляйте <code className="bg-muted px-1 rounded">.env</code> — он уже настроен</p>
            <p>• Миграции БД запускаются автоматически при старте</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">📊 Как работает рейтинг</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Используется <strong>байесовская средняя</strong>:</p>
            <pre className="bg-muted p-3 rounded text-xs">
{`Рейтинг = (2 × 5.0 + сумма_звёзд) / (2 + кол-во_оценок)

Примеры:
• Новичок (0 оценок): 5.0
• 1 оценка 5⭐: (10 + 5) / 3 = 5.0
• 1 оценка 1⭐: (10 + 1) / 3 = 3.67
• 5 оценок по 4⭐: (10 + 20) / 7 = 4.29
• 10 оценок по 5⭐: (10 + 50) / 12 = 5.0`}
            </pre>
            <p>Рейтинг обновляется <strong>мгновенно</strong> после каждой оценки.</p>
            <p>Оценка возможна только после свидания (оба нажали «Я на месте»).</p>
            <p>Можно назначить несколько свиданий и оставить оценку после каждого.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
