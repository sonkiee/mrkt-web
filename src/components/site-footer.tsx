import Link from "next/link";

const footerSections = [
  {
    title: "Shop",
    links: [
      { label: "Store Locator", href: "/" },
      { label: "Refurbished Items", href: "/category/refurbished" },
      { label: "Special Offers", href: "/category/deals" },
      { label: "Gift Cards", href: "/gift-cards" },
      { label: "New Arrivals", href: "/category/new" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Support", href: "/contact" },
      { label: "Warranty Info", href: "/warranty" },
      { label: "Shipping & Returns", href: "/shipping" },
      { label: "Repair Status", href: "/repair-status" },
      { label: "Help Center", href: "/help-center" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Sell with Us", href: "/vendor-onboarding" },
    ],
  },
];

const socialIcons = [
  { icon: "brand_awareness", label: "Facebook", href: "#" },
  { icon: "public", label: "Instagram", href: "#" },
  { icon: "chat", label: "Twitter/X", href: "#" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/20 mt-0">
      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-headline-md font-bold text-primary inline-block"
            >
              Lumina
            </Link>
            <p className="text-body-md text-on-surface-variant max-w-xs leading-relaxed">
              Elevating your digital lifestyle with premium tech, repairs, and
              accessories. Kaduna's most trusted marketplace since 2019.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3 mt-1">
              {socialIcons.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/30 transition-colors"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                    {s.icon}
                  </span>
                </Link>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-2">
              <p className="text-label-sm uppercase tracking-wider text-on-surface mb-2 font-semibold">
                Get deals in your inbox
              </p>
              <div className="flex gap-2 max-w-xs">
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 bg-white border border-outline-variant/50 rounded-lg px-3 py-2 text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-1 focus:ring-primary/10 outline-none"
                />
                <button className="px-3 py-2 bg-primary text-white rounded-lg text-label-md font-semibold hover:opacity-90 transition-opacity whitespace-nowrap">
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <h4 className="text-headline-md font-semibold text-on-surface">
                {section.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-body-md text-on-surface-variant hover:text-on-surface hover:translate-x-1 transition-all duration-200 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-label-md text-on-surface-variant">
            © {new Date().getFullYear()} Lumina Tech & Repairs. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-label-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: 14 }}>
              verified
            </span>
            Verified Marketplace · Secure Payments · Authentic Products
          </div>
        </div>
      </div>
    </footer>
  );
}
