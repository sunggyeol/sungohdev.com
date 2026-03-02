"use client";

import { useState } from "react";
import Image from "@/components/Image";
import Link from "@/components/Link";
import { Projects, Publications } from "contentlayer/generated";

interface ProjectsClientProps {
  projects: Projects[];
  publications: Publications[];
}

export default function ProjectsClient({
  projects,
  publications,
}: ProjectsClientProps) {
  const [filter, setFilter] = useState("research");

  const filteredProjects = projects.filter((p) => p.projectType === filter);

  const getDoiUrl = (
    links: Array<{ type: string; url: string }> | undefined,
  ) => {
    if (!links) return null;
    const doi = links.find((l) => l.type === "DOI");
    return doi?.url ?? null;
  };

  const filters = [
    {
      key: "research",
      label: "Research",
      count: projects.filter((p) => p.projectType === "research").length,
    },
    {
      key: "personal",
      label: "Personal & Other",
      count: projects.filter((p) => p.projectType === "personal").length,
    },
  ];

  return (
    <>
      {/* Filters */}
      <div className="mb-8 flex flex-wrap items-center gap-1 text-sm">
        {filters.map((f, i) => (
          <span key={f.key} className="flex items-center gap-1">
            {i > 0 && (
              <span className="text-gray-300 dark:text-gray-600 mx-1">/</span>
            )}
            <button
              onClick={() => setFilter(f.key)}
              className={
                filter === f.key
                  ? "font-medium text-gray-900 dark:text-gray-100"
                  : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
              }
            >
              {f.label}{" "}
              <span
                className={
                  filter === f.key
                    ? "text-gray-500 dark:text-gray-400"
                    : "text-gray-300 dark:text-gray-600"
                }
              >
                ({f.count})
              </span>
            </button>
          </span>
        ))}
      </div>

      {/* Project Cards */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700 md:divide-y-0 md:space-y-1">
        {filteredProjects.map((project) => {
          const relatedPubs =
            project.relatedPublications
              ?.map((slug) => publications.find((pub) => pub.slug === slug))
              .filter(Boolean) ?? [];

          // Extract DOI identifier (e.g. "10.1145/3706599.3719287") from any URL
          const extractDoi = (url: string) => {
            const match = url.match(/(10\.\d{4,}\/[^\s]+)/);
            return match?.[1] ?? null;
          };

          // Collect paper DOIs to avoid showing duplicate links
          const paperDois = new Set(
            relatedPubs
              .map((pub) => getDoiUrl(pub!.links))
              .filter(Boolean)
              .map((url) => extractDoi(url!))
              .filter(Boolean),
          );
          const hrefDoi = project.href ? extractDoi(project.href) : null;
          const showHref = project.href && !(hrefDoi && paperDois.has(hrefDoi));

          return (
            <div
              key={project.title}
              className="group flex flex-col gap-4 py-8 first:pt-0 md:flex-row md:gap-6"
            >
              {project.imgSrc && (
                <div className="relative aspect-[16/10] w-full shrink-0 self-start overflow-hidden rounded-md shadow-[0_0_0_1px_rgba(0,0,0,0.06)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08)] md:w-1/2">
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

              <div className="flex-1">
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

                {(showHref || project.repoUrl || relatedPubs.length > 0) && (
                  <div className="mt-2 space-y-1">
                    {showHref && (
                      <p className="flex items-start gap-1.5 text-xs text-gray-400 dark:text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="mt-px h-3 w-3 shrink-0"
                        >
                          <path d="M8.914 6.025a.75.75 0 0 1 1.06 0 3.5 3.5 0 0 1 0 4.95l-2 2a3.5 3.5 0 0 1-5.396-4.402.75.75 0 0 1 1.251.827 2 2 0 0 0 3.085 2.514l2-2a2 2 0 0 0 0-2.828.75.75 0 0 1 0-1.06Z" />
                          <path d="M7.086 9.975a.75.75 0 0 1-1.06 0 3.5 3.5 0 0 1 0-4.95l2-2a3.5 3.5 0 0 1 5.396 4.402.75.75 0 0 1-1.251-.827 2 2 0 0 0-3.085-2.514l-2 2a2 2 0 0 0 0 2.828.75.75 0 0 1 0 1.06Z" />
                        </svg>
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="break-all hover:text-primary-500 dark:hover:text-primary-400"
                        >
                          {project.href}
                        </a>
                      </p>
                    )}
                    {project.repoUrl && (
                      <p className="flex items-start gap-1.5 text-xs text-gray-400 dark:text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="mt-px h-3 w-3 shrink-0"
                        >
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                        </svg>
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="break-all hover:text-primary-500 dark:hover:text-primary-400"
                        >
                          {project.repoUrl}
                        </a>
                      </p>
                    )}
                    {relatedPubs.map((pub) => {
                      const doiUrl = getDoiUrl(pub!.links);
                      const trackLabel =
                        pub!.publicationType === "conference-proceedings"
                          ? "Full Paper"
                          : "Extended Abstracts";
                      const pubLabel = `${pub!.title} (${pub!.conferenceShort} ${pub!.year} ${trackLabel})`;
                      return (
                        <p
                          key={pub!.slug}
                          className="flex items-start gap-1.5 text-xs text-gray-400 dark:text-gray-500"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="mt-px h-3 w-3 shrink-0"
                          >
                            <path d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm2-.5a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5H4Zm1 2.75A.75.75 0 0 1 5.75 5.5h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 5 6.25Zm0 3a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 5 9.25Z" />
                          </svg>
                          {doiUrl ? (
                            <a
                              href={doiUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-primary-500 dark:hover:text-primary-400"
                            >
                              {pubLabel}
                            </a>
                          ) : (
                            <span>{pubLabel}</span>
                          )}
                        </p>
                      );
                    })}
                  </div>
                )}

                {project.tags && project.tags.length > 0 && (
                  <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                    {project.tags.join(", ")}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
