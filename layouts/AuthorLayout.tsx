import { ReactNode } from "react";
import type { Authors } from "contentlayer/generated";
import SocialIcon from "@/components/social-icons";
import Image from "@/components/Image";

interface Props {
  children: ReactNode;
  content: Omit<Authors, "_id" | "_raw" | "body">;
}

export default function AuthorLayout({ children, content }: Props) {
  const {
    name,
    avatar,
    occupation,
    company,
    email,
    twitter,
    linkedin,
    github,
  } = content;

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-6 pt-6 md:space-y-3">
          <h1 className="text-xl font-extrabold leading-7 tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl sm:leading-8">
            About
          </h1>
        </div>
        <div className="items-start space-y-4 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:space-y-0 py-6">
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
              <SocialIcon kind="mail" href={`mailto:${email}`} size={6} />
              <SocialIcon kind="github" href={github} size={6} />
              <SocialIcon kind="linkedin" href={linkedin} size={6} />
              <SocialIcon kind="x" href={twitter} size={6} />
            </div>
          </div>
          <div className="prose max-w-none pb-6 dark:prose-invert xl:col-span-3 prose-base">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
