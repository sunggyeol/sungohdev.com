import Link from "@/components/Link";
import { News } from "contentlayer/generated";

interface NewsPreviewProps {
  news: News[];
  // Omit to render the full list (used by the /news page).
  maxDisplay?: number;
  // Sidebar variant: shrinks the type only once the column narrows at xl.
  // Mobile keeps full-size text since the list runs full width there.
  compact?: boolean;
}

export function formatNewsDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}

export default function NewsPreview({
  news,
  maxDisplay,
  compact = false,
}: NewsPreviewProps) {
  const displayNews = maxDisplay ? news.slice(0, maxDisplay) : news;
  const hasMore = maxDisplay !== undefined && news.length > maxDisplay;

  return (
    <>
      <div className="space-y-4">
        {displayNews.map((item, index) => (
          <div key={`${item.slug}-${index}`}>
            <p
              className={`text-sm leading-relaxed text-gray-700 ${compact ? "lg:text-xs" : ""}`}
            >
              {item.content}
              {item.flag && (
                // Trailing, and non-breaking so the flag never wraps alone onto
                // a line of its own. aria-hidden because the sentence already
                // names the place — a screen reader saying "flag: Spain" after
                // "Barcelona, Spain" is just noise.
                <span aria-hidden="true">
                  {" "}
                  {item.flag}
                </span>
              )}
            </p>
            <span
              className={`mt-0.5 block text-xs font-medium tabular-nums text-gray-400 ${compact ? "lg:text-[11px]" : ""}`}
            >
              {formatNewsDate(item.date)}
            </span>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-5">
          <Link
            href="/news"
            className={`text-sm font-medium text-primary-500 hover:text-primary-600 ${compact ? "lg:text-xs" : ""}`}
          >
            See more &rarr;
          </Link>
        </div>
      )}
    </>
  );
}
