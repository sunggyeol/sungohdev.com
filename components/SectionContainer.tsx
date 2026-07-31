import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function SectionContainer({ children }: Props) {
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-5xl lg:px-8 xl:max-w-6xl 2xl:max-w-7xl">
      {children}
    </section>
  );
}
