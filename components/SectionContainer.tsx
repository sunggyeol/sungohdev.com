import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function SectionContainer({ children }: Props) {
  // Caps at max-w-6xl (1152px), which leaves the bio column ~430px wide. Wider
  // than that and the bio wraps to too few lines, ending well above the profile
  // and News columns and leaving a ragged block of whitespace across the hero.
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-5xl lg:px-8 xl:max-w-6xl">
      {children}
    </section>
  );
}
