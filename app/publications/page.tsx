import PublicationLayout from "@/layouts/PublicationsLayout";
import { genPageMetadata } from "app/seo";
import PublicationsClient from "./PublicationsClient";

export const metadata = genPageMetadata({ title: "Publications" });

export default function Page() {
  return (
    <PublicationLayout
      title="Publications"
      description="Conference Proceedings, Lightly Reviewed Papers, Posters, and Extended Abstracts"
    >
      <PublicationsClient />
    </PublicationLayout>
  );
}
