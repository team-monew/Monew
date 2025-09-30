import { useEffect, useState } from "react";
import NewsCard from "@/features/articles/components/NewsCard";
import { getUserActivities } from "@/api/user-activities";
import type { ActivityArticleView } from "@/api/user-activities/types";
import { useAuthInfo } from "@/features/auth/hooks/useAuthInfo";
import Skeleton from "@/components/Skeleton";

// 각 카드 클릭 시 해당 기사 상세 모달 오픈(NewsCard propsdp onClick 추가되면 수정)
type ViewedArticleListProps = {
  className?: string;
};

const PER_PAGE = 5;

export default function ViewedArticleList({
  className,
}: ViewedArticleListProps) {
  const [items, setItems] = useState<ActivityArticleView[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { userId } = useAuthInfo();

  useEffect(() => {
    let isActive = true;

    (async () => {
      setError(null);

      try {
        const data = await getUserActivities(userId);
        const viewed = (data.articleViews ?? []).slice(0, PER_PAGE);
        if (!isActive) return;
        setItems(viewed);
      } catch {
        if (!isActive) setError("최근 본 기사를 불러오지 못했습니다.");
      }
    })();

    return () => {
      isActive = false;
    };
  }, [userId]);

  if (error) {
    return (
      <div className={className}>
        <p className="text-14-r text-error">{error}</p>
      </div>
    );
  }
  if (items === null) {
    return <Skeleton height="132px" />;
  }
  if (items.length === 0) {
    return (
      <div className={className}>
        <p className="text-14-r text-slate-500">최근 본 기사가 없습니다.</p>
      </div>
    );
  }

  return (
    <ul
      className={[
        "flex flex-col gap-4 divide-y divide-gray-300",
        className ?? "",
      ].join(" ")}
    >
      {items.map((a) => (
        <li key={a.id}>
          <NewsCard
            title={a.articleTitle}
            summary={a.articleSummary}
            source={a.source}
            sourceUrl={a.sourceUrl}
            publishDate={a.articlePublishedDate}
            viewCount={a.articleViewCount}
            commentCount={a.articleCommentCount}
          />
        </li>
      ))}
    </ul>
  );
}
