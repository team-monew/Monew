import { useEffect, useState } from "react";
import CommentHistoryCard from "@/features/comments/components/CommentHistoryCard";
import { getUserActivities } from "@/api/user-activities";
import type { ArticleId } from "@/types/ids";
import type { ActivityCommentLike } from "@/api/user-activities/types";
import { useAuthInfo } from "@/features/auth/hooks/useAuthInfo";
import Skeleton from "@/components/Skeleton";

type LikedCommentListProps = {
  onTitleClick: (articleId: ArticleId) => void;
  className?: string;
};

const PER_PAGE = 4;

export default function LikedCommentList({
  onTitleClick,
  className,
}: LikedCommentListProps) {
  const [items, setItems] = useState<ActivityCommentLike[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { userId } = useAuthInfo();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setError(null);
        const data = await getUserActivities(userId);
        const liked = (data.commentLikes ?? []).slice(0, PER_PAGE);
        if (!cancelled) setItems(liked);
      } catch {
        if (!cancelled) setError("좋아요한 댓글을 불러오지 못했습니다.");
      }
    })();

    return () => {
      cancelled = true;
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
        <p className="text-14-r text-slate-500">좋아요한 댓글이 없습니다.</p>
      </div>
    );
  }

  return (
    <ul className={["flex flex-col gap-4 divide-y divide-gray-300", className ?? ""].join(" ")}>
      {items.map((c) => (
        <li key={c.id}>
          <CommentHistoryCard
            mode="liked"
            createdAt={new Date(c.createdAt)}
            likeCount={c.commentLikeCount}
            content={c.commentContent}
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
