"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";

/** Fixed geometry, contain-fit, decorative next to the company name. */
export function DirectoryCompanyLogo({ src }: { src: string | null | undefined }) {
  const [failed, setFailed] = useState(false);
  const safe = typeof src === "string" && /^\/nos-clients\/logo\/[a-z0-9]+(?:-[a-z0-9]+)*\/[0-9a-f-]{36}$/i.test(src);
  return <span aria-hidden="true" className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl border bg-white text-[#0b294d]/60">
    {safe && !failed ? (
      // Controlled live endpoint: Next image optimization would cache withdrawn assets.
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src!} width={56} height={56} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer"
        className="size-full object-contain p-1.5" onError={() => setFailed(true)} />
    ) : <Building2 className="size-5" />}
  </span>;
}
