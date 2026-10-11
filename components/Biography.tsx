import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { milestones, site, stats } from "@/lib/site";

export function Biography() {
  return (
    <section id="biography" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="absolute -left-4 -top-4 h-full w-full rounded-3xl border-2 border-gold-400" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-pti-green-900/20">
              <Image
                src="/images/national-assembly-session.jpg"
                alt="Aijaz Ahmed Chaudhary in the National Assembly of Pakistan"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-[60%_35%]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-pti-green-950/90 to-transparent p-6 pr-40 pt-20 sm:pr-6">
                <p className="font-heading text-sm font-bold uppercase tracking-widest text-gold-300">
                  National Assembly of Pakistan
                </p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-2 rounded-2xl bg-pti-red-600 px-6 py-4 text-white shadow-xl ring-4 ring-white sm:-right-6">
              <p className="font-heading text-3xl font-black">2013</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/85">Record mandate</p>
            </div>
          </Reveal>

          <div>
            <SectionHeading eyebrow="Biography" title={site.fullName} align="left" />
            <Reveal delay={0.1}>
              <p className="-mt-6 mb-6 inline-block font-urdu text-2xl leading-loose text-pti-green-700" lang="ur" dir="rtl">
                {site.urduName}
              </p>
              <div className="space-y-5 text-lg leading-relaxed text-slate-700">
                <p>
                  A self-made businessman, technocrat and parliamentarian, Chaudhary Aijaz spent more than three
                  decades building one of the most successful Pakistani-owned business houses in the Gulf — and then
                  brought that experience home to serve the people of{" "}
                  <strong className="text-pti-green-800">Mandi Bahauddin</strong>.
                </p>
                <p>
                  As a Member of the National Assembly he submitted more than 190 bills, served on the Privatization
                  and Foreign Affairs committees, and won his seat in 2013 with a mandate that set a record in the
                  district&apos;s political history. When conscience demanded it, he resigned from the ruling party
                  and the Assembly to stand with{" "}
                  <strong className="text-pti-red-600">Imran Khan and Pakistan Tehreek-e-Insaf</strong> in the
                  struggle for democracy and justice.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Stats band */}
        <Reveal className="mt-24">
          <dl className="grid grid-cols-2 overflow-hidden rounded-3xl bg-pti-green-900 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col-reverse p-6 text-center sm:p-10 ${i % 2 === 0 ? "" : "bg-pti-green-800/60"}`}
              >
                <dt className="mt-2 text-sm font-medium text-pti-green-100/80">{s.label}</dt>
                <dd className="font-heading text-4xl font-black text-gold-gradient sm:text-5xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Milestones */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {milestones.map((m, i) => (
            <Reveal key={m.title} delay={(i % 4) * 0.06}>
              <article className="group relative h-full rounded-2xl border border-slate-200 bg-surface p-7 transition duration-300 hover:-translate-y-1 hover:border-gold-400 hover:bg-white hover:shadow-xl hover:shadow-pti-green-900/10">
                <span className="absolute left-0 top-7 h-8 w-1 rounded-r-full bg-pti-red-600 transition-all group-hover:h-12 group-hover:bg-gold-500" />
                <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-pti-green-600">{m.tag}</p>
                <h3 className="mt-2 font-heading text-lg font-bold text-pti-green-900">{m.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">{m.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
