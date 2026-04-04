"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { News } from "contentlayer/generated";

interface NewsPreviewProps {
  news: News[];
}

export default function NewsPreview({ news }: NewsPreviewProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScroll, setCanScroll] = useState(false);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      timeZone: "UTC",
    });
  };

  const updateScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const maxScroll = scrollHeight - clientHeight;
    setCanScroll(maxScroll > 0);
    setScrollProgress(maxScroll > 0 ? scrollTop / maxScroll : 0);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScroll();
    el.addEventListener("scroll", updateScroll, { passive: true });
    return () => el.removeEventListener("scroll", updateScroll);
  }, [updateScroll, news]);

  const showTopFade = scrollProgress > 0.05;
  const showBottomFade = scrollProgress < 0.95 && canScroll;

  return (
    <div className="relative flex gap-4">
      {/* Scroll container */}
      <div className="relative flex-1 min-w-0">
        {showTopFade && (
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white dark:from-gray-950 z-10" />
        )}

        <div
          ref={scrollRef}
          className="max-h-[220px] overflow-y-auto space-y-0 scrollbar-hide"
        >
          {news.map((item, index) => (
            <div
              key={`${item.slug}-${index}`}
              className="flex items-start gap-4 py-2.5 border-l-2 border-gray-200 dark:border-gray-700 pl-4 relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[5px] top-4 w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400 ring-2 ring-white dark:ring-gray-950" />

              {/* Date badge */}
              <span className="flex-shrink-0 text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40 px-2 py-0.5 rounded-md whitespace-nowrap mt-0.5">
                {formatDate(item.date)}
              </span>

              {/* Content */}
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {item.content}
              </p>
            </div>
          ))}
        </div>

        {showBottomFade && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white dark:from-gray-950 z-10" />
        )}
      </div>

      {/* Scroll track */}
      {canScroll && (
        <div className="flex-shrink-0 w-1 rounded-full bg-gray-100 dark:bg-gray-800 self-stretch relative">
          <div
            className="absolute w-full rounded-full bg-gray-400 dark:bg-gray-500 transition-[top] duration-100 ease-out"
            style={{
              height: "30%",
              top: `${scrollProgress * 70}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}
