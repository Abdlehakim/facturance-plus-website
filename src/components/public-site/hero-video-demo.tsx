"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Play, X } from "lucide-react";

/**
 * The demo trigger that sits over the hero screenshot, and the overlay it
 * opens.
 *
 * The iframe is mounted only while the overlay is open, so the homepage loads
 * nothing from YouTube until someone asks for the video, and closing the
 * overlay unmounts the player rather than hiding it - which is what actually
 * stops playback.
 *
 * The one client component in the hero: the surrounding section stays server
 * rendered.
 */

const VIDEO_ID = "ZPkPCZ_Qsjc";

/**
 * Autoplay is set because the player only ever appears in response to a click,
 * never on load. nocookie is YouTube's privacy-enhanced host, and rel=0 keeps
 * the end screen to this channel.
 */
const EMBED_URL = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`;

export function HeroVideoDemo({
  /**
   * Position of the trigger inside its nearest positioned ancestor. The hero
   * places it over the monitor on desktop and over the in-flow image on
   * smaller screens, so the coordinates belong to the caller.
   */
  triggerClassName = "left-1/2 top-[38%]",
}: {
  triggerClassName?: string;
} = {}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);

  const close = React.useCallback(() => {
    setIsOpen(false);
    // Back to the control that opened it, so keyboard focus is not lost.
    triggerRef.current?.focus();
  }, []);

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    // Restores whatever the page had, and runs on unmount too, so the document
    // can never be left unscrollable.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close]);

  React.useEffect(() => {
    if (isOpen) {
      closeRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Voir la présentation vidéo de Facturance Plus"
        className={`group absolute z-20 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center gap-3 rounded-2xl p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b3763] ${triggerClassName}`}
      >
        <span className="grid size-14 place-items-center rounded-full bg-white/95 text-[#0b294d] shadow-[0_10px_28px_rgba(2,18,39,0.42)] ring-1 ring-white/60 transition group-hover:scale-105 group-hover:bg-white motion-reduce:transition-none motion-reduce:group-hover:scale-100 sm:size-16">
          <Play className="ml-0.5 size-6 fill-current" aria-hidden="true" />
        </span>

        <span className="whitespace-nowrap rounded-full bg-[#082b50]/90 px-4 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur sm:text-sm">
          Voir Facturance Plus en 1 minute
        </span>
      </button>

      {isOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Présentation vidéo de Facturance Plus"
            className="fixed inset-0 z-[100] grid place-items-center p-4"
          >
            {/* Sibling rather than parent, so a click on the player never
                reaches this handler and only the backdrop closes. */}
            <div
              onClick={close}
              aria-hidden="true"
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Height-driven so the 9:16 of the Short is never cropped: the
                smallest of 90% of the viewport height, the height that keeps
                the width within 90vw, and a desktop ceiling. */}
            <div className="relative z-10 aspect-[9/16] h-[min(90vh,160vw,764px)] w-auto">
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Fermer la vidéo"
                /* Anchored to the player, not the overlay: beside its
                   upper-right corner once there is room alongside it, and
                   stacked just above that same corner on narrow screens,
                   where the player already takes nearly the full width. */
                className="absolute -top-3 right-0 z-10 grid size-10 -translate-y-full place-items-center rounded-full bg-white/95 text-[#0b294d] shadow-lg transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent motion-reduce:transition-none sm:left-full sm:right-auto sm:top-0 sm:ml-3 sm:translate-y-0"
              >
                <X className="size-5" aria-hidden="true" />
              </button>

              <iframe
                src={EMBED_URL}
                title="Présentation de Facturance Plus"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="size-full rounded-2xl border border-white/15 bg-black shadow-2xl shadow-slate-950/50"
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
