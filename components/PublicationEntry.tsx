import { Publications } from "contentlayer/generated";
import { getContribution } from "@/data/publicationTypes";

// Shared type spec for the metadata row, so the chip and the bare label sit on
// one baseline instead of drifting a pixel apart.
const META = "text-[11px] font-bold uppercase tracking-wider";

// The chip goes on the venue, not the contribution. Venue acronyms are three
// or four characters and near-uniform in width, so they tile evenly down the
// page; contribution labels run from "Poster" to "Student Research
// Competition", and boxing those produced wildly uneven blocks. Tailwind
// utilities live here rather than in data/publicationTypes.ts because
// tailwind.config.js only scans data/**/*.mdx, so classes in a data/*.ts file
// are never generated.
const CHIP = "bg-gray-100 text-gray-700";

export function boldMyName(authorsString: string) {
  const parts = authorsString.split("Sunggyeol Oh");
  if (parts.length === 1) return authorsString;

  return parts.map((part, index) => (
    <span key={index}>
      {part}
      {index < parts.length - 1 && (
        <strong className="font-semibold text-gray-900">Sunggyeol Oh</strong>
      )}
    </span>
  ));
}

type PubLink = { type: string; url: string };

function getLinks(links: unknown): PubLink[] {
  return Array.isArray(links) ? (links as PubLink[]) : [];
}

export default function PublicationEntry({ pub }: { pub: Publications }) {
  const contribution = getContribution(pub.contribution);
  const links = getLinks(pub.links);
  // Prefer the DOI as the canonical link, but fall back to whatever exists so
  // workshop papers with only a website still get a clickable title.
  const primaryLink = links.find((l) => l.type === "DOI") ?? links[0];

  return (
    <article>
      <div className="min-w-0 max-w-4xl">
        <h3 className="text-[15px] font-semibold leading-snug tracking-tight">
          {primaryLink ? (
            <a
              href={primaryLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 decoration-primary-300 decoration-2 underline-offset-4 hover:text-primary-500 hover:underline"
            >
              {pub.title}
            </a>
          ) : (
            <span className="text-gray-900">{pub.title}</span>
          )}
        </h3>

        <p className="mt-0.5 text-[13px] leading-snug text-gray-600">
          {boldMyName(pub.authors)}
        </p>

        {/* The venue of record: the proceedings or journal you would cite. */}
        {pub.publishedIn && (
          <p className="mt-0.5 text-[13px] italic leading-snug text-gray-500">
            {pub.publishedIn}
          </p>
        )}

        {/* Venue acronym leads the row, then the track, then the links — the
            whole entry reads top-to-bottom in one column now, so this line
            carries the metadata the old left rail used to hold. */}
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className={`rounded-ui px-2 py-[3px] ${META} ${CHIP}`}>
            {pub.venue}
          </span>

          <span className={`${META} text-gray-500`}>{contribution.label}</span>

          {links.map((link) => (
            <a
              key={`${link.type}-${link.url}`}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold uppercase tracking-wide text-gray-400 transition-colors hover:text-primary-500"
            >
              {link.type} <span aria-hidden="true">&#8599;</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
