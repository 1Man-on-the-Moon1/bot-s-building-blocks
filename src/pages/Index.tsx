import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const files = [
  { name: "bot_enhanced.py", path: "/src/data/bot_enhanced.py", desc: "Основной файл бота (все хэндлеры)" },
  { name: "config.py", path: "/src/data/config.py", desc: "Конфигурация бота" },
  { name: "database.py", path: "/src/data/database.py", desc: "Работа с базой данных" },
  { name: "i18n.py", path: "/src/data/i18n.py", desc: "Модуль локализации (RU/EN)" },
  { name: ".env", path: "/src/data/env.txt", desc: "Файл окружения (переименуйте в .env)" },
  { name: "requirements.txt", path: "/src/data/requirements.txt", desc: "Зависимости Python" },
  { name: "Dockerfile", path: "/src/data/Dockerfile", desc: "Dockerfile для деплоя" },
  { name: "Procfile", path: "/src/data/Procfile", desc: "Procfile для Heroku/Railway" },
  { name: "runtime.txt", path: "/src/data/runtime.txt", desc: "Версия Python" },
  { name: ".gitignore", path: "/src/data/gitignore.txt", desc: "Gitignore (переименуйте в .gitignore)" },
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
            💊 CITRAMON DATING — файлы бота
          </h1>
          <p className="text-muted-foreground">
            Скачайте все файлы и загрузите в репозиторий GitHub
          </p>
        </div>

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
            <CardDescription>База пользователей сохранится</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>1. Скачайте все файлы</p>
            <p>2. Загрузите в репозиторий GitHub (замените существующие файлы)</p>
            <p>3. <code className="bg-muted px-1 rounded">.env</code> — добавьте в корень проекта, если ещё нет</p>
            <p>4. <code className="bg-muted px-1 rounded">.gitignore</code> — переименуйте из gitignore.txt</p>
            <p className="text-foreground font-medium mt-4">⚠️ ВАЖНО:</p>
            <p>• НЕ удаляйте <code className="bg-muted px-1 rounded">vibestar.db</code> — это база с пользователями</p>
            <p>• НЕ удаляйте <code className="bg-muted px-1 rounded">.env</code> — он уже настроен</p>
            <p>• Миграции БД запускаются автоматически при старте</p>
            <p>• Структура таблиц обновится без потери данных</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
