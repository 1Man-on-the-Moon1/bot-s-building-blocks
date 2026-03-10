import { useState } from "react";
import { Button } from "@/components/ui/button";

const files = [
  { name: "bot_enhanced.py", path: "/src/data/bot_enhanced.py", desc: "Основной файл бота" },
  { name: "config.py", path: "/src/data/config.py", desc: "Конфигурация" },
  { name: "database.py", path: "/src/data/database.py", desc: "База данных" },
  { name: "i18n.py", path: "/src/data/i18n.py", desc: "Локализация" },
  { name: ".env", path: "/src/data/env.txt", desc: "Переименуйте в .env" },
  { name: "requirements.txt", path: "/src/data/requirements.txt", desc: "Зависимости" },
  { name: "Dockerfile", path: "/src/data/Dockerfile", desc: "Dockerfile" },
  { name: "Procfile", path: "/src/data/Procfile", desc: "Procfile" },
  { name: "runtime.txt", path: "/src/data/runtime.txt", desc: "Версия Python" },
  { name: ".gitignore", path: "/src/data/gitignore.txt", desc: "Переименуйте в .gitignore" },
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
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-foreground">💊 CITRAMON DATING — файлы</h1>
          <p className="text-sm text-muted-foreground">Скачайте и загрузите в GitHub</p>
        </div>

        <div className="space-y-2">
          {files.map((file) => (
            <div key={file.name} className="flex items-center justify-between border rounded-lg px-4 py-3 bg-card">
              <div>
                <p className="font-mono text-sm font-semibold text-foreground">{file.name}</p>
                <p className="text-xs text-muted-foreground">{file.desc}</p>
              </div>
              <Button
                onClick={() => handleDownload(file.name, file.path)}
                disabled={downloading === file.name}
                size="sm"
                variant="outline"
              >
                {downloading === file.name ? "⏳" : "⬇️"}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button onClick={handleDownloadAll} size="lg">⬇️ Скачать все</Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
