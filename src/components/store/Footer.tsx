import Link from "next/link";

export function StoreFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Shop</h3>
            <ul className="grid gap-2">
              <li>
                <Link
                  href="/category/smartphones"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Smartphones
                </Link>
              </li>
              <li>
                <Link
                  href="/category/laptops"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Laptops
                </Link>
              </li>
              <li>
                <Link
                  href="/category/tablets"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Tablets
                </Link>
              </li>
              <li>
                <Link
                  href="/category/accessories"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Support</h3>
            <ul className="grid gap-2">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Returns & Exchanges
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Company</h3>
            <ul className="grid gap-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <address className="not-italic">
              <p className="text-sm text-muted-foreground">123 Tech Street</p>
              <p className="text-sm text-muted-foreground">
                San Francisco, CA 94107
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                support@techgadgets.com
              </p>
              <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
            </address>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} TechGadgets. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
