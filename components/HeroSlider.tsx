"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { ArrowRightIcon, ChevronIcon } from "@/components/icons";
import { heroSlides } from "@/lib/site";

const AUTOPLAY_MS = 6500;

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const count = heroSlides.length;

  const go = useCallback((next: number) => setIndex((next + count) % count), [count]);

  // Autoplay — paused on hover/focus, and off entirely for reduced-motion users.
  // `index` is a dependency so manual navigation restarts the timer.
  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, reduce, go]);

  const slide = heroSlides[index];

  return (
    <section
      id="home"
      aria-roledescription="carousel"
      aria-label="Highlights"
      className="relative isolate h-[100svh] min-h-[640px] overflow-hidden bg-pti-green-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(index - 1);
        if (e.key === "ArrowRight") go(index + 1);
      }}
    >
      {/* Background image — crossfade with a slow Ken Burns zoom */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.id}
          className="absolute inset-0 -z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: reduce ? 1 : 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: AUTOPLAY_MS / 1000 + 1.5, ease: "linear" }}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className={`object-cover ${slide.position}`}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Green overlay keeps type legible on any photo; red glow adds warmth bottom-left */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-pti-green-950/95 via-pti-green-950/65 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-pti-green-950/90 via-transparent to-black/30" />
      <div className="absolute -bottom-40 -left-40 -z-10 size-[520px] rounded-full bg-pti-red-600/25 blur-3xl" />

      <div className="mx-auto flex h-full max-w-7xl items-center px-4 pt-20 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            className="max-w-2xl"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
              exit: { opacity: 0, transition: { duration: 0.25 } },
            }}
            aria-live={paused ? "polite" : "off"}
          >
            {[
              <p key="eyebrow" className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-400/50 bg-black/30 px-4 py-1.5 font-heading text-xs font-bold uppercase tracking-[0.2em] text-gold-300 backdrop-blur">
                <span className="size-2 animate-pulse rounded-full bg-pti-red-500" />
                {slide.eyebrow}
              </p>,
              <h1 key="title" className="font-heading text-4xl font-black leading-[1.05] text-white text-balance sm:text-5xl lg:text-7xl">
                {slide.title}{" "}
                <span className="text-gold-gradient">{slide.highlight}</span>
              </h1>,
              <p key="body" className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
                {slide.body}
              </p>,
              <div key="ctas" className="mt-9 flex flex-wrap gap-4">
                <a
                  href={slide.cta.href}
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-7 py-3.5 font-heading font-bold text-pti-green-950 shadow-xl shadow-gold-600/25 transition hover:-translate-y-0.5 hover:from-pti-red-600 hover:to-pti-red-500 hover:text-white"
                >
                  {slide.cta.label}
                  <ArrowRightIcon className="transition group-hover:translate-x-1" />
                </a>
                <a
                  href="#biography"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-7 py-3.5 font-heading font-bold text-white transition hover:border-gold-400 hover:text-gold-300"
                >
                  Read My Story
                </a>
              </div>,
            ].map((child) => (
              <motion.div
                key={child.key}
                variants={{
                  hidden: { opacity: 0, y: reduce ? 0 : 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                {child}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls: arrows + dots with a progress fill on the active dot */}
      <div className="absolute inset-x-0 bottom-8 z-10 mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3" role="tablist" aria-label="Choose slide">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1}: ${s.eyebrow}`}
              onClick={() => go(i)}
              className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-500 ${
                i === index ? "w-14 bg-white/25" : "w-6 bg-white/40 hover:bg-white/70"
              }`}
            >
              {i === index && (
                <motion.span
                  key={`${s.id}-${paused}`}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-pti-red-500 to-gold-400"
                  initial={{ width: paused || reduce ? "100%" : "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: paused || reduce ? 0 : AUTOPLAY_MS / 1000, ease: "linear" }}
                />
              )}
            </button>
          ))}
          <span className="ml-2 font-heading text-sm font-bold tabular-nums text-white/70">
            {String(index + 1).padStart(2, "0")} <span className="text-white/40">/ {String(count).padStart(2, "0")}</span>
          </span>
        </div>

        <div className="flex gap-2">
          {(["left", "right"] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => go(index + (dir === "left" ? -1 : 1))}
              aria-label={dir === "left" ? "Previous slide" : "Next slide"}
              className="grid size-12 place-items-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur transition hover:border-gold-400 hover:bg-gold-500 hover:text-pti-green-950"
            >
              <ChevronIcon direction={dir} width={22} height={22} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
