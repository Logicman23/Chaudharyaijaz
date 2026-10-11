"use client";

import { useEffect, useRef, useState } from "react";
import { LazyMount } from "@/components/social/LazyMount";
import { socials } from "@/lib/site";

/**
 * Facebook Page Plugin — Meta's official, token-free embed of a Page timeline.
 * It always shows the latest public posts, so new posts appear automatically.
 * The plugin caps width at 500px and doesn't reflow, so we measure the container
 * and pass an explicit width.
 *
 * For a fully custom design instead, use the Graph API
 * (GET /{page-id}/posts?fields=message,full_picture,permalink_url,created_time)
 * with a long-lived Page access token, mirroring lib/social.ts → getLatestInstagramPosts.
 */
function FacebookFrame({ height }: { height: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.min(500, Math.floor(entry.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const params = new URLSearchParams({
    href: socials.facebook.url,
    tabs: "timeline",
    width: String(width),
    height: String(height),
    small_header: "false",
    adapt_container_width: "true",
    hide_cover: "false",
    show_facepile: "true",
  });

  return (
    <div ref={ref} className="flex justify-center">
      {width > 0 && (
        <iframe
          key={width}
          title="Chaudhary Aijaz on Facebook"
          src={`https://www.facebook.com/plugins/page.php?${params}`}
          width={width}
          height={height}
          className="rounded-xl border-0"
          loading="lazy"
          allow="encrypted-media; clipboard-write; picture-in-picture; web-share"
        />
      )}
    </div>
  );
}

export function FacebookPage({ height = 620 }: { height?: number }) {
  return (
    <LazyMount placeholder={<div className="animate-pulse rounded-xl bg-slate-100" style={{ height }} />}>
      <FacebookFrame height={height} />
    </LazyMount>
  );
}
