import { useUserActivitiesList } from "@/features/activities/hooks/useUserActivitiesList";
import type { ActivityComment } from "@/api/user-activities/types";
import CommentHistoryCard from "@/features/comments/components/CommentHistoryCard";
import EmptyState from "@/components/EmptyState";
import Skeleton from "@/components/Skeleton";

export default function LikedCommentList() {
  const { items, error, loading, empty } = useUserActivitiesList(
    "likedComments",
    4,
  );

  if (error) {
    return <p className="text-14-r text-error">{error}</p>;
  }
  if (loading) {
    return <Skeleton height="132px" />;
  }
  if (empty) {
    return <EmptyState message="아직 좋아요한 댓글이 없습니다." />;
  }

  return (
    <ul className="flex flex-col gap-4 divide-y divide-gray-300">
      {items.map((c) => {
        const normalized = {
          id: c.commentId,
          articleId: c.articleId,
          articleTitle: c.articleTitle,
          userId: c.commentUserId,
          userNickname: c.commentUserNickname,
          content: c.commentContent,
          likeCount: c.commentLikeCount,
          createdAt: c.commentCreatedAt,
        } satisfies ActivityComment;

        return (
          <li key={c.id}>
            <CommentHistoryCard mode="liked" isLiked={true} {...normalized} />
          </li>
        );
      })}
    </ul>
  );
}
