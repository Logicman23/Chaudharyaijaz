import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { experience } from "@/lib/site";

export function Experience() {
  return (
    <section id="experience" className="bg-surface py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[2fr_3fr] lg:px-8">
        {/* Sticky intro column */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="mb-3 inline-flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-[0.25em] text-pti-red-600">
              <span className="h-px w-8 bg-pti-red-600" />
              Global Experience
            </p>
            <h2 className="font-heading text-3xl font-extrabold leading-tight text-pti-green-900 text-balance sm:text-4xl lg:text-5xl">
              Three decades of leadership on the world stage
            </h2>
            <div className="flag-rule mt-5 h-1 w-24 rounded-full" />
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Running a leading group of companies headquartered in Kuwait, Chaudhary Aijaz dealt with globally
              renowned business players — experience he now brings to Pakistan&apos;s economic revival.
            </p>
            <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl shadow-xl ring-4 ring-white">
              <Image
                src="/images/with-dignitaries.jpg"
                alt="Chaudhary Aijaz with dignitaries at an official reception"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-top"
              />
              <div className="absolute bottom-4 left-4 rounded-xl bg-pti-green-950/90 px-4 py-3 backdrop-blur">
                <p className="font-heading text-2xl font-black text-gold-gradient">28 companies</p>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Kuwait-based group</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {experience.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 0.06} className={i === experience.length - 1 ? "sm:col-span-2" : ""}>
              <article className="group h-full rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-gold-400 hover:shadow-xl hover:shadow-pti-green-900/10">
                <div className="flex items-center gap-3">
                  <span className="font-heading text-sm font-black text-pti-red-600 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-slate-200 transition group-hover:bg-gold-400" />
                </div>
                <h3 className="mt-3 font-heading text-lg font-bold text-pti-green-900">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
