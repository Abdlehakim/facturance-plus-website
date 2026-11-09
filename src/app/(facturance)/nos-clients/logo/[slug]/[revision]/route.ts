import { resolveApiBaseUrl } from "@/lib/showcase-api";

export const dynamic = "force-dynamic";
const headers = {
  "Cache-Control": "no-store, max-age=0",
  "X-Content-Type-Options": "nosniff",
  "Content-Security-Policy": "default-src 'none'; sandbox",
};

/** Every image request reaches the live consent/revision gate. No optimizer/cache. */
export async function GET(_request: Request, { params }: {
  params: Promise<{ slug: string; revision: string }>;
}) {
  const { slug, revision } = await params;
  const missing = () => new Response(null, { status: 404, headers });
  if (slug.length > 120 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(revision)) return missing();
  const base = resolveApiBaseUrl();
  if (!base) return missing();
  try {
    const response = await fetch(`${base}/public/showcase/${slug}/logo/${revision}`, {
      cache: "no-store", redirect: "error", signal: AbortSignal.timeout(6000), headers: { Accept: "image/webp" },
    });
    if (!response.ok || response.headers.get("content-type")?.split(";")[0] !== "image/webp" || !response.body) return missing();
    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 262144) { await reader.cancel(); return missing(); }
      chunks.push(value);
    }
    const bytes = Buffer.concat(chunks);
    if (bytes.length < 12 || bytes.toString("ascii", 0, 4) !== "RIFF" || bytes.toString("ascii", 8, 12) !== "WEBP") return missing();
    return new Response(bytes, { headers: { ...headers, "Content-Type": "image/webp", "Content-Length": String(bytes.length) } });
  } catch { return missing(); }
}
