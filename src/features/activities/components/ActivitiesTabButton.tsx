import { NavLink } from "react-router";
import { activitiesPath, ACTIVITIES_TABS } from "@/shared/constants/routes";

type ActivitiesTabButtonVariant =
  | "recentComments"
  | "likeComments"
  | "viewedArticles";

const ACTIVITIES_TAB_BUTTON_TEXT: Record<ActivitiesTabButtonVariant, string> = {
  recentComments: "최근 작성한 댓글",
  likeComments: "좋아요한 댓글",
  viewedArticles: "최근 본 기사",
};

const TAB_TO_PATH: Record<ActivitiesTabButtonVariant, string> = {
  recentComments: activitiesPath(ACTIVITIES_TABS[0]),
  likeComments: activitiesPath(ACTIVITIES_TABS[1]),
  viewedArticles: activitiesPath(ACTIVITIES_TABS[2]),
};

type ActivitiesTabButtonProps = {
  variant: ActivitiesTabButtonVariant;
  className?: string;
};

export default function ActivitiesTabButton({
  variant,
  className,
}: ActivitiesTabButtonProps) {
  return (
    <NavLink
      to={TAB_TO_PATH[variant]}
      className={({ isActive }) =>
        [
          "inline-flex items-center gap-2.5 p-2.5 bg-gray-100 rounded-lg transition",
          isActive
            ? "bg-white text-black md:text-16-sb text-14-sb"
            : "text-gray-500 hover:bg-gray-100 md:text-16-m text-14-m",
          className ?? "",
        ].join(" ")
      }
    >
      {ACTIVITIES_TAB_BUTTON_TEXT[variant]}
    </NavLink>
  );
}
