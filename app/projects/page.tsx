import PageLayout from "@/layouts/PageLayout";
import { genPageMetadata } from "app/seo";
import { allProjects, allPublications } from "contentlayer/generated";
import ProjectsClient from "./ProjectsClient";

export const metadata = genPageMetadata({ title: "Projects" });

export default function Projects() {
  const sortedProjects = allProjects
    .filter((p) => p.draft !== true)
    .sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });

  const publications = allPublications.filter((p) => p.draft !== true);

  return (
    <PageLayout title="Projects">
      <ProjectsClient projects={sortedProjects} publications={publications} />
    </PageLayout>
  );
}
