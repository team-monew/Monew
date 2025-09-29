import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import ProfileCard from "@/features/activities/components/ProfileCard";
import SubscriptionPanel from "@/features/activities/components/SubscriptionPanel";
import ActivitiesTabs from "@/features/activities/components/ActivitiesTabs";
import RecentCommentList from "@/features/activities/components/RecentCommentList";
import LikedCommentList from "@/features/activities/components/LikedCommentList";
import {
  ACTIVITIES_TABS,
  DEFAULT_ACTIVITIES_TAB,
} from "@/shared/constants/routes";
import type { ArticleId } from "@/types/ids";
import { ROUTES } from "@/shared/constants/routes";

export default function ActivitiesPage() {
  const [sp, setSp] = useSearchParams();
  const navigate = useNavigate();

  const tab = (sp.get("tab") ??
    DEFAULT_ACTIVITIES_TAB) as (typeof ACTIVITIES_TABS)[number];
  const isValid = (ACTIVITIES_TABS as readonly string[]).includes(tab);

  // 잘못된 tab일 경우 기본값으로 교정
  useEffect(() => {
    if (!isValid) {
      setSp({ tab: DEFAULT_ACTIVITIES_TAB }, { replace: true });
    }
  }, [isValid, setSp]);

  const handleTitleClick = (articleId: ArticleId) => {
    navigate(ROUTES.ARTICLES + `/${articleId}`);
  };

  return (
    <div className="flex justify-center gap-6 w-full px-4 overflow-x-auto">
      <div className="flex flex-col gap-4">
        <ProfileCard />
        <SubscriptionPanel />
      </div>

      <div className="flex flex-col">
        <ActivitiesTabs />
        {/* 탭별 콘텐츠 */}
        <div className="mt-6 flex flex-col gap-4">
          {tab === "recent" && (
            <RecentCommentList onTitleClick={handleTitleClick} />
          )}

          {tab === "liked" && (
            <LikedCommentList onTitleClick={handleTitleClick} />
          )}

          {tab === "viewed" && <div>최근 본 기사 탭 (구현 예정)</div>}
        </div>
      </div>
    </div>
  );
}
