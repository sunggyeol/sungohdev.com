import PublicationLayout from "@/layouts/PublicationsLayout";
import { genPageMetadata } from "app/seo";

export const metadata = genPageMetadata({ title: "Publications" });

export default function Page() {
  const publications = [
    {
      title:
        "Optimizing Diary Studies Learning Outcomes with Fine-Tuned Large Language Models on the DiaryQuest Platform",
      authors:
        "Sunggyeol Oh, Jiacheng Zhao, Carson Russo, Michael Bolmer Jr, Jihoo Jeong, Jixiang Fan, Yusheng Cao, Wei Lu Wang, Natalie Andrus, and Scott McCrickard",
      conference:
        "Proceedings of the IEEE Frontiers in Education Conference (Accepted)",
      conferenceShort: "FIE",
      year: "2025",
      links: [{ type: "PDF", url: "/static/pdfs/25-fie-optimizing.pdf" }],
    },
    {
      title:
        "Structuring Collaborative Reflection: Integrating Diary Study and Focus Group Discussion",
      authors:
        "Jixiang Fan, Jiacheng Zhao, Sunggyeol Oh, Michael Bolmer Jr, Yoonje Lee, Nick Flammer, Yuhao Chen, and D. Scott McCrickard",
      conference:
        "Companion Publication of the 2025 Conference on Computer-Supported Cooperative Work and Social Computing (Accepted)",
      conferenceShort: "CSCW",
      year: "2025",
      links: [{ type: "PDF", url: "/static/pdfs/25-cscw-structuring.pdf" }],
    },
    {
      title:
        "Boosting Diary Study Outcomes with a Fine-Tuned Large Language Model",
      authors:
        "Sunggyeol Oh, Jiacheng Zhao, Carson Russo, and Michael Bolmer Jr",
      conference:
        "Proceedings of the Extended Abstracts of the CHI Conference on Human Factors in Computing Systems",
      conferenceShort: "CHI",
      year: "2025",
      links: [{ type: "DOI", url: "https://doi.org/10.1145/3706599.3719287" }],
    },
    {
      title:
        "Explore Public's Perspectives on Generative AI in Computer Science (CS) Education: A Social Media Data Analysis",
      authors: "Sunggyeol Oh, Yi Cao, Andrew Katz, and Jialu Zhao",
      conference: "Proceedings of the IEEE Frontiers in Education Conference",
      conferenceShort: "FIE",
      year: "2024",
      links: [
        { type: "DOI", url: "https://doi.org/10.1109/FIE61694.2024.10893102" },
      ],
    },
  ];

  const getBadgeWidth = (text) => {
    // Calculate width: base width + character count * width per character
    const baseWidth = 20; // base padding and border
    const charWidth = 8; // width per character in pixels
    return Math.max(40, baseWidth + text.length * charWidth); // minimum 40px
  };

  const boldMyName = (authorsString) => {
    // Split by "Sunggyeol Oh" and add bold formatting
    const parts = authorsString.split("Sunggyeol Oh");
    if (parts.length === 1) {
      // Name not found, return as is
      return authorsString;
    }

    return parts.map((part, index) => (
      <span key={index}>
        {part}
        {index < parts.length - 1 && <strong>Sunggyeol Oh</strong>}
      </span>
    ));
  };

  const renderLinks = (links) => {
    if (!links || links.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-1">
        {links.map((link, index) => {
          const width = getBadgeWidth(link.type);
          return (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium text-primary-500 border border-primary-500 rounded hover:bg-primary-500 hover:text-white dark:text-primary-400 dark:border-primary-400 dark:hover:bg-primary-400 dark:hover:text-white transition-colors no-underline"
              style={{ width: `${width}px` }}
            >
              {link.type}
            </a>
          );
        })}
      </div>
    );
  };

  return (
    <PublicationLayout
      title="Publications"
      description="Conference Proceedings, Lightly Reviewed Papers, Posters, and Abstracts"
    >
      <div className="space-y-6">
        {publications.map((pub, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow p-4"
          >
            <div className="flex items-start gap-4">
              {/* Left Column - Conference Badge and Links */}
              <div className="flex-shrink-0 w-12 sm:w-14 md:w-16 lg:w-20">
                <div
                  className="bg-primary-500 text-white px-2 py-1 rounded text-xs font-bold mb-2 inline-flex items-center justify-center"
                  style={{ width: `${getBadgeWidth(pub.conferenceShort)}px` }}
                >
                  {pub.conferenceShort}
                </div>
                {renderLinks(pub.links)}
              </div>

              {/* Right Column - Publication Details */}
              <div className="flex-1">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight mt-0">
                    {pub.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {boldMyName(pub.authors)}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 italic">
                    {pub.conference}
                  </p>
                  <p className="text-gray-500 dark:text-gray-500 text-sm">
                    {pub.year}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PublicationLayout>
  );
}
