import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Breadcrumbs({
  items,
}: {
  items?: Array<{ label: string; href?: string }>;
}) {
  const pathname = usePathname();

  let crumb: React.ReactNode;

  if (items) {
    crumb = items
      .map((item) =>
        item.href ? (
          <Link
            key={item.label}
            href={item.href}
            className="hover:text-foreground"
          >
            {item.label}
          </Link>
        ) : (
          <span key={item.label} className="font-medium text-foreground">
            {item.label}
          </span>
        ),
      )
      .reduce((prev, curr) => (
        <>
          {prev} ⟩ {curr}
        </>
      ));
  } else {
    crumb = pathname
      .split("/")
      .filter(Boolean)
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(" ⟩ ");
  }

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Link href="/" className="hover:text-foreground">
        Home
      </Link>
      ⟩ <span className="font-medium text-foreground">{crumb}</span>
    </div>
  );
}
