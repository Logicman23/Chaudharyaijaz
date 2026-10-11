"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ChevronIcon, CloseIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { gallery } from "@/lib/site";

// Spans tuned for 6 photos so the grid closes with no holes at 2 and 4 columns.
const bentoSpans = [
  "sm:col-span-2 sm:row-span-2",
  "",
  "",
  "lg:col-span-2",
  "lg:col-span-2",
  "sm:col-span-2",
];

export function GalleryGrid() {
  const [open, setOpen] = useState<number | null>(null);
  const count = gallery.length;

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % count));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + count) % count));
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, count]);

  return (
    <>
      {/* Bento layout: first image spans two rows on large screens */}
      <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[240px] lg:grid-cols-4">
        {gallery.map((img, i) => (
          <Reveal
            key={img.src}
            delay={(i % 4) * 0.06}
            className={bentoSpans[i] ?? ""}
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block size-full overflow-hidden rounded-2xl bg-pti-green-900 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
              aria-label={`Open photo: ${img.caption}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-pti-green-950/90 via-pti-green-950/10 to-transparent opacity-80 transition group-hover:opacity-100" />
              <span className="absolute inset-0 rounded-2xl ring-0 ring-inset ring-gold-400 transition-all group-hover:ring-4" />
              <span className="absolute inset-x-0 bottom-0 p-5 text-left">
                <span className="block font-heading text-sm font-bold text-white sm:text-base">{img.caption}</span>
                <span className="mt-1 block h-0.5 w-0 bg-pti-red-500 transition-all duration-500 group-hover:w-16" />
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={gallery[open].caption}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-pti-green-950/95 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.figure
              key={open}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative overflow-hidden rounded-2xl border-2 border-gold-400/60" style={{ aspectRatio: `${gallery[open].w} / ${gallery[open].h}` }}>
                <Image src={gallery[open].src} alt={gallery[open].alt} fill sizes="(min-width: 1024px) 1024px, 100vw" className="object-contain" />
              </div>
              <figcaption className="mt-4 text-center font-heading font-semibold text-white">
                {gallery[open].caption}
                <span className="ml-3 text-sm text-white/50">
                  {open + 1} / {count}
                </span>
              </figcaption>
            </motion.figure>

            <button type="button" aria-label="Close" onClick={() => setOpen(null)} className="absolute right-4 top-4 grid size-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-pti-red-600">
              <CloseIcon width={24} height={24} />
            </button>
            {(["left", "right"] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                aria-label={dir === "left" ? "Previous photo" : "Next photo"}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen((i) => (i === null ? i : (i + (dir === "left" ? -1 : 1) + count) % count));
                }}
                className={`absolute top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-gold-500 hover:text-pti-green-950 ${dir === "left" ? "left-3 sm:left-6" : "right-3 sm:right-6"}`}
              >
                <ChevronIcon direction={dir} width={24} height={24} />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Gallery() {
  return (
    <section id="gallery" className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-3 font-heading text-xs font-bold uppercase tracking-[0.25em] text-pti-red-600">Photo Gallery</p>
          <h2 className="font-heading text-3xl font-extrabold text-pti-green-900 sm:text-4xl lg:text-5xl">Moments of service</h2>
          <div className="flag-rule mx-auto mt-5 h-1 w-24 rounded-full" />
        </div>
        <GalleryGrid />
      </div>
    </section>
  );
}
