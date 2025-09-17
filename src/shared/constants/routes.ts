export const HISTORY_TABS = ["recent", "liked", "viewed"] as const;
export const DEFAULT_HISTORY_TAB: HistoryTab = "recent";
export type HistoryTab = (typeof HISTORY_TABS)[number];

export const ROUTES = {
  ROOT: "/",
  AUTH_LOGIN: "/login",
  AUTH_SIGNUP: "/signup",
  FEED: "/feed",
  HISTORY: "/history",
  INTERESTS: "/interests",
} as const;

export const historyPath = (tab: HistoryTab = DEFAULT_HISTORY_TAB) =>
  `${ROUTES.HISTORY}?tab=${tab}` as const;
