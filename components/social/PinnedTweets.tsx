import { Suspense } from "react";
import { Tweet } from "react-tweet";

/**
 * Pinned / featured X posts, rendered as static HTML on the server by
 * `react-tweet` (Vercel). No API key, no widgets.js, zero client JS for the
 * tweet body — the fastest way to show specific posts.
 *
 * To feature a post: copy the number at the end of its URL
 * (x.com/aijaz_ch/status/<ID>) and add it to FEATURED_TWEET_IDS.
 */
export const FEATURED_TWEET_IDS: string[] = [
  // TODO(client): add post IDs, e.g. "1790000000000000000"
];

export function PinnedTweets() {
  if (FEATURED_TWEET_IDS.length === 0) return null;
  return (
    <div className="grid gap-4 md:grid-cols-2" data-theme="light">
      {FEATURED_TWEET_IDS.map((id) => (
        <Suspense key={id} fallback={<div className="h-64 animate-pulse rounded-xl bg-slate-100" />}>
          <Tweet id={id} />
        </Suspense>
      ))}
    </div>
  );
}
