import PageLayout from "@/layouts/PageLayout";
import { genPageMetadata } from "app/seo";
import NewsPreview from "@/components/NewsPreview";
import { allNews } from "contentlayer/generated";

export const metadata = genPageMetadata({ title: "News" });

export default function Page() {
  const sortedNews = allNews
    .filter((n) => n.draft !== true)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <PageLayout title="News">
      {/* No maxDisplay — render the full archive. */}
      <NewsPreview news={sortedNews} />
    </PageLayout>
  );
}
