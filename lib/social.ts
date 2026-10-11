import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { socials } from "@/lib/site";

/**
 * LIVE SOCIAL FEED ARCHITECTURE
 * ─────────────────────────────
 * Each network gets the lightest integration that still updates on its own:
 *
 *  Platform   | Strategy                                   | Needs a key?
 *  -----------|--------------------------------------------|---------------------------
 *  YouTube    | Public channel RSS, fetched on the server   | No
 *  Instagram  | Instagram Graph API (/me/media)             | Yes — INSTAGRAM_ACCESS_TOKEN
 *  Facebook   | Official Page Plugin iframe (client, lazy)  | No
 *  X          | Official timeline widget (client, lazy)     | No (paid API for server-side)
 *
 * Server feeds use `'use cache'` + `cacheLife('minutes')`: the page is served
 * from cache and refreshed in the background at most every few minutes, so a new
 * upload shows up quickly without hitting the platform on every visit.
 *
 * For instant updates, call `revalidateTag('social', 'max')` from a webhook route
 * (e.g. YouTube PubSubHubbub push notifications or a Zapier "new post" trigger).
 */

export type YouTubeVideo = {
  id: string;
  title: string;
  published: string;
  views: number | null;
};

export type InstagramPost = {
  id: string;
  caption: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  imageUrl: string;
  permalink: string;
  timestamp: string;
};

function decodeEntities(text: string) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/**
 * Latest uploads from the official YouTube channel.
 * Uses https://www.youtube.com/feeds/videos.xml — public, key-less, returns the
 * 15 most recent uploads. To use the Data API v3 instead (higher quotas, playlists,
 * live-stream status), swap the fetch for
 * `https://www.googleapis.com/youtube/v3/search?channelId=…&order=date&key=${process.env.YOUTUBE_API_KEY}`.
 */
export async function getLatestYouTubeVideos(limit = 6): Promise<YouTubeVideo[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("social", "youtube");

  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${socials.youtube.channelId}`,
    );
    if (!res.ok) return [];
    const xml = await res.text();

    return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
      .map(([, entry]) => {
        const pick = (re: RegExp) => entry.match(re)?.[1] ?? "";
        const views = pick(/<media:statistics views="(\d+)"/);
        return {
          id: pick(/<yt:videoId>([^<]+)<\/yt:videoId>/),
          title: decodeEntities(pick(/<title>([^<]*)<\/title>/)),
          published: pick(/<published>([^<]+)<\/published>/),
          views: views ? Number(views) : null,
        };
      })
      .filter((v) => v.id)
      .sort((a, b) => b.published.localeCompare(a.published))
      .slice(0, limit);
  } catch {
    // A feed outage must never take the page down — the UI falls back to a channel link.
    return [];
  }
}

/**
 * Latest Instagram posts via the Instagram Graph API.
 *
 * Setup (one-time, ~10 minutes):
 *  1. Switch @chaijaz to a Professional (Creator/Business) account.
 *  2. Create an app at developers.facebook.com → add "Instagram API with Instagram Login".
 *  3. Generate a long-lived user token and set INSTAGRAM_ACCESS_TOKEN in Vercel env vars.
 *  4. Tokens last 60 days — refresh with a weekly Vercel Cron hitting
 *     https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=…
 *
 * Without a token this returns [] and the UI shows a follow card instead.
 */
export async function getLatestInstagramPosts(limit = 6): Promise<InstagramPost[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("social", "instagram");

  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return [];

  try {
    const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=${fields}&limit=${limit}&access_token=${token}`,
    );
    if (!res.ok) return [];
    const json = (await res.json()) as {
      data: {
        id: string;
        caption?: string;
        media_type: InstagramPost["mediaType"];
        media_url: string;
        thumbnail_url?: string;
        permalink: string;
        timestamp: string;
      }[];
    };
    return json.data.map((p) => ({
      id: p.id,
      caption: p.caption ?? "",
      mediaType: p.media_type,
      imageUrl: p.media_type === "VIDEO" ? (p.thumbnail_url ?? p.media_url) : p.media_url,
      permalink: p.permalink,
      timestamp: p.timestamp,
    }));
  } catch {
    return [];
  }
}
