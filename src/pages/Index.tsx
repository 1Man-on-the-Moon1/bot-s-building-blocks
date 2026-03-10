import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const onboardingSteps = [
  {
    emoji: "👋",
    title: "Добро пожаловать в CITRAMON DATING!",
    description: "Мы покажем, как пользоваться ботом. Это займёт 30 секунд.",
    mockup: (
      <div className="bg-[#1a1a2e] rounded-xl p-4 space-y-3 text-sm">
        <div className="bg-[#2d2d44] rounded-lg p-3 text-[#e0e0e0] max-w-[80%]">
          👋 Привет! Добро пожаловать в CITRAMON DATING — приложение для знакомств!
        </div>
        <div className="flex gap-2 justify-center mt-3">
          <div className="bg-[#3b82f6] text-white px-4 py-2 rounded-lg text-xs font-medium">🇷🇺 Русский</div>
          <div className="bg-[#3b82f6] text-white px-4 py-2 rounded-lg text-xs font-medium">🇬🇧 English</div>
        </div>
      </div>
    ),
  },
  {
    emoji: "📝",
    title: "Регистрация",
    description: "Заполните анкету: имя, пол, возраст, город, фото и описание. Это ваш профиль!",
    mockup: (
      <div className="bg-[#1a1a2e] rounded-xl p-4 space-y-2 text-sm">
        <div className="bg-[#2d2d44] rounded-lg p-3 text-[#e0e0e0] max-w-[80%]">📝 Как тебя зовут?</div>
        <div className="bg-[#3b82f6] rounded-lg p-3 text-white max-w-[60%] ml-auto">Алина</div>
        <div className="bg-[#2d2d44] rounded-lg p-3 text-[#e0e0e0] max-w-[80%]">👤 Укажи свой пол:</div>
        <div className="flex gap-2 justify-center">
          <div className="bg-[#3b82f6] text-white px-4 py-2 rounded-lg text-xs">👩 Девушка</div>
          <div className="bg-[#3b82f6] text-white px-4 py-2 rounded-lg text-xs">👨 Парень</div>
        </div>
      </div>
    ),
  },
  {
    emoji: "👁️",
    title: "Лента анкет",
    description: "Листайте анкеты: ❤️ — лайк, ⏩ — пропустить. Если симпатия взаимная — это мэтч!",
    mockup: (
      <div className="bg-[#1a1a2e] rounded-xl p-4 space-y-2 text-sm">
        <div className="bg-[#2d2d44] rounded-lg p-3 text-[#e0e0e0]">
          <div className="w-full h-24 bg-gradient-to-br from-[#4a3f6b] to-[#2d2d44] rounded-lg mb-2 flex items-center justify-center text-3xl">📸</div>
          <p className="font-semibold">Максим, 24</p>
          <p className="text-[#a0a0b8] text-xs">Минск • Люблю музыку и путешествия</p>
        </div>
        <div className="flex gap-2 justify-center">
          <div className="bg-[#ef4444] text-white px-4 py-2 rounded-lg text-xs">❤️ Лайк</div>
          <div className="bg-[#6b7280] text-white px-4 py-2 rounded-lg text-xs">⏩ Далее</div>
          <div className="bg-[#f59e0b] text-white px-4 py-2 rounded-lg text-xs">⚠️ Жалоба</div>
        </div>
      </div>
    ),
  },
  {
    emoji: "💬",
    title: "Мэтчи и чат",
    description: "Когда лайк взаимный — вы получите уведомление. Переходите в чат и общайтесь!",
    mockup: (
      <div className="bg-[#1a1a2e] rounded-xl p-4 space-y-2 text-sm">
        <div className="bg-[#22c55e]/20 border border-[#22c55e]/40 rounded-lg p-3 text-[#22c55e] text-center">
          🎉 У вас новый мэтч с Алина!
        </div>
        <div className="bg-[#2d2d44] rounded-lg p-3 text-[#e0e0e0] max-w-[75%]">Привет! Рада знакомству 😊</div>
        <div className="bg-[#3b82f6] rounded-lg p-3 text-white max-w-[60%] ml-auto">Привет! Как дела?</div>
        <div className="flex gap-2 justify-center mt-1">
          <div className="bg-[#8b5cf6] text-white px-3 py-2 rounded-lg text-xs">📅 Свидание</div>
          <div className="bg-[#6b7280] text-white px-3 py-2 rounded-lg text-xs">◀️ Назад</div>
        </div>
      </div>
    ),
  },
  {
    emoji: "📅",
    title: "Свидания и рейтинг",
    description: "Предложите свидание прямо в чате. После встречи — оцените друг друга звёздами ⭐",
    mockup: (
      <div className="bg-[#1a1a2e] rounded-xl p-4 space-y-2 text-sm">
        <div className="bg-[#2d2d44] rounded-lg p-3 text-[#e0e0e0] text-center">
          📅 Алина предлагает свидание!<br />
          <span className="text-[#a0a0b8] text-xs">Кафе «Вечер», завтра в 19:00</span>
        </div>
        <div className="flex gap-2 justify-center">
          <div className="bg-[#22c55e] text-white px-4 py-2 rounded-lg text-xs">✅ Принять</div>
          <div className="bg-[#ef4444] text-white px-4 py-2 rounded-lg text-xs">❌ Отклонить</div>
        </div>
        <div className="bg-[#2d2d44] rounded-lg p-3 text-[#e0e0e0] text-center mt-2">
          ⭐ Как прошло свидание?<br />
          <span className="text-2xl">⭐⭐⭐⭐⭐</span>
        </div>
      </div>
    ),
  },
];

