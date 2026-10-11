import { MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { contact, offices } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Our doors are open"
          intro="Reach the constituency office in Mandi Bahauddin or the Islamabad office directly."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {offices.map((o, i) => (
            <Reveal key={o.city} delay={i * 0.08}>
              <article className="h-full rounded-2xl border-t-4 border-pti-green-600 bg-white p-7 shadow-sm">
                <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-pti-red-600">{o.label}</p>
                <h3 className="mt-2 font-heading text-2xl font-extrabold text-pti-green-900">{o.city}</h3>
                <p className="mt-4 flex gap-3 text-slate-600">
                  <MapPinIcon className="mt-0.5 shrink-0 text-pti-green-600" />
                  {o.address}
                </p>
                <ul className="mt-4 space-y-2">
                  {o.phones.map((p) => (
                    <li key={p}>
                      <a href={`tel:${p.replace(/-/g, "")}`} className="inline-flex items-center gap-3 font-medium text-pti-green-800 hover:text-pti-red-600">
                        <PhoneIcon width={18} height={18} className="text-pti-green-600" />
                        {p}
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}

          <Reveal delay={0.16}>
            <article className="flex h-full flex-col rounded-2xl bg-pti-green-900 p-7 text-white shadow-xl">
              <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-gold-400">Direct</p>
              <h3 className="mt-2 font-heading text-2xl font-extrabold">Write or message</h3>
              <div className="mt-6 space-y-3">
                <a
                  href={contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl bg-[#25D366] px-5 py-4 font-heading font-bold text-white transition hover:brightness-110"
                >
                  <WhatsAppIcon width={22} height={22} />
                  {contact.whatsapp}
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 break-all rounded-xl bg-white/10 px-5 py-4 font-medium transition hover:bg-gold-500 hover:text-pti-green-950"
                >
                  <MailIcon width={22} height={22} className="shrink-0" />
                  {contact.email}
                </a>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
