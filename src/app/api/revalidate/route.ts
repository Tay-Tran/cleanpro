import { revalidatePath } from "next/cache";
import { after, type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

// Every public page reads CMS content, so all of them are refreshed on publish.
const SITE_PAGES = ["/", "/privacy", "/terms"];

// Called by a Sanity webhook whenever content is published,
// so the live site updates within seconds instead of waiting for the cache to expire.
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "SANITY_REVALIDATE_SECRET is not set" }, { status: 500 });
  }

  const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret);
  if (!isValidSignature) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  revalidatePath("/", "layout");

  // revalidatePath only marks pages as stale: the first visitor afterwards would still
  // get the old version while the new one is built. Requesting each page once here
  // triggers that rebuild right away, so the first real visitor already sees the update.
  after(async () => {
    const origin = req.nextUrl.origin;
    await Promise.allSettled(SITE_PAGES.map((path) => fetch(new URL(path, origin), { cache: "no-store" })));
  });

  return NextResponse.json({ revalidated: true, type: body?._type ?? null });
}
