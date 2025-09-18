export const activities_TABS = ["recent", "liked", "viewed"] as const;
export const DEFAULT_activities_TAB: activitiesTab = "recent";
export type activitiesTab = (typeof activities_TABS)[number];

export const ROUTES = {
  ROOT: "/",
  AUTH_LOGIN: "/login",
  AUTH_SIGNUP: "/signup",
  articles: "/articles",
  activities: "/activities",
  INTERESTS: "/interests",
} as const;

export const activitiesPath = (tab: activitiesTab = DEFAULT_activities_TAB) =>
  `${ROUTES.activities}?tab=${tab}` as const;
