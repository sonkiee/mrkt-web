import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export const EmptyState = ({
  title = "Product Not Found",
  message = "The product catalog item might have been unlisted or removed by the vendor storefront.",
}: {
  title?: string;
  message?: string;
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-surface-background">
      <div className="max-w-sm space-y-4 text-center bg-white p-6 rounded-xl border border-outline-variant/30 shadow-soft">
        <AlertCircle className="mx-auto text-status-error" size={40} />
        <h2 className="text-headline-md font-bold text-on-surface">
          {title}
        </h2>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          {message}
        </p>
        <Button asChild className="bg-primary text-on-primary">
          <Link href="/">Back to Marketplace</Link>
        </Button>
      </div>
    </div>
  );
};
