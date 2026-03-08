import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const files = [
  { name: "bot_enhanced.py", path: "/src/data/bot_enhanced.py", desc: "Основной файл бота (все хэндлеры)" },
  { name: "config.py", path: "/src/data/config.py", desc: "Конфигурация бота" },
  { name: "database.py", path: "/src/data/database.py", desc: "Работа с базой данных" },
  { name: "i18n.py", path: "/src/data/i18n.py", desc: "Модуль локализации (RU/EN)" },
  { name: ".env", path: "/src/data/.env", desc: "Шаблон файла окружения (.env)" },
];

const changeLog = [
  { icon: "✏️", title: "Редактирование профиля", desc: "Полноценное меню: имя, возраст, город, био, фото, интересы" },
  { icon: "🌐", title: "Выбор языка", desc: "RU / EN при регистрации и в меню. Все сообщения бота переведены" },
  { icon: "📅", title: "Свидания v2", desc: "Предложить → Онлайн/Офлайн → уведомление партнёру" },
  { icon: "🎉", title: "Свидание состоялось", desc: "Автоматически при нажатии 'Я на месте' обоими. Открывается отзыв" },
  { icon: "⭐", title: "Отзыв после свидания", desc: "Исправлена логика: отзыв привязан к date_id, работает корректно" },
  { icon: "🗑", title: "Удалена 'Агрессия'", desc: "Убрана из типов жалоб" },
  { icon: "🔐", title: ".env файл", desc: "Токен и ADMIN_ID только через переменные окружения" },
  { icon: "💬", title: "Чат улучшен", desc: "Убрана кнопка 'Свидание состоялось' из чата" },
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
            💊 ЦИТРАМОН — обновлённые файлы v2
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
            <CardTitle className="text-lg">📝 Инструкция</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>1. Скачайте все файлы</p>
            <p>2. Создайте файл <code className="bg-muted px-1 rounded">.env</code> в корне проекта:</p>
            <pre className="bg-muted p-3 rounded text-xs">
{`BOT_TOKEN=ваш_токен_от_BotFather
ADMIN_ID=ваш_telegram_id`}
            </pre>
            <p>3. <code>pip install aiogram python-dotenv</code></p>
            <p>4. <code>python bot_enhanced.py</code></p>
            <p>5. При первом запуске удалите старый <code>vibestar.db</code></p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
