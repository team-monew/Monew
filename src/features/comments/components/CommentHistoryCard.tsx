import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import subDirectoryIcon from "@/assets/icons/subdirectory.svg";
import likeDefault from "@/assets/icons/like-default.svg";
import likeActive from "@/assets/icons/like-active.svg";
import type { ArticleId, CommentId } from "@/types/ids";

interface CommentHistoryCardProps {
  mode?: "articles" | "activities";
  createdAt: Date;
  likeCount: number;
  content: string;
  isLiked: boolean;
  commentId: CommentId;
  articleId: ArticleId;
  title: string;
  onLikeClick?: (commentId: CommentId) => void;
  onTitleClick: (articleId: ArticleId) => void;
  className?: string;
}

export default function CommentHistoryCard({
  mode = "articles",
  createdAt,
  isLiked,
  likeCount,
  commentId,
  articleId,
  title,
  content,
  className,
  onLikeClick,
  onTitleClick,
}: CommentHistoryCardProps) {
  const handleHeartClick = () => {
    onLikeClick?.(commentId);
  };

  const handleTitleClick = () => {
    onTitleClick(articleId);
  };
  return (
    <div
      className={[
        "w-full h-auto px-8 pb-10 pt-8",

        mode === "articles"
          ? "bg-white border border-gray-300"
          : "bg-transparent border-none",

        className ?? "",
      ].join("")}
    >
      <div className="flex mb-5">
        <div>
          <button
            className="text-16-r text-cyan-500 hover:text-cyan-600 hover:underline cursor-pointer"
            onClick={handleTitleClick}
          >
            {title}
          </button>
          <span className="text-16-r">에 남긴 댓글</span>
        </div>
        <div className="flex gap-1 ml-1">
          <span className="text-14-m text-slate-500 mt-0.5">·</span>
          <span className="text-14-m text-slate-500 mt-0.5">
            {formatDistanceToNow(createdAt, { addSuffix: true, locale: ko })}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={subDirectoryIcon} className="w-6 h-6" alt="답글" />
          <span className="text-18-sb line-clamp-1">{content}</span>
        </div>
        <button
          onClick={handleHeartClick}
          className="flex justify-center items-center gap-2"
        >
          {isLiked ? (
            <img src={likeActive} className="w-6 h-6" alt="활성화 하트" />
          ) : (
            <img src={likeDefault} className="w-6 h-6" alt="비활성화 하트" />
          )}
          <p className="text-14-r text-slate-500">{likeCount}</p>
        </button>
      </div>
    </div>
  );
}
