import PublicationLayout from "@/layouts/PublicationsLayout";
import { genPageMetadata } from "app/seo";
import PublicationsClient from "./PublicationsClient";
import { allPublications } from "contentlayer/generated";

export const metadata = genPageMetadata({ title: "Publications" });

export default function Page() {
  // Filter out drafts and sort publications by year (newest first)
  const sortedPublications = allPublications
    .filter((p) => p.draft !== true)
    .sort((a, b) => {
      // Sort by year first (newest first), then by title for same year
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
