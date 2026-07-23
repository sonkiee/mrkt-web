import { cn } from "@/utils/cn";

interface SpinnerProps {
  infoText?: string | null;
  subText?: string | null;
  variant?: "inline" | "full-page";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Spinner({
  infoText = "Loading details",
  subText = "Please wait a moment...",
  variant = "inline",
  size = "md",
  className,
}: SpinnerProps) {
  const sizeClasses = {
    sm: "h-5 w-5 border-2",
    md: "h-10 w-10 border-2",
    lg: "h-16 w-16 border-4",
  };

  const hasInfoText = infoText !== null && infoText !== "";
  const hasSubText = subText !== null && subText !== "";

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center gap-4",
        variant === "full-page"
          ? "min-h-screen w-full bg-surface-background p-4"
          : "w-full h-full min-h-[150px] p-6",
        className
      )}
    >
      <div
        className={cn(
          "animate-spin rounded-full border-muted border-t-primary",
          sizeClasses[size]
        )}
        role="status"
        aria-label={infoText || "Loading..."}
      />

      {(hasInfoText || hasSubText) && (
        <div>
          {hasInfoText && (
            <p
              className={cn(
                "font-semibold text-on-surface",
                size === "sm" ? "text-xs" : "text-sm"
              )}
            >
              {infoText}
            </p>
          )}

          {hasSubText && (
            <p
              className={cn(
                "text-on-surface-variant",
                size === "sm" ? "text-[10px]" : "text-xs",
                hasInfoText && "mt-1"
              )}
            >
              {subText}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

