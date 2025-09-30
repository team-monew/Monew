import { useEffect, useState } from "react";
import CommentHistoryCard from "@/features/comments/components/CommentHistoryCard";
import { getUserActivities } from "@/api/user-activities";
import type { ArticleId } from "@/types/ids";
import type { ActivityComment } from "@/api/user-activities/types";
import { useAuthInfo } from "@/features/auth/hooks/useAuthInfo";
import Skeleton from "@/components/Skeleton";

type RecentCommentListProps = {
  onTitleClick: (articleId: ArticleId) => void;
};

const PER_PAGE = 4;

export default function RecentCommentList({
  onTitleClick,
}: RecentCommentListProps) {
  const [items, setItems] = useState<ActivityComment[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { userId } = useAuthInfo();

  useEffect(() => {
    let isActive = true;

    (async () => {
      setError(null);

      try {
        const data = await getUserActivities(userId);
        const recent = (data.comments ?? []).slice(0, PER_PAGE);
        if (!isActive) return;

        setItems(recent);
      } catch {
        if (!isActive) setError("최근 댓글을 불러오지 못했습니다.");
      }
    })();

    return () => {
      isActive = false;
    };
  }, [userId]);

  if (error) {
    return <p className="text-14-r text-error">{error}</p>;
  }
  if (items === null) {
    return <Skeleton height="132px" />;
  }
  if (items.length === 0) {
    return (
      <p className="text-14-r text-slate-500">최근 작성한 댓글이 없습니다.</p>
    );
  }

  return (
    <ul className="flex flex-col gap-4 divide-y divide-gray-300">
      {items.map((c) => (
        <li key={c.id}>
          <CommentHistoryCard
            mode="recent"
            createdAt={new Date(c.createdAt)}
            likeCount={c.likeCount}
            content={c.content}
            isLiked={false}
            commentId={c.id}
            articleId={c.articleId}
            title={c.articleTitle}
            onTitleClick={onTitleClick}
          />
        </li>
      ))}
    </ul>
  );
}
