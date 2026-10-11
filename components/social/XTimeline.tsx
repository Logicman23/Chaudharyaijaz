"use client";

import { useEffect, useRef, useState } from "react";
import { LazyMount } from "@/components/social/LazyMount";
import { XIcon } from "@/components/icons";
import { socials } from "@/lib/site";

declare global {
  interface Window {
    twttr?: { widgets: { load: (el?: HTMLElement) => void } };
  }
}

/**
 * X (Twitter) profile timeline via X's official widgets.js — the LAST-RESORT
 * source for the X card (see XFeed in components/MediaCenter.tsx).
 *
 * Since 2023 X answers logged-out timeline requests with HTTP 429, so for most
 * visitors this widget stays empty. When it doesn't render a visible timeline
 * within a few seconds we swap in a follow card.
 */
const RENDER_TIMEOUT_MS = 6000;

function Timeline({ height }: { height: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rendered, setRendered] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // The widget always inserts an iframe — even when X refuses the timeline, it
    // just stays 0px tall. Only a visibly tall iframe counts as rendered.
    const poll = window.setInterval(() => {
      const frame = el.querySelector<HTMLIFrameElement>('iframe[id^="twitter-widget"]');
      if (frame && frame.offsetHeight > 100) {
        setRendered(true);
        window.clearInterval(poll);
      }
    }, 500);
    const timer = window.setTimeout(() => setTimedOut(true), RENDER_TIMEOUT_MS);

    if (window.twttr?.widgets) {
      window.twttr.widgets.load(el);
    } else if (!document.getElementById("x-widgets-js")) {
      const s = document.createElement("script");
      s.id = "x-widgets-js";
      s.src = "https://platform.twitter.com/widgets.js";
      s.async = true;
      document.body.appendChild(s);
    }
    return () => {
      window.clearInterval(poll);
      window.clearTimeout(timer);
    };
  }, []);

  const showFallback = timedOut && !rendered;

  return (
    <div className="relative">
      <div ref={ref} className={showFallback ? "hidden" : undefined}>
        <a
          className="twitter-timeline"
          data-height={height}
          data-chrome="noheader nofooter transparent"
          data-dnt="true"
          href={`https://twitter.com/${socials.x.handle}`}
        >
          <span className="flex flex-col items-center gap-3 py-16 text-center text-slate-500">
            <XIcon width={32} height={32} className="text-slate-900" />
            Loading posts by @{socials.x.handle}…
          </span>
        </a>
      </div>
      {showFallback && (
        <a
          href={socials.x.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex min-h-56 flex-col items-center justify-center gap-4 rounded-xl bg-surface p-8 text-center transition hover:bg-pti-green-50"
        >
          <span className="grid size-16 place-items-center rounded-2xl bg-black text-white">
            <XIcon width={28} height={28} />
          </span>
          <span className="text-slate-600">Live statements and reactions, as they happen.</span>
          <span className="font-heading font-bold text-pti-red-600">
            Open @{socials.x.handle} <span className="inline-block transition group-hover:translate-x-1">→</span>
          </span>
        </a>
      )}
    </div>
  );
}

export function XTimeline({ height = 560 }: { height?: number }) {
  return (
    <LazyMount placeholder={<div className="animate-pulse rounded-xl bg-slate-100" style={{ height }} />}>
      <Timeline height={height} />
    </LazyMount>
  );
}
