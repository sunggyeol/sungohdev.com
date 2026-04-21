import { Authors, allAuthors } from "contentlayer/generated";
import { coreContent } from "pliny/utils/contentlayer";
import { genPageMetadata } from "app/seo";
import Image from "@/components/Image";
import SocialIcon from "@/components/social-icons";
import { education, experience } from "@/data/resumeData";
import AiChat from "@/components/AiChat";

export const metadata = genPageMetadata({ title: "About" });

export default function Page() {
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
  } = coreContent(author);

  const emailHref = email ? `mailto:${email.replace("[at]", "@")}` : undefined;

  return (
    <div className="py-8">
      {/* ── Profile header ── */}
      <div className="flex items-start gap-6">
        {avatar && (
          <Image
            src={avatar}
            alt="avatar"
            width={96}
            height={96}
            className="h-24 w-24 shrink-0 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
          />
        )}
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {name}
          </h1>
          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
            {occupation} · {company}
          </p>
          <div className="mt-3 flex items-center gap-3">
            <SocialIcon kind="mail" href={emailHref} size={5} />
            <SocialIcon kind="github" href={github} size={5} />
            <SocialIcon kind="linkedin" href={linkedin} size={5} />
            <SocialIcon kind="scholar" href={scholar} size={5} />
          </div>
        </div>
      </div>

      {/* ── Timeline sections ── */}
      <div className="mt-12 space-y-12">
        {/* Education */}
        <section>
          <div className="mb-6 flex items-center gap-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Education
            </h2>
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
          </div>

          <div className="relative ml-3">
            {/* Vertical axis line */}
            <div className="absolute left-0 top-1 bottom-1 w-px bg-gray-200 dark:bg-gray-800" />

            <div className="space-y-6">
              {education.map((edu) => (
                <div
                  key={`${edu.school}-${edu.degree}`}
                  className="relative pl-6"
                >
                  {/* Node marker */}
                  <div className="absolute left-0 top-[7px] -translate-x-1/2">
                    <div className="h-2 w-2 rounded-full bg-gray-400 ring-2 ring-white dark:bg-gray-500 dark:ring-gray-950" />
                  </div>

                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                    <div className="min-w-0">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {edu.school}
                      </span>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {edu.degree}
                      </div>
                      {edu.details.map((detail) => (
                        <div
                          key={detail}
                          className="text-sm text-gray-500 dark:text-gray-400"
                        >
                          {detail}
                        </div>
                      ))}
                    </div>
                    <span className="shrink-0 font-mono text-xs tabular-nums text-gray-400 dark:text-gray-500 sm:ml-4">
                      {edu.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section>
          <div className="mb-6 flex items-center gap-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Experience
            </h2>
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
          </div>

          <div className="relative ml-3">
            {/* Vertical axis line */}
            <div className="absolute left-0 top-1 bottom-1 w-px bg-gray-200 dark:bg-gray-800" />

            <div className="space-y-6">
              {experience.map((exp) => (
                <div
                  key={`${exp.company}-${exp.role}`}
                  className="relative pl-6"
                >
                  {/* Node marker — filled for current, outlined for past */}
                  <div className="absolute left-0 top-[7px] -translate-x-1/2">
                    {exp.end === "Present" ? (
                      <div className="h-2.5 w-2.5 rounded-full bg-gray-900 ring-2 ring-white dark:bg-gray-100 dark:ring-gray-950" />
                    ) : (
                      <div className="h-2 w-2 rounded-full bg-gray-400 ring-2 ring-white dark:bg-gray-500 dark:ring-gray-950" />
                    )}
                  </div>

                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                    <div className="min-w-0">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {exp.company}
                      </span>
                      {exp.organization && (
                        <span className="ml-1.5 text-sm text-gray-400 dark:text-gray-500">
                          / {exp.organization}
                        </span>
                      )}
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {exp.role}
                      </div>
                      {exp.description && (
                        <p className="mt-0.5 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                          {exp.description}
                        </p>
                      )}
                    </div>
                    <span className="shrink-0 font-mono text-xs tabular-nums text-gray-400 dark:text-gray-500 sm:ml-4">
                      {exp.start} – {exp.end}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── AI Chat ── */}
      <div className="mt-12">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
        </div>
        <div className="mt-6">
          <AiChat />
        </div>
      </div>
    </div>
  );
}
