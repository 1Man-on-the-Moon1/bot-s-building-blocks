import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const files = [
  { name: "bot_enhanced.py", path: "/src/data/bot_enhanced.py", desc: "Основной файл бота (все хэндлеры)" },
  { name: "config.py", path: "/src/data/config.py", desc: "Конфигурация бота" },
  { name: "database.py", path: "/src/data/database.py", desc: "Работа с базой данных" },
];

const changeLog = [
  { icon: "📞", title: "Поддержка", desc: "Теперь открывает прямой диалог с админом через ссылку" },
  { icon: "◀️", title: "Кнопка Назад", desc: "Добавлена на каждый этап регистрации, в чат, ленту, админку" },
  { icon: "📅", title: "Свидания", desc: "Упрощено: назначить → подтвердить → оба отмечаются на месте" },
  { icon: "🗑", title: "Удаление анкеты", desc: "Новая кнопка в меню с подтверждением и каскадным удалением" },
  { icon: "📷", title: "Одно фото", desc: "MAX_PHOTOS = 1, автопереход к био после загрузки" },
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
            💊 ЦИТРАМОН — обновлённые файлы
          </h1>
          <p className="text-muted-foreground">
            Скачайте изменённые файлы бота и замените их в своём проекте
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
      </div>
    </div>
  );
};

export default Index;
