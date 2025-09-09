"use client";

import { useState } from "react";
import { Publications } from "contentlayer/generated";

interface PublicationsClientProps {
  publications: Publications[];
}

export default function PublicationsClient({
  publications,
}: PublicationsClientProps) {
  const [filter, setFilter] = useState("all");

  const getBadgeWidth = (text) => {
    // Calculate width: base width + character count * width per character
    const baseWidth = 20; // base padding and border
    const charWidth = 8; // width per character in pixels
    return Math.max(40, baseWidth + text.length * charWidth); // minimum 40px
  };

  const getTypeConfig = (type) => {
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

  const boldMyName = (authorsString) => {
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

  const renderLinks = (links) => {
    if (!links || links.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-1">
        {links.map((link, index) => {
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

  const filteredPublications = publications.filter((pub) => {
    if (filter === "all") return true;
    return pub.publicationType === filter;
  });

  const filterButtons = [
    { key: "all", label: "All Publications", count: publications.length },
    {
      key: "conference",
      label: "Conference Proceedings",
      count: publications.filter((p) => p.publicationType === "conference")
        .length,
    },
    {
      key: "lightly-reviewed",
      label: "Lightly Reviewed",
      count: publications.filter(
        (p) => p.publicationType === "lightly-reviewed",
      ).length,
    },
  ];

  return (
    <>
      {/* Filter Buttons */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          {filterButtons.map((button) => (
            <button
              key={button.key}
              onClick={() => setFilter(button.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                filter === button.key
                  ? "bg-primary-500 text-white border-primary-500"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {button.label}
              <span className="ml-1.5 text-xs opacity-75">
                ({button.count})
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredPublications.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No publications found for the selected filter.
            </p>
          </div>
        ) : (
          filteredPublications.map((pub, index) => {
            const typeConfig = getTypeConfig(pub.publicationType);
            return (
              <div
                key={`${pub.title}-${pub.year}`} // Better key for filtering animations
                className="border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all duration-200 p-3 animate-in fade-in slide-in-from-bottom-4"
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
          })
        )}
      </div>
    </>
  );
}
