import { ReactNode } from "react";

interface PublicationLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export default function PublicationLayout({
  children,
  title,
  description,
}: PublicationLayoutProps) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-6 pt-6 md:space-y-3">
          <h1 className="text-xl font-extrabold leading-7 tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl sm:leading-8">
            {title}
          </h1>
          {description && (
            <p className="text-base leading-6 text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
        <div className="prose max-w-none pb-6 pt-6 dark:prose-invert prose-sm">
          {children}
        </div>
      </div>
    </>
  );
}
