import Link from "./Link";
import siteMetadata from "@/data/siteMetadata";
import SocialIcon from "@/components/social-icons";
import MailIcon from "@/components/MailIcon";

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <MailIcon
            user={siteMetadata.emailUser}
            domain={siteMetadata.emailDomain}
            size={6}
          />
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          <SocialIcon kind="scholar" href={siteMetadata.scholar} size={6} />
          <SocialIcon kind="cv" href={siteMetadata.cv} size={6} />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} />
          <SocialIcon kind="x" href={siteMetadata.x} size={6} />
          <SocialIcon kind="threads" href={siteMetadata.threads} size={6} />
        </div>
        <div className="mb-2 text-sm text-gray-500">
          {`© ${new Date().getFullYear()} `}
          <Link href="/" className="hover:text-primary-500">
            {siteMetadata.author}
          </Link>
          . All rights reserved.
        </div>
      </div>
    </footer>
  );
}
