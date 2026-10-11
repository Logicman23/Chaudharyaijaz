"use client";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

/**
 * react-lite-youtube-embed renders only a thumbnail + play button (~3 KB).
 * The real YouTube iframe (~1 MB of JS) loads only after a click, so a grid of
 * six videos costs almost nothing on page load.
 */
export function YouTubePlayer({ id, title }: { id: string; title: string }) {
  return (
    <LiteYouTubeEmbed
      id={id}
      title={title}
      poster="hqdefault"
      webp
      lazyLoad
      wrapperClass="yt-lite rounded-xl overflow-hidden"
    />
  );
}