const Index = () => {
  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);
  const current = onboardingSteps[step];
  const isLast = step === onboardingSteps.length - 1;

  if (finished) {
    return (
      <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-[#1a1a2e] border-[#2d2d44] p-8 text-center space-y-4">
          <div className="text-6xl">🎉</div>
          <h2 className="text-2xl font-bold text-white">Готово!</h2>
          <p className="text-[#a0a0b8]">Теперь вы знаете, как пользоваться CITRAMON DATING. Удачных знакомств!</p>
          <Button
            onClick={() => { setStep(0); setFinished(false); }}
            className="bg-[#3b82f6] hover:bg-[#2563eb] text-white w-full"
          >
            🔄 Посмотреть ещё раз
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-4">
        {/* Progress */}
        <div className="flex gap-1.5">
          {onboardingSteps.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                i <= step ? "bg-[#3b82f6]" : "bg-[#2d2d44]"
              }`}
            />
          ))}
        </div>

        {/* Card */}
        <Card className="bg-[#1a1a2e] border-[#2d2d44] overflow-hidden">
          <div className="p-6 space-y-4">
            <div className="text-center space-y-2">
              <div className="text-4xl">{current.emoji}</div>
              <h2 className="text-xl font-bold text-white">{current.title}</h2>
              <p className="text-[#a0a0b8] text-sm leading-relaxed">{current.description}</p>
            </div>

            {/* Mockup */}
            <div className="border border-[#2d2d44] rounded-xl overflow-hidden">
              {current.mockup}
            </div>
          </div>

          {/* Navigation */}
          <div className="p-4 border-t border-[#2d2d44] flex gap-3">
            {step > 0 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="flex-1 border-[#2d2d44] text-[#a0a0b8] hover:bg-[#2d2d44] hover:text-white bg-transparent"
              >
                ◀️ Назад
              </Button>
            )}
            <Button
              onClick={() => isLast ? setFinished(true) : setStep(step + 1)}
              className="flex-1 bg-[#3b82f6] hover:bg-[#2563eb] text-white"
            >
              {isLast ? "✅ Понятно, начать!" : "Далее ▶️"}
            </Button>
          </div>
        </Card>

        <p className="text-center text-[#4a4a5e] text-xs">
          Шаг {step + 1} из {onboardingSteps.length}
        </p>
      </div>
    </div>
  );
};

export default Index;
