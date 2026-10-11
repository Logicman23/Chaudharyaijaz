import Image from "next/image";
import { ArrowRightIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { news } from "@/lib/site";

const categoryStyle = {
  "Press Release": "bg-pti-green-700 text-white",
  "Campaign Trail": "bg-pti-red-600 text-white",
  Feature: "bg-gold-500 text-pti-green-950",
  Statement: "bg-pti-green-950 text-gold-300",
} as const;

export function News() {
  return (
    <section id="news" className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Latest News & Press" title="In the news" />
        <div className="grid gap-6 md:grid-cols-3">
          {news.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <a
                href={item.href}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-gold-400"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${categoryStyle[item.category]}`}>
                    {item.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  {item.date && (
                    <time dateTime={item.date} className="mb-2 text-sm text-slate-500">
                      {new Date(item.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                    </time>
                  )}
                  <h3 className="font-heading text-xl font-bold leading-snug text-pti-green-900 transition group-hover:text-pti-red-600">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 leading-relaxed text-slate-600">{item.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-heading text-sm font-bold text-pti-green-700">
                    Read more <ArrowRightIcon width={16} height={16} className="transition group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
