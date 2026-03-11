import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Check, ChevronRight } from "lucide-react";
import { saveUserProfile } from "@/lib/userStore";

const CITIES = ["Минск", "Брест", "Витебск", "Гомель", "Гродно", "Могилёв"];
const INTERESTS = [
  "Спорт", "Кино", "Игры", "Музыка", "Путешествия",
  "Кофе", "Книги", "Прогулки", "IT", "Кулинария",
  "Животные", "Йога", "Искусство", "Авто/Мото", "Танцы",
  "Фотография", "Походы", "Театр",
];
const MAX_INTERESTS = 5;
const MAX_BIO = 200;

type Step = "name" | "gender" | "age" | "city" | "photo" | "bio" | "interests";
const STEPS: Step[] = ["name", "gender", "age", "city", "photo", "bio", "interests"];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("name");
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [photo, setPhoto] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const stepIndex = STEPS.indexOf(step);
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  const goNext = () => {
    const next = STEPS[stepIndex + 1];
    if (next) setStep(next);
  };

  const goBack = () => {
    if (stepIndex === 0) {
      navigate("/welcome");
    } else {
      setStep(STEPS[stepIndex - 1]);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result as string);
      // Auto-advance after photo
      setTimeout(goNext, 400);
    };
    reader.readAsDataURL(file);
  };

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : prev.length < MAX_INTERESTS
        ? [...prev, interest]
        : prev
    );
  };

  const finish = () => {
    saveUserProfile({
      name,
      gender: gender as "male" | "female",
      age: parseInt(age),
      city,
      photo,
      bio,
      interests,
      onboardingComplete: true,
      createdAt: new Date().toISOString(),
    });
    navigate("/", { replace: true });
  };

  const canProceed = () => {
    switch (step) {
      case "name": return name.trim().length >= 2 && name.length <= 20;
      case "gender": return gender !== "";
      case "age": { const a = parseInt(age); return a >= 18 && a <= 120; }
      case "city": return city !== "";
      case "photo": return photo !== "";
      case "bio": return true; // optional
      case "interests": return interests.length >= 1;
    }
  };

  const slideVariants = {
    enter: { x: 60, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -60, opacity: 0 },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="px-4 pt-safe-top">
        <div className="flex items-center gap-3 py-4">
          <button onClick={goBack} className="w-9 h-9 rounded-xl bg-card border border-border/30 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1">
            <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-primary"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          <span className="text-xs text-muted-foreground font-medium w-8 text-right">
            {stepIndex + 1}/{STEPS.length}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col"
          >
            {step === "name" && (
              <div className="flex-1 flex flex-col justify-center">
                <h2 className="text-2xl font-bold font-display mb-2">Как вас зовут?</h2>
                <p className="text-sm text-muted-foreground mb-6">Имя будет видно другим пользователям</p>
                <input
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value.slice(0, 20))}
                  placeholder="Ваше имя"
                  className="w-full py-4 px-5 rounded-2xl bg-card border border-border/50 text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground"
                />
                <p className="text-xs text-muted-foreground mt-2 text-right">{name.length}/20</p>
              </div>
            )}

            {step === "gender" && (
              <div className="flex-1 flex flex-col justify-center">
                <h2 className="text-2xl font-bold font-display mb-2">Ваш пол</h2>
                <p className="text-sm text-muted-foreground mb-6">Мы покажем вам анкеты противоположного пола</p>
                <div className="flex flex-col gap-3">
                  {[
                    { value: "male" as const, emoji: "👨", label: "Мужской" },
                    { value: "female" as const, emoji: "👩", label: "Женский" },
                  ].map((g) => (
                    <button
                      key={g.value}
                      onClick={() => { setGender(g.value); setTimeout(goNext, 300); }}
                      className={`flex items-center gap-4 p-5 rounded-2xl border transition-all ${
                        gender === g.value
                          ? "bg-primary/15 border-primary/50 ring-2 ring-primary/30"
                          : "bg-card border-border/30 hover:border-border/60"
                      }`}
                    >
                      <span className="text-3xl">{g.emoji}</span>
                      <span className="text-base font-medium">{g.label}</span>
                      {gender === g.value && <Check size={20} className="text-primary ml-auto" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === "age" && (
              <div className="flex-1 flex flex-col justify-center">
                <h2 className="text-2xl font-bold font-display mb-2">Сколько вам лет?</h2>
                <p className="text-sm text-muted-foreground mb-6">Минимальный возраст — 18 лет</p>
                <input
                  autoFocus
                  type="number"
                  inputMode="numeric"
                  value={age}
                  onChange={(e) => setAge(e.target.value.slice(0, 3))}
                  placeholder="Возраст"
                  className="w-full py-4 px-5 rounded-2xl bg-card border border-border/50 text-foreground text-lg text-center focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground"
                />
              </div>
            )}

            {step === "city" && (
              <div className="flex-1 flex flex-col justify-center">
                <h2 className="text-2xl font-bold font-display mb-2">Ваш город</h2>
                <p className="text-sm text-muted-foreground mb-6">Мы покажем людей рядом с вами</p>
                <div className="grid grid-cols-2 gap-3">
                  {CITIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => { setCity(c); setTimeout(goNext, 300); }}
                      className={`py-4 px-3 rounded-2xl border text-sm font-medium transition-all ${
                        city === c
                          ? "bg-primary/15 border-primary/50 text-foreground ring-2 ring-primary/30"
                          : "bg-card border-border/30 text-foreground/70 hover:border-border/60"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === "photo" && (
              <div className="flex-1 flex flex-col justify-center items-center">
                <h2 className="text-2xl font-bold font-display mb-2 text-center">Ваше фото</h2>
                <p className="text-sm text-muted-foreground mb-8 text-center">Загрузите фотографию, где вас хорошо видно</p>
                <input ref={fileRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                {photo ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative"
                  >
                    <img
                      src={photo}
                      alt="Фото"
                      className="w-48 h-48 rounded-3xl object-cover border-2 border-primary/30"
                    />
                    <button
                      onClick={() => fileRef.current?.click()}
                      className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg"
                    >
                      <Camera size={18} />
                    </button>
                  </motion.div>
                ) : (
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="w-48 h-48 rounded-3xl border-2 border-dashed border-border/50 bg-card/50 flex flex-col items-center justify-center gap-3 hover:border-primary/30 transition-colors"
                  >
                    <Camera size={32} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Загрузить</span>
                  </button>
                )}
              </div>
            )}

            {step === "bio" && (
              <div className="flex-1 flex flex-col justify-center">
                <h2 className="text-2xl font-bold font-display mb-2">О себе</h2>
                <p className="text-sm text-muted-foreground mb-6">Расскажите немного о себе (необязательно)</p>
                <textarea
                  autoFocus
                  value={bio}
                  onChange={(e) => setBio(e.target.value.slice(0, MAX_BIO))}
                  placeholder="Люблю путешествия, хорошую музыку и кофе ☕"
                  rows={4}
                  className="w-full py-4 px-5 rounded-2xl bg-card border border-border/50 text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground"
                />
                <p className="text-xs text-muted-foreground mt-2 text-right">{bio.length}/{MAX_BIO}</p>
              </div>
            )}

            {step === "interests" && (
              <div className="flex-1 flex flex-col pt-4">
                <h2 className="text-2xl font-bold font-display mb-2">Интересы</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Выберите до {MAX_INTERESTS} интересов ({interests.length}/{MAX_INTERESTS})
                </p>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((interest) => {
                    const selected = interests.includes(interest);
                    return (
                      <button
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                          selected
                            ? "bg-primary/20 text-primary border border-primary/40"
                            : "bg-card border border-border/30 text-foreground/60 hover:border-border/60"
                        }`}
                      >
                        {interest}
                        {selected && " ✓"}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom action — skip auto-advancing steps */}
        {!["gender", "city"].includes(step) && (
          <div className="py-6">
            {step === "interests" ? (
              <button
                disabled={!canProceed()}
                onClick={finish}
                className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:brightness-110 active:scale-[0.97] transition-all disabled:opacity-40 disabled:pointer-events-none"
              >
                Создать анкету
                <Check size={20} />
              </button>
            ) : step === "photo" && photo ? (
              <button
                onClick={goNext}
                className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:brightness-110 active:scale-[0.97] transition-all"
              >
                Далее
                <ChevronRight size={20} />
              </button>
            ) : step !== "photo" ? (
              <button
                disabled={!canProceed()}
                onClick={goNext}
                className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:brightness-110 active:scale-[0.97] transition-all disabled:opacity-40 disabled:pointer-events-none"
              >
                {step === "bio" ? "Пропустить или продолжить" : "Далее"}
                <ChevronRight size={20} />
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
