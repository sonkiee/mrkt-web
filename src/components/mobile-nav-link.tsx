import Link from "next/link";

type MobileNavLink = {
  href: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  children: React.ReactNode;
};

export function MobileNavLink({ href, onClick, children }: MobileNavLink) {
  return (
    <Link
      href={href}
      className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
