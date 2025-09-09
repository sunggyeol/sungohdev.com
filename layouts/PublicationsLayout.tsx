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
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-2xl font-extrabold leading-8 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-9 md:text-4xl md:leading-10">
            {title}
          </h1>
          {description && (
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
        <div className="prose max-w-none pb-8 pt-8 dark:prose-invert">
          {children}
        </div>
      </div>
    </>
  );
}
