import axios from "axios";

export const http = axios.create({
  baseURL: "/api/sb/monew/api",
  headers: { "Content-Type": "application/json" },
});

if (import.meta.env.DEV) {
  http.interceptors.request.use((cfg) => {
    console.log(
      `[REQ] ${cfg.method?.toUpperCase()} ${cfg.baseURL}${cfg.url}`,
      cfg.data
    );
    return cfg;
  });
  http.interceptors.response.use(
    (res) => {
      console.log(`[RES] ${res.status} ${res.config.url}`, res.data);
      return res;
    },
    (err) => {
      console.warn(
        `[ERR] ${err?.response?.status} ${err?.config?.url}`,
        err?.response?.data
      );
      return Promise.reject(err);
    }
  );
}

/* -----에러 정규화 유틸----- */

export const getDataMessage = (data: unknown): string | undefined => {
  if (typeof data === "string") return data;
  if (data && typeof data === "object" && "message" in data) {
    const msg = (data as { message?: unknown }).message;
    return typeof msg === "string" ? msg : undefined;
  }
  return undefined;
};

export const normalizeError = (err: unknown): Error => {
  if (axios.isAxiosError(err)) {
    const res = err.response;
    const msg =
      getDataMessage(res?.data) ??
      res?.statusText ??
      err.message ??
      "Request failed";
    return new Error(msg);
  }
  return err instanceof Error ? err : new Error("Unknown error");
};
