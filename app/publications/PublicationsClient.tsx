"use client";

import { useState } from "react";
import { Publications } from "contentlayer/generated";
import PublicationEntry from "@/components/PublicationEntry";
import { contributionFamilies, getContribution } from "@/data/publicationTypes";

interface PublicationsClientProps {
  publications: Publications[];
}

export default function PublicationsClient({
  publications,
}: PublicationsClientProps) {
  const [filter, setFilter] = useState("all");

  const familyOf = (pub: Publications) =>
    getContribution(pub.contribution).family;

  const filteredPublications = publications.filter(
    (pub) => filter === "all" || familyOf(pub) === filter,
  );

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

  // Only surface families that actually have entries, so the filter row grows
  // with the list instead of showing dead chips.
  const filters = [
    { key: "all", label: "All", count: publications.length },
    ...contributionFamilies
      .map((family) => ({
        key: family.key as string,
        label: family.label,
        count: publications.filter((p) => familyOf(p) === family.key).length,
      }))
      .filter((f) => f.count > 0),
  ];

  return (
    <>
      {/* Filters — hidden when everything falls into a single family */}
      {filters.length > 2 && (
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium transition-colors ${
                filter === f.key
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f.label}
              <span
                className={`text-xs ${
                  filter === f.key ? "text-white/70" : "text-gray-400"
                }`}
              >
                {f.count}
              </span>
            </button>
          ))}
        </div>
      )}

      {filteredPublications.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-gray-500">
            No publications found for the selected filter.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {sortedYears.map((year) => (
            <section key={year}>
              {/* The year sits in the same left column as the venue labels, so
                  scanning down reads "2026 / CHI", "2025 / FIE", ... */}
              <div className="mb-2 flex items-center gap-4 sm:gap-6">
                <h2 className="shrink-0 font-mono text-lg font-bold tabular-nums text-gray-900 sm:w-20">
                  {year}
                </h2>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <div className="space-y-3">
                {groupedByYear[year].map((pub) => (
                  <PublicationEntry
                    key={`${pub.title}-${pub.year}`}
                    pub={pub}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
