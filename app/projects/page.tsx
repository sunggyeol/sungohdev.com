import Image from "@/components/Image";
import Link from "@/components/Link";
import { genPageMetadata } from "app/seo";
import { allProjects } from "contentlayer/generated";

export const metadata = genPageMetadata({ title: "Projects" });

export default function Projects() {
  const sortedProjects = allProjects
    .filter((p) => p.draft !== true)
    .sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-6 pt-6 md:space-y-3">
        <h1 className="text-xl font-extrabold leading-7 tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl sm:leading-8">
          Projects
        </h1>
        <p className="text-base leading-6 text-gray-500 dark:text-gray-400">
          Personal and Research Projects
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 py-8 md:grid-cols-2">
        {sortedProjects.map((project) => (
          <div key={project.title} className="group">
            {project.imgSrc && (
              <div className="relative mb-3 aspect-video overflow-hidden rounded-md">
                {project.href ? (
                  <Link
                    href={project.href}
                    aria-label={`Link to ${project.title}`}
                  >
                    <Image
                      alt={project.title}
                      src={project.imgSrc}
                      className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                      fill
                    />
                  </Link>
                ) : (
                  <Image
                    alt={project.title}
                    src={project.imgSrc}
                    className="object-cover"
                    fill
                  />
                )}
              </div>
            )}

            <h2 className="text-lg font-semibold leading-tight">
              {project.href ? (
                <Link
                  href={project.href}
                  aria-label={`Link to ${project.title}`}
                  className="text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400"
                >
                  {project.title}
                </Link>
              ) : (
                <span className="text-gray-900 dark:text-gray-100">
                  {project.title}
                </span>
              )}
            </h2>

            <p className="mt-1.5 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              {project.description}
            </p>

            {(project.category ||
              (project.technologies && project.technologies.length > 0)) && (
              <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                {project.category && (
                  <span className="font-medium">{project.category}</span>
                )}
                {project.category &&
                  project.technologies &&
                  project.technologies.length > 0 && <span>{" · "}</span>}
                {project.technologies && project.technologies.length > 0 && (
                  <span>{project.technologies.join(", ")}</span>
                )}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
