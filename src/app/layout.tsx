import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";
// import { CartIcon } from "@/components/cart-icon";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { Suspense } from "react";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechGadgets - Your One-Stop Gadget Shop",
  description: "Shop the latest smartphones, laptops, and tech accessories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
      </head>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <ReactQueryProvider>
          <Suspense
            fallback={
              <div className="fixed top-4 right-4">{/* <CartIcon /> */}</div>
            }
          >
            {children}
            {/* <CartIcon /> */}
          </Suspense>
        </ReactQueryProvider>

        <Analytics />
        <Toaster position="top-center" duration={3000} />
        {/* <AuthGateListener /> */}
      </body>
    </html>
  );
}
