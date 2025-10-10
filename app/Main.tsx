import { MDXLayoutRenderer } from "pliny/mdx-components";
import {
  Authors,
  allAuthors,
  allPublications,
  allNews,
} from "contentlayer/generated";
import { coreContent } from "pliny/utils/contentlayer";
import siteMetadata from "@/data/siteMetadata";
import PublicationsPreview from "@/components/PublicationsPreview";
import NewsPreview from "@/components/NewsPreview";

export default function Home() {
  // Get the author data (main intro content)
  const author = allAuthors.find((p) => p.slug === "main-intro") as Authors;
  const mainContent = coreContent(author);

  // Get publications data
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

  // Get news data (sorted by date, newest first)
  const sortedNews = allNews
    .filter((n) => n.draft !== true)
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-xl font-extrabold leading-7 tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl sm:leading-8">
            Hi, I'm Sung Oh!
          </h1>
        </div>

        {/* About Section - Condensed */}
        <div className="py-6">
          <div className="prose max-w-none dark:prose-invert prose-base">
            <MDXLayoutRenderer code={author.body.code} />
          </div>
        </div>

        {/* News Section */}
        {sortedNews.length > 0 && (
          <div className="py-6">
            <div className="space-y-2 pb-6 md:space-y-3">
              <h2 className="text-xl font-extrabold leading-7 tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl sm:leading-8">
                News
              </h2>
            </div>
            <NewsPreview news={sortedNews} />
          </div>
        )}

        {/* Publications Section - Condensed */}
        <div className="py-6">
          <div className="space-y-2 pb-6 md:space-y-3">
            <h2 className="text-xl font-extrabold leading-7 tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl sm:leading-8">
              Recent Publications
            </h2>
          </div>
          <PublicationsPreview publications={sortedPublications} />
        </div>
      </div>
    </>
  );
}
