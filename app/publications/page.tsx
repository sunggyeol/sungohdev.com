import PublicationLayout from "@/layouts/PublicationsLayout";
import { genPageMetadata } from "app/seo";
import PublicationsClient from "./PublicationsClient";
import { allPublications } from "contentlayer/generated";

export const metadata = genPageMetadata({ title: "Publications" });

export default function Page() {
  // Filter out drafts and sort publications
  const sortedPublications = allPublications
    .filter((p) => p.draft !== true)
    .sort((a, b) => {
      // If both have sortOrder, use that (higher numbers first)
      if (a.sortOrder !== undefined && b.sortOrder !== undefined) {
        return b.sortOrder - a.sortOrder;
      }
      // If only one has sortOrder, prioritize it
      if (a.sortOrder !== undefined) return -1;
      if (b.sortOrder !== undefined) return 1;
      // If neither has sortOrder, fall back to year (newest first), then title
      const yearA = parseInt(a.year);
      const yearB = parseInt(b.year);
      if (yearA !== yearB) {
        return yearB - yearA; // Newest first
      }
      return a.title.localeCompare(b.title); // Alphabetical by title within same year
    });

  return (
    <PublicationLayout
      title="Publications"
      description="Conference Proceedings, Lightly Reviewed Papers, Posters, and Extended Abstracts"
    >
      <PublicationsClient publications={sortedPublications} />
    </PublicationLayout>
  );
}
