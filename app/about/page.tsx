import { Authors, allAuthors } from "contentlayer/generated";
import { MDXLayoutRenderer } from "pliny/mdx-components";
import { coreContent } from "pliny/utils/contentlayer";
import { genPageMetadata } from "app/seo";
import Image from "@/components/Image";
import SocialIcon from "@/components/social-icons";
import { education, experience } from "@/data/resumeData";

export const metadata = genPageMetadata({ title: "About" });

export default function Page() {
  const author = allAuthors.find((p) => p.slug === "default") as Authors;
  const mainContent = coreContent(author);
  const {
    name,
    avatar,
    occupation,
    company,
    email,
    linkedin,
    github,
    scholar,
  } = mainContent;

  // Convert anti-spam email format [at] -> @
  const emailHref = email ? `mailto:${email.replace("[at]", "@")}` : undefined;

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-6 pt-6 md:space-y-3">
        <h1 className="text-xl font-extrabold leading-7 tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl sm:leading-8">
          About
        </h1>
      </div>

      <div className="items-start space-y-4 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:space-y-0 py-6">
        {/* Sidebar */}
        <div className="flex flex-col items-center space-x-2">
          {avatar && (
            <Image
              src={avatar}
              alt="avatar"
              width={128}
              height={128}
              className="h-32 w-32 rounded-full"
            />
          )}
          <h3 className="pb-1 pt-3 text-xl font-bold leading-7 tracking-tight">
            {name}
          </h3>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {occupation}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {company}
          </div>
          <div className="flex space-x-2 pt-4">
            <SocialIcon kind="mail" href={emailHref} size={6} />
            <SocialIcon kind="github" href={github} size={6} />
            <SocialIcon kind="linkedin" href={linkedin} size={6} />
            <SocialIcon kind="scholar" href={scholar} size={6} />
          </div>
        </div>

        {/* Content area */}
        <div className="xl:col-span-3">
          {/* Bio from MDX */}
          <div className="prose max-w-none dark:prose-invert prose-base pb-8">
            <MDXLayoutRenderer code={author.body.code} />
          </div>

          {/* Education */}
          <section className="pb-8">
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2 mb-5">
              Education
            </h2>
            <div className="space-y-5">
              {education.map((edu) => (
                <div key={`${edu.school}-${edu.degree}`}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {edu.school}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-4 shrink-0">
                      {edu.date}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
                    {edu.degree}
                  </div>
                  {edu.details.map((detail) => (
                    <div
                      key={detail}
                      className="text-sm text-gray-600 dark:text-gray-300"
                    >
                      {detail}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section>
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2 mb-5">
              Experience
            </h2>
            <div className="space-y-5">
              {experience.map((exp) => (
                <div key={`${exp.company}-${exp.role}`}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {exp.company}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-4 shrink-0">
                      {exp.start} – {exp.end}
                    </span>
                  </div>
                  {exp.organization && (
                    <div className="text-sm font-medium italic text-gray-500 dark:text-gray-400 mt-0.5">
                      {exp.organization}
                    </div>
                  )}
                  <div className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
                    {exp.role}
                  </div>
                  {exp.description && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
