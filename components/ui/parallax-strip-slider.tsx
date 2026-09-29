// Built using Hyperiux Vault: https://vault.hyperiux.com
"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

/* Inline stand-in for @gsap/react's useGSAP. Mirrors its default
   `revertOnUpdate: false`: one gsap.context lives for the component's
   lifetime, the callback is re-added when dependencies change, and the
   context is reverted only on unmount. Reverting on every dependency
   change (the naive version) rolls finished tweens back to their start
   state — which is what snapped the progress bar to slide 1 mid-sequence.
   Covers both call shapes used below — plain effect, and one that returns
   its own cleanup. */
function useGSAP(
  callback: () => void | (() => void),
  options?: {
    dependencies?: unknown[];
    scope?: { current: Element | null } | Element | null;
  }
) {
  const deps = options?.dependencies ?? [];
  const scope = options?.scope;
  const ctxRef = useRef<gsap.Context | null>(null);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  useLayoutEffect(() => {
    const el =
      scope && typeof scope === "object" && "current" in scope
        ? scope.current
        : (scope as Element | null);
    ctxRef.current = gsap.context(() => {}, el ?? undefined);
    return () => {
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (!ctxRef.current) return;
    cleanupRef.current?.();
    const ret = ctxRef.current.add(callback);
    cleanupRef.current = typeof ret === "function" ? ret : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

if (typeof window !== "undefined") {
  try {
    gsap.registerPlugin(SplitText);
  } catch (err) {
    console.warn("GSAP SplitText plugin registration:", err);
  }
}

// Animation timing
const STRIP_COUNT = 10;
const REVEAL_DURATION = 0.5;
const STRIP_STAGGER = 0.04;
const ZOOM_DURATION = 0.9;
const ZOOM_FROM = 1.2;
const AUTOPLAY_INTERVAL = 5000;
const TITLE_CHAR_DURATION = 0.6;
const TITLE_CHAR_STAGGER = 0.04;
const TITLE_CHAR_Y_PERCENT = 100;
const PROGRESS_DURATION = 0.9;

export type Slide = {
  src: string;
  title: string;
  chapter?: string;
  category?: string;
  subtitle?: string;
  description?: string;
  tags?: string[];
  githubUrl?: string;
  actionText?: string;
  onAction?: () => void;
  bullets?: string[];
  badges?: string[];
};

export type ParallaxStripSliderProps = {
  /** Slides to cycle through. Defaults to a built-in sample set. */
  slides?: Slide[];
  className?: string;
  /** Number of vertical strips in the wipe reveal. */
  stripCount?: number;
  /** Duration of each strip's clip-path wipe, in seconds. */
  revealDuration?: number;
  /** Delay between consecutive strips, in seconds. */
  stripStagger?: number;
  /** Starting scale of the incoming image (Ken-Burns zoom). */
  zoomFrom?: number;
  /** Duration of the image zoom settle, in seconds. */
  zoomDuration?: number;
  /** Auto-advance slides on a timer. */
  autoplay?: boolean;
  /** Show the top progress bar. */
  showProgressBar?: boolean;
  /** Show the numeric slide counter. */
  showCounter?: boolean;
  /** Enable the click-to-navigate overlay and its circular cursor (left half = prev, right half = next). */
  showControls?: boolean;
  /** Color of the progress bar fill, caption text, and control borders. */
  accentColor?: string;
  /** Slider background, seen behind the images. */
  backgroundColor?: string;
  /** Optional callback when active slide changes */
  onSlideChange?: (index: number) => void;
  /** Optional active index controller from external navigation */
  activeSlideIndex?: number;
};

const R2 =
  "https://pub-8abee449136941f5b0a1cd2c014534e9.r2.dev/vault-listing-images/assets-images/strip-paralax-slider";

const DEFAULT_SLIDES: Slide[] = [
  {
    src: `${R2}/img01.png`,
    title: "Fire",
    chapter: "Collection 01",
  },
  {
    src: `${R2}/img02.png`,
    title: "Allure",
    chapter: "Collection 02",
  },
  {
    src: `${R2}/img03.png`,
    title: "Ember",
    chapter: "Collection 03",
  },
];

type TransitionDirection = "next" | "prev";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false)
  );
}

export default function ParallaxStripSlider({
  slides = DEFAULT_SLIDES,
  className = "",
  stripCount = STRIP_COUNT,
  revealDuration = REVEAL_DURATION,
  stripStagger = STRIP_STAGGER,
  zoomFrom = ZOOM_FROM,
  zoomDuration = ZOOM_DURATION,
  autoplay = false,
  showProgressBar = true,
  showCounter = true,
  showControls = true,
  accentColor = "#ffffff",
  backgroundColor = "#000000",
  onSlideChange,
  activeSlideIndex,
}: ParallaxStripSliderProps) {
  const [current, setCurrent] = useState(0);
  const [incoming, setIncoming] = useState<number | null>(null);
  const [caption, setCaption] = useState(0);
  const [direction, setDirection] = useState<TransitionDirection>("next");
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const chapterRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const counterNumRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const stripsRef = useRef<HTMLDivElement[]>([]);
  const zoomRef = useRef<HTMLDivElement[]>([]);
  const isAnimating = useRef(false);
  const isFirstCaption = useRef(true);
  const splitRef = useRef<SplitText | null>(null);

  // Circular click-to-navigate cursor.
  const cursorRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const isInside = useRef(false);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  const total = slides.length;

  // Sync external activeSlideIndex if provided
  useEffect(() => {
    if (
      typeof activeSlideIndex === "number" &&
      activeSlideIndex !== current &&
      activeSlideIndex >= 0 &&
      activeSlideIndex < total
    ) {
      goTo(activeSlideIndex, activeSlideIndex > current ? "next" : "prev");
    }
  }, [activeSlideIndex]);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setIsCoarsePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Load the display serif once
  useEffect(() => {
    const id = "hpx-instrument-serif";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap";
    document.head.appendChild(link);
  }, []);

  const goTo = useCallback(
    (next: number, transitionDirection: TransitionDirection) => {
      if (isAnimating.current || next === current || total < 2) return;
      isAnimating.current = true;
      setDirection(transitionDirection);
      setIncoming(next);
      onSlideChange?.(next);
    },
    [current, total, onSlideChange]
  );

  const onNext = useCallback(
    () => goTo((current + 1) % total, "next"),
    [current, total, goTo]
  );
  const onPrev = useCallback(
    () => goTo((current - 1 + total) % total, "prev"),
    [current, total, goTo]
  );

  // Auto-advance on a timer
  useEffect(() => {
    if (!autoplay || total < 2) return;
    if (typeof window !== "undefined" && prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      if (!isAnimating.current) onNext();
    }, AUTOPLAY_INTERVAL);
    return () => window.clearInterval(id);
  }, [autoplay, total, onNext]);

  // Wipe + zoom + progress on slide change.
  useGSAP(
    () => {
      if (incoming === null) return;

      const strips = stripsRef.current.slice(0, stripCount).filter(Boolean);
      const zooms = zoomRef.current.slice(0, stripCount).filter(Boolean);
      if (!strips.length) return;
      const isPrevious = direction === "prev";
      const orderedStrips = isPrevious ? [...strips].reverse() : strips;

      // Reduced motion: swap without the reveal.
      if (prefersReducedMotion()) {
        setCaption(incoming);
        setCurrent(incoming);
        setIncoming(null);
        isAnimating.current = false;
        return;
      }

      const settle = () => {
        setCaption(incoming);
        setCurrent(incoming);
        setIncoming(null);
        isAnimating.current = false;
      };

      const tl = gsap.timeline({ onComplete: settle });

      // Reverse stagger + clip origin when moving backward.
      tl.fromTo(
        orderedStrips,
        { clipPath: isPrevious ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" },
        {
          clipPath: isPrevious ? "inset(0 0 0 0%)" : "inset(0 0% 0 0)",
          duration: revealDuration,
          ease: "power3.out",
          stagger: stripStagger,
        },
        0
      );

      tl.fromTo(
        zooms,
        { scale: zoomFrom },
        {
          scale: 1,
          duration: zoomDuration,
          ease: "power3.out",
        },
        0
      );

      // Bar slides toward the incoming fill.
      if (progressRef.current) {
        tl.to(
          progressRef.current,
          {
            scaleX: (incoming + 1) / total,
            duration: PROGRESS_DURATION,
            ease: "power3.inOut",
          },
          0
        );
      }

      // Outgoing caption texts fade out under the strips.
      const outgoing = [
        captionRef.current,
        titleRef.current,
        counterRef.current,
      ].filter(Boolean);
      if (outgoing.length) {
        tl.to(
          outgoing,
          {
            autoAlpha: 0,
            y: -2,
            duration: 0.35,
            ease: "power2.in",
          },
          0.15
        );
        tl.add(() => setCaption(incoming), 0.5);
      }
    },
    {
      dependencies: [
        incoming,
        direction,
        stripCount,
        revealDuration,
        stripStagger,
        zoomFrom,
        zoomDuration,
      ],
      scope: rootRef,
    }
  );

  // Revert the split before React commits the new title.
  useLayoutEffect(() => {
    splitRef.current?.revert();
    splitRef.current = null;
  }, [caption]);

  // Incoming caption reveal: title chars, chapter fade, counter number.
  useGSAP(
    () => {
      if (isFirstCaption.current) {
        isFirstCaption.current = false;
        return;
      }
      if (!captionRef.current || !titleRef.current) return;

      // Snap back what the outgoing tween hid.
      gsap.set([captionRef.current, titleRef.current], { autoAlpha: 1, y: 0 });

      if (prefersReducedMotion()) {
        gsap.set(
          [
            chapterRef.current,
            titleRef.current,
            counterRef.current,
            counterNumRef.current,
          ],
          { autoAlpha: 1, y: 0, yPercent: 0 }
        );
        return;
      }

      try {
        const split = new SplitText(titleRef.current, { type: "chars" });
        splitRef.current = split;

        const tl = gsap.timeline({
          onComplete: () => {
            split.revert();
            if (splitRef.current === split) splitRef.current = null;
          },
        });

        // Title: char stagger up from below the clip.
        tl.from(
          split.chars,
          {
            yPercent: TITLE_CHAR_Y_PERCENT,
            duration: TITLE_CHAR_DURATION,
            ease: "power2.out",
            stagger: TITLE_CHAR_STAGGER,
          },
          0
        );
      } catch (e) {
        // Fallback if SplitText is unavailable
        gsap.from(titleRef.current, {
          opacity: 0,
          y: 20,
          duration: TITLE_CHAR_DURATION,
          ease: "power2.out",
        });
      }

      // Chapter: fade only.
      if (chapterRef.current) {
        tlChapter();
      }

      function tlChapter() {
        if (!chapterRef.current) return;
        gsap.fromTo(
          chapterRef.current,
          { autoAlpha: 0, y: 0 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
      }

      // Counter: fade block, lift just the number.
      if (counterRef.current) {
        gsap.fromTo(
          counterRef.current,
          { autoAlpha: 0, y: 0 },
          { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" }
        );
      }
      if (counterNumRef.current) {
        gsap.from(counterNumRef.current, {
          yPercent: 110,
          duration: 0.55,
          ease: "power3.out",
        });
      }
    },
    { dependencies: [caption], scope: rootRef }
  );

  // Drop the last live split on unmount.
  useGSAP(
    () => () => {
      splitRef.current?.revert();
      splitRef.current = null;
    },
    { scope: rootRef }
  );

  // Circular cursor: smooth follow + arrow that flips with the pointer side.
  useEffect(() => {
    if (!showControls || isCoarsePointer) return;
    const cursor = cursorRef.current;
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    if (!cursor || !l1 || !l2) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.6 });
    gsap.set(l1, {
      transformOrigin: "100% 50%",
      xPercent: -50,
      yPercent: -50,
      y: -1.5,
      rotation: 45,
      x: 0,
    });
    gsap.set(l2, {
      transformOrigin: "100% 50%",
      xPercent: -50,
      yPercent: -50,
      y: 1.5,
      rotation: -45,
      x: 0,
    });

    let currentSide: "left" | "right" = "right";
    let rafId: number | null = null;

    const handleMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const target = e.target instanceof Element ? e.target : null;
      const isOverControls = Boolean(
        target?.closest(
          'button, input, textarea, select, a, label, [role="button"], [contenteditable="true"], [class*="interactive-layer"]'
        )
      );

      mouse.current.x = x;
      mouse.current.y = y;

      const rect = rootRef.current?.getBoundingClientRect();
      const isOut =
        !rect ||
        x <= rect.left ||
        y <= rect.top ||
        x >= rect.right ||
        y >= rect.bottom;

      if (isOut || isOverControls) {
        if (isInside.current) {
          isInside.current = false;
          gsap.to(cursor, {
            opacity: 0,
            scale: 0.6,
            duration: 0.25,
            ease: "power3.inOut",
          });
        }
        return;
      }

      if (!isInside.current) {
        pos.current.x = x;
        pos.current.y = y;
        gsap.set(cursor, { x, y });
        gsap.to(cursor, {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          ease: "power3.out",
        });
        isInside.current = true;
      }

      const isLeft = rect ? x < rect.left + rect.width / 2 : false;
      const nextSide = isLeft ? "left" : "right";

      if (nextSide !== currentSide) {
        currentSide = nextSide;
        if (nextSide === "left") {
          gsap.to(l1, {
            rotation: 135,
            x: "-1vw",
            duration: 0.35,
            ease: "power3.inOut",
          });
          gsap.to(l2, {
            rotation: -135,
            x: "-1vw",
            duration: 0.35,
            ease: "power3.inOut",
          });
        } else {
          gsap.to(l1, {
            rotation: 45,
            x: 4,
            duration: 0.35,
            ease: "power3.inOut",
          });
          gsap.to(l2, {
            rotation: -45,
            x: 4,
            duration: 0.35,
            ease: "power3.inOut",
          });
        }
      }
    };

    const render = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.12;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.12;
      gsap.set(cursor, { x: pos.current.x, y: pos.current.y });
      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", handleMove);
    render();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [showControls, isCoarsePointer]);

  const renderStrips = (slide: Slide) => {
    const width = 100 / stripCount;

    return Array.from({ length: stripCount }, (_, i) => (
      <div
        key={i}
        ref={(el) => {
          if (el) stripsRef.current[i] = el;
        }}
        className="absolute inset-y-0 overflow-hidden"
        style={{
          left: `${i * width}%`,
          width: `${width}%`,
          marginLeft: i === 0 ? 0 : "-0.5px",
          paddingLeft: i === 0 ? 0 : "0.5px",
        }}
      >
        <div
          className="absolute inset-y-0"
          style={{
            left: `-${i * 100}%`,
            width: `${stripCount * 100}%`,
          }}
        >
          <div
            ref={(el) => {
              if (el) zoomRef.current[i] = el;
            }}
            className="relative h-full w-full will-change-transform"
          >
            <img
              src={slide.src}
              alt=""
              draggable={false}
              className="absolute inset-0 h-full w-full select-none object-cover"
            />
          </div>
        </div>
      </div>
    ));
  };

  const activeSlide = slides[caption];
  const stacked = isCoarsePointer;

  return (
    <div
      ref={rootRef}
      style={{ backgroundColor }}
      className={`parallax-strip-slider relative h-full w-full overflow-hidden select-none ${className}`}
    >
      {/* Outgoing slide */}
      <div className="absolute inset-0">
        <img
          src={slides[current].src}
          alt={slides[current].title}
          draggable={false}
          className="absolute inset-0 h-full w-full select-none object-cover"
        />
        {/* Soft cinematic vignette / contrast overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60 pointer-events-none" />
      </div>

      {/* Incoming slide */}
      {incoming !== null && (
        <div className="absolute inset-0">
          {renderStrips(slides[incoming])}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60 pointer-events-none" />
        </div>
      )}

      {/* Click-to-navigate overlay: left half steps back, right half advances. */}
      {showControls && total > 1 && (
        <div
          className="absolute inset-0 z-20"
          style={{ cursor: stacked ? "pointer" : "none" }}
          onClick={(e) => {
            if (isAnimating.current) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const isLeft = e.clientX < rect.left + rect.width / 2;
            if (isLeft) onPrev();
            else onNext();
          }}
        />
      )}

      {/* Top progress bar */}
      {showProgressBar && (
        <div
          className="pointer-events-none absolute inset-x-6 top-6 z-30 h-1 sm:inset-x-10 sm:top-8 rounded-full overflow-hidden"
          style={{ backgroundColor: `${accentColor}25` }}
        >
          <div
            ref={progressRef}
            className="h-full w-full origin-left transition-transform duration-300"
            style={{
              transform: `scaleX(${(caption + 1) / total})`,
              backgroundColor: accentColor,
            }}
          />
        </div>
      )}

      {/* Top-left label & chapter */}
      <div
        ref={captionRef}
        className="pointer-events-none absolute inset-x-0 top-0 z-30 px-6 pt-10 sm:px-10 sm:pt-14 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span
            ref={chapterRef}
            className="text-xs uppercase tracking-[0.25em] font-mono px-2.5 py-1 rounded bg-black/40 backdrop-blur-md border border-white/10"
            style={{ color: accentColor }}
          >
            {activeSlide.chapter ??
              `Chapter ${String(caption + 1).padStart(2, "0")}`}
          </span>
          {activeSlide.category && (
            <span className="text-xs font-mono tracking-wider text-white/60 hidden sm:inline-block">
              &bull; {activeSlide.category}
            </span>
          )}
        </div>

        {/* Swipe / Click hint */}
        <div className="text-[11px] font-mono tracking-widest text-white/50 uppercase hidden md:flex items-center gap-2">
          <span>&larr; Click Left to Back</span>
          <span className="text-white/30">|</span>
          <span>Click Right to Advance &rarr;</span>
        </div>
      </div>

      {/* Bottom bar & rich slide description */}
      <div
        className={`absolute inset-x-0 bottom-0 z-30 flex flex-col justify-end px-6 pb-8 sm:px-10 sm:pb-10 pointer-events-none`}
      >
        {/* Rich partition metadata card for portfolio details */}
        {(activeSlide.subtitle || activeSlide.description || activeSlide.bullets || activeSlide.tags) && (
          <div className="pointer-events-auto max-w-2xl mb-4 bg-black/55 backdrop-blur-xl border border-white/15 rounded-2xl p-5 sm:p-6 shadow-2xl transition-all duration-300">
            {activeSlide.subtitle && (
              <p className="text-xs sm:text-sm font-mono tracking-widest text-emerald-400 uppercase mb-1.5 flex items-center gap-2">
                <span className="inline-block size-2 rounded-full bg-emerald-400 animate-pulse" />
                {activeSlide.subtitle}
              </p>
            )}

            {activeSlide.description && (
              <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-normal mb-3">
                {activeSlide.description}
              </p>
            )}

            {activeSlide.bullets && activeSlide.bullets.length > 0 && (
              <ul className="space-y-1.5 mb-3.5">
                {activeSlide.bullets.map((b, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-stone-300 flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">&bull;</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Badges / Tech Tags */}
            {activeSlide.tags && activeSlide.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeSlide.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/90 border border-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Interactive Actions (e.g. GitHub URL or Action button) */}
            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-white/10">
              {activeSlide.githubUrl && (
                <a
                  href={activeSlide.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-layer inline-flex items-center gap-1.5 text-xs font-mono font-medium px-3.5 py-1.5 rounded-lg bg-white text-black hover:bg-stone-200 transition-colors shadow"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>View Repository</span>
                </a>
              )}

              {activeSlide.actionText && activeSlide.onAction && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    activeSlide.onAction?.();
                  }}
                  className="interactive-layer inline-flex items-center gap-1.5 text-xs font-mono font-medium px-3.5 py-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow"
                >
                  <span>{activeSlide.actionText}</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Title + Slide Counter Header */}
        <div
          className={`flex items-end justify-between ${
            stacked ? "flex-col items-stretch gap-3" : "flex-row"
          }`}
        >
          <h2
            ref={titleRef}
            className="pointer-events-none text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white drop-shadow-md"
            style={{
              fontFamily: '"Instrument Serif", Georgia, serif',
              color: accentColor,
            }}
          >
            {activeSlide.title}
          </h2>

          {showCounter && (
            <span
              ref={counterRef}
              className={`pointer-events-none flex shrink-0 items-center text-sm font-mono ${
                stacked
                  ? "w-full justify-end"
                  : "justify-end pb-2"
              }`}
              style={{ color: `${accentColor}cc` }}
            >
              <span className="inline-block w-[2.5ch] overflow-hidden text-right font-bold text-white text-base">
                <span ref={counterNumRef} className="inline-block">
                  {String(caption + 1).padStart(2, "0")}
                </span>
              </span>
              <span className="text-white/50 text-xs ml-1">/ {String(total).padStart(2, "0")}</span>
            </span>
          )}
        </div>
      </div>

      {/* Circular nav cursor */}
      {showControls && total > 1 && !isCoarsePointer && (
        <div
          ref={cursorRef}
          className="pointer-events-none fixed left-0 top-0 z-[100]"
        >
          <div
            className="flex size-14 items-center justify-center rounded-full shadow-2xl backdrop-blur-md"
            style={{ backgroundColor: accentColor }}
          >
            <div className="relative size-6">
              <span
                ref={line1Ref}
                className="absolute left-1/2 top-1/2 h-0.5 w-3.5"
                style={{ backgroundColor: "#000000" }}
              />
              <span
                ref={line2Ref}
                className="absolute left-1/2 top-1/2 h-0.5 w-3.5"
                style={{ backgroundColor: "#000000" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
