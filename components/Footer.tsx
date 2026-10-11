import { socialIcons } from "@/components/icons";
import { navLinks, site, socials, type SocialKey } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-pti-green-950 text-pti-green-100/80">
      <div className="flag-rule h-1.5" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-full border-2 border-gold-400 bg-pti-green-800 font-heading font-black text-gold-300">
              CA
            </span>
            <div>
              <p className="font-heading text-xl font-extrabold text-white">
                Chaudhary <span className="text-gold-400">Aijaz</span>
              </p>
              <p className="text-sm">{site.title}</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm leading-relaxed">
            Pakistan Tehreek-e-Insaf. Standing with Imran Khan for justice, accountability and a welfare state for
            every Pakistani.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="mb-4 font-heading text-sm font-bold uppercase tracking-widest text-gold-400">Explore</p>
          <ul className="grid grid-cols-2 gap-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#join" className="font-semibold text-pti-red-500 transition hover:text-gold-300">
                Volunteer
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <p className="mb-4 font-heading text-sm font-bold uppercase tracking-widest text-gold-400">Follow</p>
          <div className="flex gap-3">
            {(Object.keys(socials) as SocialKey[]).map((key) => {
              const Icon = socialIcons[key];
              return (
                <a
                  key={key}
                  href={socials[key].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={socials[key].label}
                  className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-gold-500 hover:text-pti-green-950"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
          <p className="mt-6 inline-block font-urdu text-xl leading-loose text-gold-300" lang="ur" dir="rtl">
            {site.urduName}
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-6 text-center text-sm sm:px-6 lg:px-8">
          © {site.fullName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
