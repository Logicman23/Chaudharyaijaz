import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

/**
 * Instant refresh for the social feeds.
 *
 * The feeds already refresh themselves every few minutes. Point a Zapier/Make
 * "new post" trigger (or YouTube's PubSubHubbub push) at
 *   POST /api/revalidate?tag=youtube   (or instagram / social)
 * with header `x-revalidate-secret: $REVALIDATE_SECRET` to update immediately.
 */
const ALLOWED_TAGS = new Set(["social", "youtube", "instagram"]);

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || request.headers.get("x-revalidate-secret") !== secret) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const tag = request.nextUrl.searchParams.get("tag") ?? "social";
  if (!ALLOWED_TAGS.has(tag)) {
    return Response.json({ ok: false, error: "Unknown tag" }, { status: 400 });
  }

  revalidateTag(tag, "max");
  return Response.json({ ok: true, revalidated: tag });
}
