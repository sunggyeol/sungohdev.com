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

  const boldMyName = (authorsString: string) => {
    const parts = authorsString.split("Sunggyeol Oh");
    if (parts.length === 1) return authorsString;

    return parts.map((part, index) => (
      <span key={index}>
        {part}
        {index < parts.length - 1 && <strong>Sunggyeol Oh</strong>}
      </span>
    ));
  };

  const getDoiUrl = (
    links: Array<{ type: string; url: string }> | undefined,
  ) => {
    if (!links) return null;
    const doi = links.find((l) => l.type === "DOI");
    return doi?.url ?? null;
  };

  const filteredPublications = publications.filter((pub) => {
    if (filter === "all") return true;
    return pub.publicationType === filter;
  });

  // Group by year, maintaining existing sort order within each year
  const groupedByYear: Record<string, Publications[]> = {};
  for (const pub of filteredPublications) {
    if (!groupedByYear[pub.year]) {
      groupedByYear[pub.year] = [];
    }
    groupedByYear[pub.year].push(pub);
  }
  const sortedYears = Object.keys(groupedByYear).sort(
    (a, b) => parseInt(b) - parseInt(a),
  );

  const filters = [
    { key: "all", label: "All", count: publications.length },
    {
      key: "conference",
      label: "Conference",
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
      {/* Filters */}
      <div className="mb-8 flex items-center gap-1 text-sm">
        {filters.map((f, i) => (
          <span key={f.key} className="flex items-center gap-1">
            {i > 0 && (
              <span className="text-gray-300 dark:text-gray-600 mx-1">/</span>
            )}
            <button
              onClick={() => setFilter(f.key)}
              className={
                filter === f.key
                  ? "font-medium text-gray-900 dark:text-gray-100"
                  : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
              }
            >
              {f.label}{" "}
              <span
                className={
                  filter === f.key
                    ? "text-gray-500 dark:text-gray-400"
                    : "text-gray-300 dark:text-gray-600"
                }
              >
                {f.count}
              </span>
            </button>
          </span>
        ))}
      </div>

      {/* Publication Entries */}
      {filteredPublications.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No publications found for the selected filter.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {sortedYears.map((year) => (
            <div key={year}>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 pb-2 border-b border-gray-200 dark:border-gray-700 mb-4">
                {year}
              </h2>

              <div className="space-y-6">
                {groupedByYear[year].map((pub) => {
                  const doiUrl = getDoiUrl(pub.links);
                  return (
                    <div
                      key={`${pub.title}-${pub.year}`}
                      className="pl-4 border-l-2 border-gray-200 dark:border-gray-700"
                    >
                      <h3 className="text-base font-semibold leading-snug">
                        {doiUrl ? (
                          <a
                            href={doiUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400"
                          >
                            {pub.title}
                          </a>
                        ) : (
                          <span className="text-gray-900 dark:text-gray-100">
                            {pub.title}
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-0.5">
                        {boldMyName(pub.authors)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                        <span className="italic">{pub.conference}</span>
                        {pub.conferenceShort && (
                          <>
                            {"  ·  "}
                            <span className="text-gray-400 dark:text-gray-500 text-xs font-bold">
                              [{pub.conferenceShort}]
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
