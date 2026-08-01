import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

// Shared heading + rule + body spacing for the Publications, Projects, and
// News pages, so their top margins stay in sync.
export default function PageLayout({
  children,
  title,
  description,
}: PageLayoutProps) {
  return (
    <div className="divide-y divide-gray-200">
      <div className="space-y-2 pb-3 pt-4 md:space-y-3">
        <h1 className="text-lg font-semibold leading-7 tracking-tight text-gray-900 sm:text-xl sm:leading-8">
          {title}
        </h1>
        {description && (
          <p className="text-base leading-6 text-gray-500">{description}</p>
        )}
      </div>
      <div className="pb-6 pt-4">{children}</div>
    </div>
  );
}
