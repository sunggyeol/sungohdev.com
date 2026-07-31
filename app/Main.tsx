import { MDXLayoutRenderer } from "pliny/mdx-components";
import {
  Authors,
  allAuthors,
  allPublications,
  allNews,
} from "contentlayer/generated";
import { coreContent } from "pliny/utils/contentlayer";
import Image from "@/components/Image";
import SocialIcon from "@/components/social-icons";
import MailIcon from "@/components/MailIcon";
import PublicationsPreview from "@/components/PublicationsPreview";
import NewsPreview from "@/components/NewsPreview";

export default function Home() {
  // Profile metadata and bio prose both live in data/authors/about.mdx
  const author = allAuthors.find((p) => p.slug === "about") as Authors;
  const {
    name,
    avatar,
    occupation,
    company,
    email,
    linkedin,
    github,
    scholar,
    cv,
  } = coreContent(author);

  const [emailUser, emailDomain] = email ? email.split("[at]") : [];

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
    <div className="divide-y divide-gray-200">
      {/* ── Hero: profile · bio · news ── */}
      {/* From lg the three columns get explicit widths so the profile column stops
          hogging space it never fills and News gets room to breathe. */}
      <div className="grid grid-cols-1 gap-8 py-8 md:grid-cols-12 md:gap-x-8 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)_minmax(0,19rem)]">
        {/* Profile */}
        <div className="flex items-center gap-5 md:col-span-4 md:block lg:col-span-1">
          {avatar && (
            <Image
              src={avatar}
              alt="avatar"
              width={512}
              height={512}
              className="h-28 w-28 shrink-0 rounded-lg object-cover md:mx-auto md:mb-4 md:h-56 md:w-56"
            />
          )}
          <div className="min-w-0 md:text-center">
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              {name}
            </h1>
            <p className="mt-0.5 text-sm text-gray-500">
              {occupation} at {company}
            </p>
            {/* Negative margin keeps the row optically flush while the padding
                gives each icon a finger-sized tap target on touch screens. */}
            <div className="-ml-2 mt-1.5 flex items-center gap-1 [&_a]:p-2 md:ml-0 md:mt-2 md:justify-center">
              {emailUser && emailDomain && (
                <MailIcon user={emailUser} domain={emailDomain} size={5} />
              )}
              <SocialIcon kind="github" href={github} size={5} />
              <SocialIcon kind="linkedin" href={linkedin} size={5} />
              <SocialIcon kind="scholar" href={scholar} size={5} />
              <SocialIcon kind="cv" href={cv} size={5} />
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="md:col-span-8 lg:col-span-1">
          <div className="prose prose-sm max-w-none">
            <MDXLayoutRenderer code={author.body.code} />
          </div>
        </div>

        {/* News */}
        {sortedNews.length > 0 && (
          <div className="border-t border-gray-200 pt-8 md:col-span-12 lg:col-span-1 lg:border-t-0 lg:pl-8 lg:pt-0">
            <h2 className="mb-4 text-xl font-extrabold leading-7 tracking-tight text-gray-900">
              News
            </h2>
            <NewsPreview news={sortedNews} maxDisplay={4} compact />
          </div>
        )}
      </div>

      {/* ── Publications ── */}
      <div className="py-8">
        <div className="space-y-2 pb-6 md:space-y-3">
          <h2 className="text-xl font-extrabold leading-7 tracking-tight text-gray-900 sm:text-2xl sm:leading-8">
            Recent Publications
          </h2>
        </div>
        <PublicationsPreview publications={sortedPublications} />
      </div>
    </div>
  );
}
