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

  return (
    <>
      <div className="space-y-6">
        {displayPublications.map((pub) => {
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
                {"  ·  "}
                <span>{pub.year}</span>
                {pub.conferenceShort && (
                  <>
                    {"  ·  "}
                    <span className="text-gray-400 dark:text-gray-500 text-xs font-medium">
                      [{pub.conferenceShort}]
                    </span>
                  </>
                )}
              </p>
            </div>
          );
        })}
      </div>

      {hasMore && (
        <div className="mt-6">
          <Link
            href="/publications"
            className="text-sm font-medium text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
          >
            View all {publications.length} publications &rarr;
          </Link>
        </div>
      )}
    </>
  );
}
