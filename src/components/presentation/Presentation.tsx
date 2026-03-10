import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

import SlideTitle from "./slides/SlideTitle";
import SlideProblem from "./slides/SlideProblem";
import SlideSolution from "./slides/SlideSolution";
import SlideFeatures from "./slides/SlideFeatures";
import SlideUserFlow from "./slides/SlideUserFlow";
import SlideRating from "./slides/SlideRating";
import SlideMarket from "./slides/SlideMarket";
import SlideMonetization from "./slides/SlideMonetization";
import SlideTech from "./slides/SlideTech";
import SlideRoadmap from "./slides/SlideRoadmap";
import SlideContact from "./slides/SlideContact";
import PdfExportButton from "./PdfExport";

const slides = [
  SlideTitle,
  SlideProblem,
  SlideSolution,
  SlideFeatures,
  SlideUserFlow,
  SlideRating,
  SlideMarket,
  SlideMonetization,
  SlideTech,
  SlideRoadmap,
  SlideContact,
];

const slideLabels = [
  "Титульный", "Проблема", "Решение", "Возможности", "User Flow",
  "Рейтинг", "Рынок", "Монетизация", "Технологии", "Roadmap", "Контакт",
];

const Presentation = () => {
  const [current, setCurrent] = useState(0);
  const [scale, setScale] = useState(1);
  const [direction, setDirection] = useState(0);

  const updateScale = useCallback(() => {
    const scaleX = window.innerWidth / 1920;
    const scaleY = window.innerHeight / 1080;
    setScale(Math.min(scaleX, scaleY));
  }, []);

  useEffect(() => {
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [updateScale]);

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= slides.length || index === current) return;
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      if (e.key === "f" || e.key === "F5") {
        e.preventDefault();
        document.documentElement.requestFullscreen?.();
      }
      if (e.key === "Escape") document.exitFullscreen?.();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  const CurrentSlide = slides[current];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="slide-container bg-background select-none cursor-default">
      {/* Scaled slide */}
      <div
        className="slide-wrapper"
        style={{ transform: `scale(${scale})` }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <CurrentSlide />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center pb-5 gap-4">
        {/* Prev */}
        <button
          onClick={prev}
          disabled={current === 0}
          className="w-10 h-10 rounded-full card-glass flex items-center justify-center text-foreground/60 hover:text-foreground disabled:opacity-20 transition-all text-lg"
        >
          ‹
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`nav-dot w-2.5 h-2.5 rounded-full transition-all ${
                i === current ? "active" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              title={slideLabels[i]}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={next}
          disabled={current === slides.length - 1}
          className="w-10 h-10 rounded-full card-glass flex items-center justify-center text-foreground/60 hover:text-foreground disabled:opacity-20 transition-all text-lg"
        >
          ›
        </button>

        {/* Slide counter */}
        <span className="slide-number text-[13px] text-muted-foreground/50 ml-4">
          {current + 1} / {slides.length}
        </span>
      </div>
    </div>
  );
};

export default Presentation;
