import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Oops! - Not found",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl text-gray-600">Oops! Page Not Found.</p>

      <Link href="/" className="mt-2 text-blue-500 hover:underline">
        Go back
      </Link>
      {/* <Link href="/" className="mt-2 text-blue-500 hover:underline">
        Go to Homepage
      </Link> */}
    </div>
  );
}
