import { Reveal } from "@/components/Reveal";

type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export function SectionHeading({ eyebrow, title, intro, align = "center", tone = "light" }: Props) {
  const centered = align === "center";
  const dark = tone === "dark";

  return (
    <Reveal className={`mb-12 max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      <p
        className={`mb-3 inline-flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-[0.25em] ${
          dark ? "text-gold-400" : "text-pti-red-600"
        }`}
      >
        <span className={`h-px w-8 ${dark ? "bg-gold-400" : "bg-pti-red-600"}`} />
        {eyebrow}
      </p>
      <h2
        className={`font-heading text-3xl font-extrabold leading-tight text-balance sm:text-4xl lg:text-5xl ${
          dark ? "text-white" : "text-pti-green-900"
        }`}
      >
        {title}
      </h2>
      <div className={`flag-rule mt-5 h-1 w-24 rounded-full ${centered ? "mx-auto" : ""}`} />
      {intro && (
        <p className={`mt-5 text-lg leading-relaxed text-pretty ${dark ? "text-pti-green-100/85" : "text-slate-600"}`}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
