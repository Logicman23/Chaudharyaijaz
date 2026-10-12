"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { CloseIcon, MapPinIcon, MenuIcon, PhoneIcon, socialIcons } from "@/components/icons";
import { islamabadOffice, navLinks, site, socials, telHref, type SocialKey } from "@/lib/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#home");

  // Solid background once the user leaves the hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the link for whichever section is mid-viewport.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock page scroll while the mobile drawer is open; close it on Escape.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-pti-green-950/95 shadow-lg shadow-black/20 backdrop-blur-md"
          : "bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      {/* Flag stripe across the very top edge */}
      <div className="flag-rule h-1 w-full" />

      {/* Contact top bar — collapses once the user scrolls so the sticky header stays compact */}
      <div
        className={`overflow-hidden bg-pti-green-950 text-sm text-pti-green-100/85 transition-all duration-300 ${
          scrolled || open ? "max-h-0" : "max-h-10 border-b border-white/10"
        }`}
      >
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-center gap-6 px-4 sm:justify-between sm:px-6 lg:px-8">
          <p className="hidden items-center gap-2 truncate sm:flex">
            <MapPinIcon width={15} height={15} className="shrink-0 text-pti-red-500" />
            <span className="truncate">{islamabadOffice.address}</span>
          </p>
          <a
            href={telHref(islamabadOffice.phones[0])}
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-white transition hover:text-gold-300"
          >
            <PhoneIcon width={15} height={15} className="text-gold-400" />
            {islamabadOffice.phones[0]}
          </a>
        </div>
      </div>

      <nav aria-label="Primary" className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <a href="#home" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid size-11 place-items-center rounded-full border-2 border-gold-400 bg-pti-green-800 font-heading text-sm font-black text-gold-300 shadow-inner transition group-hover:border-pti-red-500">
            CA
          </span>
          <span className="leading-tight">
            <span className="block font-heading text-lg font-extrabold tracking-tight text-white">
              Chaudhary <span className="text-gold-400">Aijaz</span>
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-pti-green-100/80">
              People · Pakistan · Progress
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                    isActive ? "text-gold-300" : "text-white/85 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-pti-red-500"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#join"
            className="hidden rounded-full bg-gradient-to-r from-pti-red-600 to-pti-red-500 px-5 py-2.5 font-heading text-sm font-bold text-white shadow-lg shadow-pti-red-900/30 ring-2 ring-gold-400/70 transition hover:-translate-y-0.5 hover:from-gold-500 hover:to-gold-400 hover:text-pti-green-950 sm:inline-block"
          >
            Join the Movement
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-lg text-white ring-1 ring-white/25 transition hover:bg-white/10 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon width={24} height={24} /> : <MenuIcon width={24} height={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 bg-pti-green-950 lg:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-lg px-4 py-3 font-heading font-semibold transition ${
                      active === link.href
                        ? "bg-pti-green-800 text-gold-300"
                        : "text-white/90 hover:bg-pti-green-900"
                    }`}
                  >
                    {link.label}
                    {active === link.href && <span className="size-2 rounded-full bg-pti-red-500" />}
                  </a>
                </li>
              ))}
            </ul>
            <div className="space-y-4 border-t border-white/10 px-4 pb-6 pt-4">
              <a
                href="#join"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-pti-red-600 py-3 text-center font-heading font-bold text-white ring-2 ring-gold-400"
              >
                Join the Movement
              </a>
              <div className="flex justify-center gap-3">
                {(Object.keys(socials) as SocialKey[]).map((key) => {
                  const Icon = socialIcons[key];
                  return (
                    <a
                      key={key}
                      href={socials[key].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.name} on ${socials[key].label}`}
                      className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-gold-500 hover:text-pti-green-950"
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
