import Card from "@/components/Card";
import { genPageMetadata } from "app/seo";
import { allProjects } from "contentlayer/generated";

export const metadata = genPageMetadata({ title: "Projects" });

export default function Projects() {
  // Filter out drafts and sort projects by date (newest first)
  const sortedProjects = allProjects
    .filter((p) => p.draft !== true)
    .sort((a, b) => {
      // Sort by date (newest first)
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA; // Newest first
    });

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-6 pt-6 md:space-y-3">
          <h1 className="text-xl font-extrabold leading-7 tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl sm:leading-8">
            Projects
          </h1>
          <p className="text-base leading-6 text-gray-500 dark:text-gray-400">
            Personal and Research Projects
          </p>
        </div>
        <div className="container py-8">
          <div className="-m-4 flex flex-wrap">
            {sortedProjects.map((project) => (
              <Card
                key={project.title}
                title={project.title}
                description={project.description}
                imgSrc={project.imgSrc}
                href={project.href}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
