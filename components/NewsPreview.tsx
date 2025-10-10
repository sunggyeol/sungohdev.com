"use client";

import { News } from "contentlayer/generated";

interface NewsPreviewProps {
  news: News[];
}

export default function NewsPreview({ news }: NewsPreviewProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    // Use UTC methods to avoid timezone issues
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      timeZone: "UTC",
    });
  };

  const hasScroll = news.length >= 4;

  return (
    <div
      className={`space-y-3 ${hasScroll ? "max-h-[160px] overflow-y-auto pr-2 custom-scrollbar" : ""}`}
    >
      {news.map((item, index) => (
        <div key={`${item.slug}-${index}`} className="flex items-start">
          {/* Date */}
          <div className="flex-shrink-0 w-36">
            <span className="text-sm font-bold text-primary-600 dark:text-primary-400 whitespace-nowrap">
              {formatDate(item.date)}
            </span>
          </div>

          {/* News Content */}
          <div className="flex-1">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {item.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
