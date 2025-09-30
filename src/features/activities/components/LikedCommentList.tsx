import { useUserActivitiesList } from "@/features/activities/hooks/useUserActivitiesList";
import type { ArticleId } from "@/types/ids";
import CommentHistoryCard from "@/features/comments/components/CommentHistoryCard";
import Skeleton from "@/components/Skeleton";

type LikedCommentListProps = {
  onTitleClick: (articleId: ArticleId) => void;
};

export default function LikedCommentList({
  onTitleClick,
}: LikedCommentListProps) {
  const { items, error, loading, empty } = useUserActivitiesList(
    "likedComments",
    4
  );

  if (error) {
    return <p className="text-14-r text-error">{error}</p>;
  }
  if (loading) {
    return <Skeleton height="132px" />;
  }
  if (empty) {
    return (
      <p className="text-14-r text-slate-500">아직 좋아요한 댓글이 없습니다.</p>
    );
  }

  return (
    <ul className="flex flex-col gap-4 divide-y divide-gray-300">
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
