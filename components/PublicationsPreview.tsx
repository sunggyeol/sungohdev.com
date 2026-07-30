"use client";

import Link from "@/components/Link";
import PublicationEntry from "@/components/PublicationEntry";
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

  return (
    <>
      <div className="space-y-5">
        {displayPublications.map((pub) => (
          <PublicationEntry key={`${pub.title}-${pub.year}`} pub={pub} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-6">
          <Link
            href="/publications"
            className="text-sm font-medium text-primary-500 hover:text-primary-600"
          >
            View all {publications.length} publications &rarr;
          </Link>
        </div>
      )}
    </>
  );
}
