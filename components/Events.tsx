import { CalendarIcon, MapPinIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { events } from "@/lib/site";

const typeStyle = {
  Rally: "bg-pti-red-600 text-white",
  "Public Darbar": "bg-gold-500 text-pti-green-950",
  "Workers' Convention": "bg-pti-green-600 text-white",
  "Press Conference": "bg-pti-green-950 text-gold-300",
} as const;

function DateBadge({ date }: { date: string | null }) {
  if (!date) {
    return (
      <div className="relative z-10 grid size-20 shrink-0 place-items-center rounded-2xl border-2 border-dashed border-gold-400 bg-[#fbf4dc] text-center">
        <span className="font-heading text-sm font-black leading-tight text-gold-600">
          Date
          <br />
          TBA
        </span>
      </div>
    );
  }
  const d = new Date(date);
  return (
    <div className="relative z-10 flex size-20 shrink-0 flex-col items-center justify-center overflow-hidden rounded-2xl bg-pti-green-900 text-white shadow-lg">
      <span className="w-full bg-pti-red-600 py-0.5 text-center text-[11px] font-bold uppercase tracking-wider">
        {d.toLocaleDateString("en-GB", { month: "short", timeZone: "Asia/Karachi" })}
      </span>
      <span className="font-heading text-3xl font-black leading-none">
        {d.toLocaleDateString("en-GB", { day: "numeric", timeZone: "Asia/Karachi" })}
      </span>
    </div>
  );
}

export function Events() {
  return (
    <section id="events" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Upcoming Events"
          title="Meet Chaudhary Aijaz"
          intro="Rallies, public darbars and workers' conventions across Mandi Bahauddin and beyond. Follow the official channels for live announcements."
        />

        <ol className="relative space-y-6 before:absolute before:bottom-4 before:left-10 before:top-4 before:w-0.5 before:bg-gradient-to-b before:from-pti-green-600 before:via-pti-red-500 before:to-gold-500 max-sm:before:hidden">
          {events.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.08}>
              <li className="relative flex gap-5 sm:gap-8">
                <DateBadge date={e.date} />
                <article className="flex-1 rounded-2xl border border-slate-200 bg-surface p-6 transition hover:border-gold-400 hover:bg-white hover:shadow-lg">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${typeStyle[e.type]}`}>
                      {e.type}
                    </span>
                    {e.date && (
                      <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                        <CalendarIcon width={16} height={16} />
                        {new Date(e.date).toLocaleString("en-GB", {
                          weekday: "short",
                          hour: "numeric",
                          minute: "2-digit",
                          timeZone: "Asia/Karachi",
                        })}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 font-heading text-xl font-bold text-pti-green-900">{e.title}</h3>
                  <p className="mt-2 text-slate-600">{e.description}</p>
                  <p className="mt-4 inline-flex items-start gap-1.5 text-sm font-medium text-pti-green-700">
                    <MapPinIcon width={16} height={16} className="mt-0.5 shrink-0 text-pti-red-600" />
                    {e.venue}, {e.city}
                  </p>
                </article>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
