import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { vision } from "@/lib/site";

const accentStyles = {
  red: "bg-pti-red-600 text-white",
  gold: "bg-gold-500 text-pti-green-950",
  green: "bg-pti-green-600 text-white",
} as const;

export function Vision() {
  return (
    <section id="vision" className="relative isolate overflow-hidden bg-pti-green-950 py-24 text-white sm:py-32">
      {/* Background: faded photo + crescent-and-star motif */}
      <Image
        src="/images/meeting-imran-khan.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover opacity-10 grayscale"
      />
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        className="absolute -right-24 -top-24 -z-10 size-[520px] text-pti-green-800/60"
        fill="currentColor"
      >
        <path d="M120 20a80 80 0 1 0 0 160 66 66 0 1 1 0-160" />
        <path d="m150 70 6 18h19l-15 11 6 18-16-11-15 11 6-18-16-11h19z" />
      </svg>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Vision & PTI Manifesto"
          title="One vision. A just, prosperous Naya Pakistan."
          intro="Chaudhary Aijaz's agenda stands shoulder to shoulder with Imran Khan's call for an Islamic welfare state, built on the rule of law, accountability and merit. These are the commitments he has carried from the boardroom to the Assembly floor."
          tone="dark"
        />

        <Reveal>
          <blockquote className="mx-auto mb-16 max-w-4xl rounded-3xl border border-gold-400/30 bg-gradient-to-br from-pti-green-900 to-pti-green-950 p-8 text-center shadow-2xl sm:p-12">
            <p className="font-heading text-2xl font-bold leading-snug text-white text-balance sm:text-3xl">
              &ldquo;Eliminate the discretionary powers at all levels to cut down the tendency of
              corruption.&rdquo;
            </p>
            <footer className="mt-5 text-sm font-semibold uppercase tracking-widest text-gold-400">
              — Chaudhary Aijaz, Vision &amp; Objectives
            </footer>
          </blockquote>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {vision.map((v, i) => (
            <Reveal key={v.title} delay={(i % 3) * 0.08}>
              <article className="group h-full rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-gold-400/60 hover:bg-white/[0.08]">
                <span
                  className={`grid size-12 place-items-center rounded-xl font-heading text-lg font-black ${accentStyles[v.accent]}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-heading text-xl font-bold text-white">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-pti-green-100/80">{v.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
