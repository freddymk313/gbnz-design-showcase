import { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
} from "framer-motion";
import { Plus, ChevronLeft, ChevronRight, Sparkles, Hand } from "lucide-react";
import type { ProjectItem } from "@/data/portfolioData";

interface MobileSwipeDeckProps {
  projects: ProjectItem[];
  onSelect: (project: ProjectItem) => void;
}

export function MobileSwipeDeck({ projects, onSelect }: MobileSwipeDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const isDraggingRef = useRef(false);

  // Framer Motion motion values for drag tracking
  const x = useMotionValue(0);

  // Dynamic tilt angle: maps drag offset x [-200px, +200px] -> [-14deg, +14deg]
  const rotate = useTransform(x, [-200, 200], [-14, 14]);

  // Dynamic opacity fade during extreme drag distance
  const opacity = useTransform(
    x,
    [-300, -150, 0, 150, 300],
    [0.4, 0.95, 1, 0.95, 0.4]
  );

  // Dynamic subtle scale of front card during drag
  const scale = useTransform(x, [-200, 0, 200], [1.02, 1, 1.02]);

  // Interactive cues opacity
  const rightSwipeCueOpacity = useTransform(x, [20, 100], [0, 1]);
  const leftSwipeCueOpacity = useTransform(x, [-20, -100], [0, 1]);

  // Dynamic background cards scaling up as front card gets dragged
  const nextCardScale = useTransform(x, [-200, 0, 200], [1, 0.94, 1]);
  const nextCardOpacity = useTransform(x, [-200, 0, 200], [1, 0.78, 1]);
  const nextCardY = useTransform(x, [-200, 0, 200], [0, 12, 0]);

  const thirdCardScale = useTransform(x, [-200, 0, 200], [0.94, 0.88, 0.94]);
  const thirdCardOpacity = useTransform(x, [-200, 0, 200], [0.65, 0.45, 0.65]);
  const thirdCardY = useTransform(x, [-200, 0, 200], [12, 24, 12]);

  // Re-synchronize currentIndex to 0 whenever projects list changes (e.g. category filter change)
  useEffect(() => {
    setCurrentIndex(0);
    x.set(0);
  }, [projects, x]);

  if (!projects || projects.length === 0) {
    return null;
  }

  const total = projects.length;
  const currentProject = projects[currentIndex % total];
  const nextProject = projects[(currentIndex + 1) % total];
  const thirdProject = projects[(currentIndex + 2) % total];

  const handleDragStart = () => {
    isDraggingRef.current = true;
  };

  const handleDragEnd = async (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (isAnimating) return;

    const SWIPE_THRESHOLD = 70;
    const VELOCITY_THRESHOLD = 380;

    const offsetX = info.offset.x;
    const velocityX = info.velocity.x;

    // Swiped right -> eject to the right and advance to next project
    if (offsetX > SWIPE_THRESHOLD || velocityX > VELOCITY_THRESHOLD) {
      setIsAnimating(true);
      await animate(x, 500, { duration: 0.24, ease: [0.16, 1, 0.3, 1] });
      setCurrentIndex((prev) => (prev + 1) % total);
      x.set(0);
      setIsAnimating(false);
      setTimeout(() => {
        isDraggingRef.current = false;
      }, 50);
    }
    // Swiped left -> eject to the left and go to previous project
    else if (offsetX < -SWIPE_THRESHOLD || velocityX < -VELOCITY_THRESHOLD) {
      setIsAnimating(true);
      await animate(x, -500, { duration: 0.24, ease: [0.16, 1, 0.3, 1] });
      setCurrentIndex((prev) => (prev - 1 + total) % total);
      x.set(0);
      setIsAnimating(false);
      setTimeout(() => {
        isDraggingRef.current = false;
      }, 50);
    }
    // Didn't exceed threshold -> spring back to center
    else {
      animate(x, 0, {
        type: "spring",
        stiffness: 450,
        damping: 28,
      });
      setTimeout(() => {
        isDraggingRef.current = false;
      }, 50);
    }
  };

  const handleTap = () => {
    if (!isDraggingRef.current && !isAnimating) {
      onSelect(currentProject);
    }
  };

  const navigateTo = (index: number) => {
    if (isAnimating) return;
    setCurrentIndex(index);
    x.set(0);
  };

  const handleNext = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    await animate(x, 400, { duration: 0.22, ease: "easeOut" });
    setCurrentIndex((prev) => (prev + 1) % total);
    x.set(0);
    setIsAnimating(false);
  };

  const handlePrev = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    await animate(x, -400, { duration: 0.22, ease: "easeOut" });
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    x.set(0);
    setIsAnimating(false);
  };

  return (
    <div className="w-full flex flex-col items-center select-none py-2">
      {/* Swipe instruction pill */}
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 text-[10px] font-bold uppercase tracking-wider text-brand-gray mb-4">
        <Hand size={12} className="text-brand-yellow animate-pulse" />
        <span>Glissez la carte pour défiler · Touchez pour ouvrir</span>
      </div>

      {/* Card Stack Area */}
      <div className="relative w-full max-w-[340px] h-[460px] flex items-center justify-center">
        
        {/* 3rd Card in Deck Stack (Background deep) */}
        {total >= 3 && (
          <motion.div
            style={{
              scale: thirdCardScale,
              opacity: thirdCardOpacity,
              y: thirdCardY,
            }}
            className={`absolute top-0 w-full h-[430px] rounded-3xl overflow-hidden ${thirdProject.bg} border border-black/10 shadow-md pointer-events-none z-10`}
          >
            {thirdProject.image && (
              <img
                src={thirdProject.image}
                alt={thirdProject.title}
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>
        )}

        {/* 2nd Card in Deck Stack (Directly behind active) */}
        {total >= 2 && (
          <motion.div
            style={{
              scale: nextCardScale,
              opacity: nextCardOpacity,
              y: nextCardY,
            }}
            className={`absolute top-0 w-full h-[430px] rounded-3xl overflow-hidden ${nextProject.bg} border border-black/10 shadow-lg pointer-events-none z-20`}
          >
            {nextProject.image && (
              <img
                src={nextProject.image}
                alt={nextProject.title}
                className="w-full h-full object-cover"
              />
            )}
            {/* Subtle bottom info bar */}
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-yellow">
                {nextProject.cat}
              </span>
              <h4 className="text-white font-display text-xl uppercase tracking-tight truncate">
                {nextProject.title}
              </h4>
            </div>
          </motion.div>
        )}

        {/* 1st Card: ACTIVE DRAGGABLE TINDER CARD */}
        <motion.div
          key={`${currentProject.id}-${currentIndex}`}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.85}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onTap={handleTap}
          style={{
            x,
            rotate,
            opacity,
            scale,
            touchAction: "pan-y",
          }}
          className={`absolute top-0 w-full h-[430px] rounded-3xl overflow-hidden ${currentProject.bg} border border-black/10 shadow-2xl cursor-grab active:cursor-grabbing z-30 flex flex-col justify-between`}
        >
          {/* Card Image */}
          {currentProject.image && (
            <img
              src={currentProject.image}
              alt={currentProject.title}
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
          )}

          {/* Top Row: Category tag + Fullscreen trigger icon */}
          <div className="relative z-10 p-4 flex items-center justify-between pointer-events-none">
            <span className="px-3 py-1 rounded-full bg-brand-black/75 backdrop-blur-md text-brand-yellow text-[10px] font-bold uppercase tracking-wider border border-white/10 shadow-sm flex items-center gap-1">
              <Sparkles size={11} />
              <span>{currentProject.cat}</span>
            </span>

            <div className="w-8 h-8 rounded-full bg-brand-yellow text-brand-black flex items-center justify-center shadow-lg font-bold">
              <Plus size={16} />
            </div>
          </div>

          {/* Swipe Cue Indicators (Overlaying when dragged left/right) */}
          <motion.div
            style={{ opacity: rightSwipeCueOpacity }}
            className="absolute top-16 left-5 z-20 px-4 py-1.5 rounded-2xl bg-brand-yellow text-brand-black font-display text-lg uppercase tracking-wider border-2 border-brand-black shadow-xl rotate-[-12deg] pointer-events-none"
          >
            Suivant →
          </motion.div>

          <motion.div
            style={{ opacity: leftSwipeCueOpacity }}
            className="absolute top-16 right-5 z-20 px-4 py-1.5 rounded-2xl bg-white text-brand-black font-display text-lg uppercase tracking-wider border-2 border-brand-black shadow-xl rotate-[12deg] pointer-events-none"
          >
            ← Précédent
          </motion.div>

          {/* Bottom Project Info Overlay */}
          <div className="relative z-10 p-5 bg-gradient-to-t from-brand-black/95 via-brand-black/70 to-transparent pt-12 text-left pointer-events-none">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-yellow font-bold">
                {currentProject.cat}
              </span>
              <span className="text-[10px] text-white/60 font-mono">
                {currentIndex + 1} / {total}
              </span>
            </div>
            <h3 className="text-white font-display text-2xl uppercase tracking-tight leading-none mb-1">
              {currentProject.title}
            </h3>
            <p className="text-white/80 text-xs font-body leading-snug line-clamp-2">
              {currentProject.label}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Control Buttons & Progress Dots */}
      <div className="flex items-center justify-between w-full max-w-[340px] px-2 mt-3">
        {/* Prev button */}
        <button
          onClick={handlePrev}
          disabled={isAnimating}
          aria-label="Projet précédent"
          className="w-10 h-10 rounded-full bg-white border border-black/10 text-brand-black flex items-center justify-center shadow-sm hover:bg-neutral-100 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Position Dots */}
        <div className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white border border-black/5 shadow-sm">
          {projects.map((_, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                onClick={() => navigateTo(idx)}
                aria-label={`Aller au projet ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "w-6 bg-brand-yellow shadow-sm"
                    : "w-2 bg-black/20 hover:bg-black/40"
                }`}
              />
            );
          })}
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          disabled={isAnimating}
          aria-label="Projet suivant"
          className="w-10 h-10 rounded-full bg-white border border-black/10 text-brand-black flex items-center justify-center shadow-sm hover:bg-neutral-100 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
