import { toast } from "sonner";

type ValidationErrorNode = {
  _errors?: string[];
} & {
  [key: string]: ValidationErrorNode | string[] | undefined;
};

type ActionError = {
  error?: {
    serverError?: string;
    validationErrors?: Record<string, string[]>;
    thrownError?: Error;
  };
};

export function handleActionError(error: ActionError, context?: string) {
  const prefix = context ? `${context}: ` : "";

  if (error?.error?.serverError) {
    console.error(`${prefix}Server error:`, error.error.serverError);

    toast.error(
      error.error.serverError || "An unexpected server error occurred.",
    );

    return;
  }

  if (error?.error?.validationErrors) {
    console.error(`${prefix}Validation errors:`, error.error.validationErrors);

    const messages = Object.values(error.error.validationErrors)
      .flat()
      .join("\n");

    toast.error(messages || "Validation error occurred.");

    return;
  }

  console.error(`${prefix}Unknown error:`, error);
  toast.error("Something went wrong.");
}
