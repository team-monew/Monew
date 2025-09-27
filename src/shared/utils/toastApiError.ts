import { toast } from "react-toastify";
import { normalizeError } from "@/shared/lib/http";

export const toastApiError = (error: unknown) => {
  toast.error(normalizeError(error).message);
};
