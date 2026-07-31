import siteMetadata from "@/data/siteMetadata";
import headerNavLinks from "@/data/headerNavLinks";
import Link from "./Link";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="flex items-center justify-between py-6 sm:py-6">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          {typeof siteMetadata.headerTitle === "string" ? (
            <div className="text-2xl font-semibold">
              {siteMetadata.headerTitle}
            </div>
          ) : (
            siteMetadata.headerTitle
          )}
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== "/")
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="hidden font-medium text-gray-900 hover:text-primary-500
 sm:block"
            >
              {link.title}
            </Link>
          ))}
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
