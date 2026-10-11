"use client";

import { useActionState } from "react";
import { subscribe, type SubscribeState } from "@/app/actions";
import { ArrowRightIcon } from "@/components/icons";

const initial: SubscribeState = { status: "idle", message: "" };

export function Newsletter() {
  const [state, action, pending] = useActionState(subscribe, initial);

  return (
    <section id="join" className="relative isolate overflow-hidden border-b-8 border-pti-red-600 bg-pti-green-900 py-20 sm:py-28 lg:border-b-0">
      {/* Diagonal red & gold bands for energy */}
      <div className="absolute -right-32 top-0 -z-10 hidden h-full w-[60%] -skew-x-12 bg-pti-red-600/90 lg:block" />
      <div className="absolute -right-32 top-0 -z-10 hidden h-full w-[60%] -translate-x-6 -skew-x-12 border-l-8 border-gold-400 lg:block" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="mb-3 font-heading text-xs font-bold uppercase tracking-[0.25em] text-gold-400">
            Join the Movement
          </p>
          <h2 className="font-heading text-3xl font-black leading-tight text-white text-balance sm:text-5xl">
            Be part of the change Pakistan is waiting for.
          </h2>
          <p className="mt-5 max-w-lg text-lg text-pti-green-100/85">
            Get rally announcements, statements and ways to help — straight to your inbox. Tick the box to
            volunteer with the team in your area.
          </p>
        </div>

        <form
          action={action}
          className="rounded-3xl bg-white p-6 shadow-2xl shadow-black/30 ring-4 ring-gold-400/60 sm:p-8"
          aria-describedby="subscribe-status"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-pti-green-900">Name</span>
              <input
                name="name"
                autoComplete="name"
                placeholder="Your name"
                className="w-full rounded-xl border border-slate-300 bg-surface px-4 py-3 outline-none transition focus:border-pti-green-600 focus:bg-white focus:ring-4 focus:ring-pti-green-100"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-pti-green-900">
                Email <span className="text-pti-red-600">*</span>
              </span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-300 bg-surface px-4 py-3 outline-none transition focus:border-pti-green-600 focus:bg-white focus:ring-4 focus:ring-pti-green-100"
              />
            </label>
          </div>
          <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-xl bg-gold-200/40 px-4 py-3 text-sm font-medium text-pti-green-900">
            <input name="volunteer" type="checkbox" className="size-5 accent-pti-red-600" />
            I want to volunteer for the campaign
          </label>
          <button
            type="submit"
            disabled={pending}
            className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pti-red-600 to-pti-red-500 px-6 py-4 font-heading font-bold text-white shadow-lg transition hover:from-gold-500 hover:to-gold-400 hover:text-pti-green-950 disabled:cursor-wait disabled:opacity-70"
          >
            {pending ? "Joining…" : "Join the Movement"}
            {!pending && <ArrowRightIcon className="transition group-hover:translate-x-1" />}
          </button>
          <p
            id="subscribe-status"
            role="status"
            className={`mt-4 min-h-6 text-center text-sm font-medium ${
              state.status === "success" ? "text-pti-green-700" : "text-pti-red-600"
            }`}
          >
            {state.message}
          </p>
        </form>
      </div>
    </section>
  );
}
