import likeDefault from "@/assets/icons/like-default.svg";
import likeActive from "@/assets/icons/like-active.svg";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import type { CommentId } from "@/types/ids";
import Input from "../../../components/Input";
import Button from "../../../components/button/Button";
import { useState } from "react";

interface CommentProps {
  userNickname: string;
  createdAt: Date;
  likeCount: number;
  content: string;
  isLiked: boolean;
  commentId: CommentId;
  isMyComment: boolean;
  onLikeClick: (commentId: CommentId) => void;
  onEditSave: (commentId: CommentId, newContent: string) => void;
  className?: string;
}

export default function Comment({
  userNickname,
  createdAt,
  likeCount,
  content,
  isLiked,
  onLikeClick,
  onEditSave,
  commentId,
  isMyComment,
  className,
}: CommentProps) {
  const [commentValue, setCommentValue] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  const handleHeartClick = () => {
    onLikeClick(commentId);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setCommentValue(content);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCommentValue(content);
  };

  const handleSaveEdit = () => {
    if (commentValue.trim()) {
      onEditSave(commentId, commentValue.trim());
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`w-full h-auto border-slate-300 py-4 px-4 bg-slate-100 rounded-lg ${className || ""}`}
    >
      <div className="flex justify-between pr-1 gap-2 mb-2.5">
        <div className="gap-1 flex items-center">
          <span className="text-14-m text-slate-500">{userNickname}</span>
          <span className="text-14-m text-slate-500 ">·</span>
          <span className="text-14-m text-slate-500">
            {formatDistanceToNow(createdAt, { addSuffix: true, locale: ko })}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* 본인 댓글이고 수정 모드가 아닐 때 수정 버튼 나오게 */}
          {isMyComment && !isEditing && (
            <button
              onClick={handleEditClick}
              className="text-14-r text-slate-400 hover:text-slate-600"
            >
              수정
            </button>
          )}

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

      {isMyComment && isEditing ? (
        <div className={`flex items-center gap-2.5 w-full`}>
          <Input
            inputSize="sm"
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
            className="flex-1"
          />
          <Button
            variant="tertiary"
            size="sm"
            className="w-16 mt-1"
            onClick={handleCancelEdit}
          >
            취소
          </Button>
          <Button size="sm" className="w-16 mt-1" onClick={handleSaveEdit}>
            수정
          </Button>
        </div>
      ) : (
        <div>
          <p className="text-16-r text-slate-700">{content}</p>
        </div>
      )}
    </div>
  );
}
