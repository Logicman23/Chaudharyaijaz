import Image from "next/image";
import { Suspense, type ReactNode } from "react";
import { EmbeddedTweet } from "react-tweet";
import { ArrowRightIcon, socialIcons } from "@/components/icons";
import { SectionHeading } from "@/components/SectionHeading";
import { FacebookPage } from "@/components/social/FacebookPage";
import { XTimeline } from "@/components/social/XTimeline";
import { YouTubePlayer } from "@/components/social/YouTubePlayer";
import { featuredTweetIds, socials, type SocialKey } from "@/lib/site";
import { getLatestInstagramPosts, getLatestTweetIds, getLatestYouTubeVideos, getTweets } from "@/lib/social";

/**
 * MEDIA CENTER — "Live Updates" wall.
 * Server-rendered YouTube + Instagram (cached, see lib/social.ts) and lazily
 * mounted Facebook + X widgets. Every card degrades to a "Follow" link if its
 * source is unavailable, so the section never renders empty.
 */

const brand: Record<SocialKey, { chip: string; button: string }> = {
  facebook: { chip: "bg-[#1877F2] text-white", button: "hover:bg-[#1877F2]" },
  x: { chip: "bg-black text-white", button: "hover:bg-black" },
  youtube: { chip: "bg-[#FF0000] text-white", button: "hover:bg-[#FF0000]" },
  instagram: {
    chip: "bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white",
    button: "hover:bg-[#d62976]",
  },
};

function FeedCard({
  network,
  title,
  children,
  className = "",
}: {
  network: SocialKey;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const s = socials[network];
  const Icon = socialIcons[network];
  return (
    <article className={`flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>
      <header className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className={`grid size-10 place-items-center rounded-xl ${brand[network].chip}`}>
            <Icon />
          </span>
          <div>
            <h3 className="font-heading font-bold text-pti-green-900">{title}</h3>
            <p className="text-sm text-slate-500">@{s.handle}</p>
          </div>
        </div>
        <a
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`rounded-full bg-pti-green-900 px-4 py-2 text-xs font-bold text-white transition hover:text-white ${brand[network].button}`}
        >
          Follow
        </a>
      </header>
      <div className="flex-1 p-4">{children}</div>
    </article>
  );
}

function FollowFallback({ network, message }: { network: SocialKey; message: string }) {
  const s = socials[network];
  const Icon = socialIcons[network];
  return (
    <a
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full min-h-56 flex-col items-center justify-center gap-4 rounded-xl bg-surface p-8 text-center transition hover:bg-pti-green-50"
    >
      <span className={`grid size-16 place-items-center rounded-2xl ${brand[network].chip}`}>
        <Icon width={30} height={30} />
      </span>
      <span className="text-slate-600">{message}</span>
      <span className="inline-flex items-center gap-2 font-heading font-bold text-pti-red-600">
        Open @{s.handle} <ArrowRightIcon className="transition group-hover:translate-x-1" />
      </span>
    </a>
  );
}

async function YouTubeFeed() {
  const videos = await getLatestYouTubeVideos(6);
  if (videos.length === 0) {
    return <FollowFallback network="youtube" message="Watch speeches, interviews and rally coverage on YouTube." />;
  }
  const [lead, ...rest] = videos;
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <YouTubePlayer id={lead.id} title={lead.title} />
        <p dir="auto" className="mt-3 line-clamp-2 font-heading font-semibold text-pti-green-900">
          {lead.title}
        </p>
        <p className="mt-1 text-sm text-slate-500">{formatDate(lead.published)}</p>
      </div>
      <ul className="grid grid-cols-2 gap-4 lg:col-span-2 lg:grid-cols-1 lg:gap-3">
        {rest.slice(0, 4).map((v) => (
          <li key={v.id} className="lg:grid lg:grid-cols-[140px_1fr] lg:items-start lg:gap-3">
            <YouTubePlayer id={v.id} title={v.title} />
            <div className="mt-2 lg:mt-0">
              <p dir="auto" className="line-clamp-2 text-sm font-semibold leading-snug text-pti-green-900">
                {v.title}
              </p>
              <p className="mt-1 text-xs text-slate-500">{formatDate(v.published)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * X posts, best source first:
 *  1. Latest posts from the X API (X_BEARER_TOKEN) — fully automatic.
 *  2. Hand-picked `featuredTweetIds` from lib/site.ts.
 *  3. X's timeline widget, which shows a follow card when X blocks it.
 * Sources 1–2 render server-side with react-tweet: no X script, no login wall.
 */
async function XFeed() {
  const latest = await getLatestTweetIds(4);
  const ids = latest.length > 0 ? latest : featuredTweetIds;
  const tweets = ids.length > 0 ? await getTweets(ids) : [];

  if (tweets.length === 0) return <XTimeline height={560} />;
  return (
    <div data-theme="light" className="max-h-[560px] overflow-y-auto pr-1 [&_article]:!my-0 [&>div+div]:mt-4">
      {tweets.map((t) => (
        <div key={t.id_str}>
          <EmbeddedTweet tweet={t} />
        </div>
      ))}
    </div>
  );
}

async function InstagramFeed() {
  const posts = await getLatestInstagramPosts(6);
  if (posts.length === 0) {
    return <FollowFallback network="instagram" message="Behind-the-scenes moments from the campaign trail." />;
  }
  return (
    <div className="grid grid-cols-3 gap-2">
      {posts.map((p) => (
        <a
          key={p.id}
          href={p.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative aspect-square overflow-hidden rounded-lg bg-slate-100"
        >
          <Image
            src={p.imageUrl}
            alt={p.caption.slice(0, 120) || "Instagram post"}
            fill
            sizes="(min-width: 1024px) 140px, 33vw"
            className="object-cover transition duration-500 group-hover:scale-110"
          />
          <span className="absolute inset-0 bg-pti-green-950/0 transition group-hover:bg-pti-green-950/30" />
        </a>
      ))}
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

const skeleton = <div className="h-72 animate-pulse rounded-xl bg-slate-100" />;

export function MediaCenter() {
  return (
    <section id="media" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Media Center · Live Updates"
          title="Straight from the campaign trail"
          intro="The latest from Chaudhary Aijaz's official channels — updated automatically whenever he posts."
        />

        {/* Channel quick-links */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {(Object.keys(socials) as SocialKey[]).map((key) => {
            const Icon = socialIcons[key];
            return (
              <a
                key={key}
                href={socials[key].url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-pti-green-900 shadow-sm transition hover:-translate-y-0.5 hover:border-gold-400 hover:shadow-md"
              >
                <Icon width={18} height={18} />
                {socials[key].label}
              </a>
            );
          })}
        </div>

        {/* Masonry-style wall: YouTube leads full-width, then FB / X / IG columns */}
        <div className="grid gap-6">
          <FeedCard network="youtube" title="Latest Videos">
            <Suspense fallback={skeleton}>
              <YouTubeFeed />
            </Suspense>
          </FeedCard>

          <div className="grid gap-6 lg:grid-cols-3">
            <FeedCard network="facebook" title="Facebook">
              <FacebookPage height={560} />
            </FeedCard>
            <FeedCard network="x" title="Posts on X">
              <Suspense fallback={skeleton}>
                <XFeed />
              </Suspense>
            </FeedCard>
            <FeedCard network="instagram" title="Instagram">
              <Suspense fallback={skeleton}>
                <InstagramFeed />
              </Suspense>
            </FeedCard>
          </div>
        </div>
      </div>
    </section>
  );
}
