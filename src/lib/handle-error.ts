import { toast } from "sonner";

type ValidationErrorNode = {
  _errors?: string[];
} & {
  [key: string]: ValidationErrorNode | string[] | undefined;
};

type ActionError = {
  error?: {
    serverError?: string;
    validationErrors?: any;
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

    const messages: string[] = [];
    const extractErrors = (node: any) => {
      if (!node) return;
      if (Array.isArray(node)) {
        messages.push(...node);
        return;
      }
      if (typeof node === "object") {
        if (Array.isArray(node._errors)) {
          messages.push(...node._errors);
        }
        Object.entries(node).forEach(([key, val]) => {
          if (key !== "_errors") extractErrors(val);
        });
      }
    };

    extractErrors(error.error.validationErrors);
    const messageText = messages.join("\n");

    toast.error(messageText || "Validation error occurred.");

    return;
  }

  console.error(`${prefix}Unknown error:`, error);
  toast.error("Something went wrong.");
}
