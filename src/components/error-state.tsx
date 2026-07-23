import { AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export const ErrorState = ({
  title,
  message,
}: {
  title: string;
  message: string;
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-surface-background">
      <div className="max-w-sm space-y-4 text-center bg-white p-6 rounded-xl border border-outline-variant/30 shadow-soft">
        <AlertCircle className="mx-auto text-status-error" size={40} />
        <h2 className="text-headline-md font-bold text-on-surface">
          {title ?? "An error occurred"}
        </h2>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          {message ??
            "We encountered an unexpected error while processing your request. Please try again later."}
        </p>
        <Button asChild className="bg-primary text-on-primary">
          <Link href="/">Try Again</Link>
        </Button>
      </div>
    </div>
  );
};
