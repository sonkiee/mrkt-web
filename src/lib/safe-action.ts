import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";

export const actionClient = createSafeActionClient({
  handleServerError(error) {
    console.error("Server Action Error occurred:", error);
    if (error instanceof Error) return error.message;
    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});
