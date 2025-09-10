"use client";

import Link from "@/components/Link";
import { Publications } from "contentlayer/generated";

interface PublicationsPreviewProps {
  publications: Publications[];
}

const MAX_DISPLAY = 3;

export default function PublicationsPreview({
  publications,
}: PublicationsPreviewProps) {
  const displayPublications = publications.slice(0, MAX_DISPLAY);
  const hasMore = publications.length > MAX_DISPLAY;

  const getBadgeWidth = (text: string) => {
    // Calculate width: base width + character count * width per character
    const baseWidth = 20; // base padding and border
    const charWidth = 8; // width per character in pixels
    return Math.max(40, baseWidth + text.length * charWidth); // minimum 40px
  };

  const getTypeConfig = (type: string) => {
    switch (type) {
      case "conference":
        return {
          label: "Conference Proceedings",
          bgColor: "bg-primary-50 dark:bg-primary-900/20",
          textColor: "text-primary-700 dark:text-primary-300",
          borderColor: "border-primary-200 dark:border-primary-700",
        };
      case "lightly-reviewed":
        return {
          label: "Lightly Reviewed",
          bgColor: "bg-gray-50 dark:bg-gray-800",
          textColor: "text-gray-700 dark:text-gray-300",
          borderColor: "border-gray-200 dark:border-gray-600",
        };
      default:
        return {
          label: "Other",
          bgColor: "bg-gray-50 dark:bg-gray-800",
          textColor: "text-gray-700 dark:text-gray-300",
          borderColor: "border-gray-200 dark:border-gray-600",
        };
    }
  };

  const boldMyName = (authorsString: string) => {
    // Split by "Sunggyeol Oh" and add bold formatting
    const parts = authorsString.split("Sunggyeol Oh");
    if (parts.length === 1) {
      // Name not found, return as is
      return authorsString;
    }

    return parts.map((part, index) => (
      <span key={index}>
        {part}
        {index < parts.length - 1 && <strong>Sunggyeol Oh</strong>}
      </span>
    ));
  };

  const renderLinks = (
    links: Array<{ type: string; url: string }> | undefined,
  ) => {
    if (!links || links.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-1">
        {links.map((link: { type: string; url: string }, index: number) => {
          const width = getBadgeWidth(link.type);
          return (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium text-primary-500 border border-primary-500 rounded hover:bg-primary-500 hover:text-white dark:text-primary-400 dark:border-primary-400 dark:hover:bg-primary-400 dark:hover:text-white transition-colors no-underline max-w-full md:max-w-none"
              style={{ width: `${width}px` }}
            >
              {link.type}
            </a>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="space-y-4">
        {displayPublications.map((pub, index) => {
          const typeConfig = getTypeConfig(pub.publicationType);
          return (
            <div
              key={`${pub.title}-${pub.year}`}
              className="border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all duration-200 p-3"
            >
              {/* Paper Type Indicator */}
              <div className="mb-2">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${typeConfig.bgColor} ${typeConfig.textColor} ${typeConfig.borderColor}`}
                >
                  {typeConfig.label}
                </span>
              </div>

              <div className="flex items-start gap-3">
                {/* Left Column - Conference Badge and Links */}
                <div className="flex-shrink-0 w-16 sm:w-16 md:w-11 lg:w-14 ml-2">
                  <div
                    className="bg-primary-500 text-white px-2 py-1 rounded text-xs font-bold mb-2 inline-flex items-center justify-center w-full max-w-full md:w-auto md:max-w-none"
                    style={{
                      width: `${getBadgeWidth(pub.conferenceShort)}px`,
                    }}
                  >
                    {pub.conferenceShort}
                  </div>
                  {renderLinks(pub.links)}
                </div>

                {/* Right Column - Publication Details */}
                <div className="flex-1">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 leading-tight mt-0">
                      {pub.title}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {boldMyName(pub.authors)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                      {pub.conference}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* View All Publications Link */}
      {hasMore && (
        <div className="mt-6 text-center">
          <Link
            href="/publications"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 border border-primary-200 rounded-lg hover:bg-primary-100 hover:text-primary-700 dark:text-primary-400 dark:bg-primary-900/20 dark:border-primary-700 dark:hover:bg-primary-900/30 dark:hover:text-primary-300 transition-colors"
          >
            View all {publications.length} publications
            <svg
              className="ml-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      )}
    </>
  );
}
