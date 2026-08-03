// Publication taxonomy.
//
// Three orthogonal facts describe a publication, and conflating them is what
// makes academic venue lists confusing:
//
//   venue        the conference              "CHI", "VIS", "FIE", "CSCW"
//   contribution what kind of work it is     full paper, poster, SRC, ...
//   publishedIn  the venue of record         "Extended Abstracts of the..."
//
// `contribution` is what the left rail renders; the conference is already named
// in full on the publishedIn line, so repeating its acronym earned nothing.
//
// Keeping `publishedIn` separate is what untangles IEEE VIS: a full paper is
// published in TVCG while a short paper goes to the VIS proceedings, even
// though both share venue "VIS". The contribution label names the track.
//
// Tailwind class names deliberately live in components/PublicationEntry.tsx,
// not here: tailwind.config.js only scans data/**/*.mdx, so utility classes in
// this file would never be generated.

export type ContributionKey =
  | "journal"
  | "full"
  | "short"
  | "poster"
  | "src"
  | "lbw"
  | "demo"
  | "workshop";

export type ContributionFamily =
  | "full-papers"
  | "short-papers"
  | "posters-and-extended-abstracts"
  | "workshop-papers";

export interface ContributionMeta {
  label: string;
  family: ContributionFamily;
}

export const contributions: Record<ContributionKey, ContributionMeta> = {
  journal: { label: "Journal Paper", family: "full-papers" },
  full: { label: "Full Paper", family: "full-papers" },
  short: { label: "Short Paper", family: "short-papers" },
  poster: {
    label: "Poster",
    family: "posters-and-extended-abstracts",
  },
  src: {
    label: "Student Research Competition",
    family: "posters-and-extended-abstracts",
  },
  lbw: {
    label: "Late-Breaking Work",
    family: "posters-and-extended-abstracts",
  },
  demo: { label: "Demo", family: "posters-and-extended-abstracts" },
  workshop: { label: "Workshop Paper", family: "workshop-papers" },
};

// Filter chips render in this order; empty families are hidden by the caller.
export const contributionFamilies: {
  key: ContributionFamily;
  label: string;
}[] = [
  { key: "full-papers", label: "Full Papers" },
  { key: "short-papers", label: "Short Papers" },
  { key: "posters-and-extended-abstracts", label: "Extended Abstracts" },
  { key: "workshop-papers", label: "Workshop Papers" },
];

const FALLBACK: ContributionMeta = {
  label: "Publication",
  family: "full-papers",
};

// contentlayer validates `contribution` against the enum at build time, so this
// fallback only guards against a schema/taxonomy drift.
export function getContribution(key: string | undefined): ContributionMeta {
  if (!key) return FALLBACK;
  return contributions[key as ContributionKey] ?? FALLBACK;
}
