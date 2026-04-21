import { News } from "contentlayer/generated";

interface NewsPreviewProps {
  news: News[];
  maxVisible?: number;
}

export default function NewsPreview({
  news,
  maxVisible = 5,
}: NewsPreviewProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      timeZone: "UTC",
    });
  };

  const needsScroll = news.length > maxVisible;

  return (
    <div
      className={
        needsScroll ? "max-h-[280px] overflow-y-auto custom-scrollbar" : ""
      }
    >
      <div className="space-y-0">
        {news.map((item, index) => (
          <div
            key={`${item.slug}-${index}`}
            className="flex items-start gap-4 py-2.5"
          >
            <span className="flex-shrink-0 text-xs font-medium tabular-nums text-primary-500 dark:text-primary-400 whitespace-nowrap mt-0.5 w-20">
              {formatDate(item.date)}
            </span>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
