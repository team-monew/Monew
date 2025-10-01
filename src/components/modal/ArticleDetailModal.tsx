import ModalLayout from "./ModalLayout";
import type { ArticleListItem } from "@/api/articles/types";
import Button from "../button/Button";
import SelectBox from "../SelectBox";
import Input from "../Input";
import CommentCard from "@/features/comments/components/CommentCard";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  addLikeComment,
  createComment,
  deleteComment,
  deleteLikeComment,
  getComments,
  updateComment,
} from "@/api/comments";
import { useAuthInfo } from "@/features/auth/hooks/useAuthInfo";
import type { CommentItem, CommentsOrderBy } from "@/api/comments/types";
import type { CommentId } from "@/types/ids";
import { toast } from "react-toastify";
import type { SortDirection } from "@/types/direction";
import { format } from "date-fns";
import Label from "../Label";
import naverLogo from "@/assets/logos/news/naver.svg";
import chosunLogo from "@/assets/logos/news/chosun-ilbo.svg";
import koreanLogo from "@/assets/logos/news/korean-economy.svg";
import yonhapLogo from "@/assets/logos/news/yonhap-news.svg";
import commentIcon from "@/assets/icons/comment.svg";
import useConfirmModal from "@/shared/hooks/useConfirmModal";
import ConfirmModal from "./ConfirmModal";
import { useNavigate } from "react-router";

interface ArticleDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ArticleListItem | null;
}

const SOURCE_LOGOS = {
  NAVER: naverLogo,
  YONHAP: yonhapLogo,
  CHOSUN: chosunLogo,
  KOREAN: koreanLogo,
} as const;

export default function ArticleDetailModal({
  isOpen,
  onClose,
  data,
}: ArticleDetailModalProps) {
  const navigate = useNavigate();
  const commentItems = ["등록순", "좋아요순"];

  const limit = 5;
  const [orderBy, setOrderBy] = useState<CommentsOrderBy>("createdAt");
  const orderByDisplayValue = orderBy === "createdAt" ? "등록순" : "좋아요순";
  const direction = "DESC" as SortDirection;

  const [comments, setComments] = useState<CommentItem[]>([]);

  const [writtenComment, setWrittenComment] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);

  const observerRef = useRef<IntersectionObserver>(null);
  const lastElementRef = useRef<HTMLDivElement>(null);

  const {
    isOpen: isConfirmOpen,
    openModal: openConfirmModal,
    onClose: closeConfirmModal,
    initialData: confirmData,
  } = useConfirmModal();

  const { userId } = useAuthInfo();

  const fetchInitialData = useCallback(async () => {
    setIsLoading(true);
    if (!data) return;
    try {
      const params = {
        articleId: data.id,
        orderBy,
        direction,
        limit,
      };
      const response = await getComments(params, userId);
      setComments(response.content);
      setHasNext(response.hasNext);
      setNextCursor(response.nextCursor);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [data, orderBy, userId]);

  const fetchMoreData = useCallback(async () => {
    if (!data || !hasNext || !userId || isLoading) return;

    setIsLoading(true);

    try {
      const params = {
        articleId: data.id,
        orderBy,
        direction,
        limit,
        cursor: nextCursor || undefined,
      };
      const response = await getComments(params, userId);
      setComments((prev) => [...prev, ...response.content]);
      setHasNext(response.hasNext);
      setNextCursor(response.nextCursor);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy, direction, limit, nextCursor, data, hasNext, isLoading, userId]);

  useEffect(() => {
    if (isOpen && data) {
      navigate(`/articles/${data.id}`, { replace: true });
    }
    fetchInitialData();
  }, [fetchInitialData, data, isOpen, navigate]);

  useEffect(() => {
    if (isLoading) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNext) {
          fetchMoreData();
        }
      },
      {
        threshold: 0.8,
      },
    );
    if (lastElementRef.current) {
      observerRef.current.observe(lastElementRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasNext, isLoading, fetchMoreData]);

  const handleCloseModal = () => {
    navigate("/articles");
    onClose();
  };

  const handleClick = () => {
    if (data) {
      window.open(data.sourceUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleApplyFilters = (value: string) => {
    if (value === "등록순") {
      setOrderBy("createdAt");
    } else if (value === "좋아요순") {
      setOrderBy("likeCount");
    }
  };

  const handleLikeClick = async (commentId: CommentId) => {
    try {
      const comment = comments.find((c) => c.id === commentId);
      if (!comment) return;

      if (comment.likedByMe) {
        await deleteLikeComment(commentId, userId);
      } else {
        await addLikeComment(commentId, userId);
      }

      await fetchInitialData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditSave = async (commentId: CommentId, newContent: string) => {
    try {
      await updateComment(commentId, { content: newContent }, userId);

      fetchInitialData();
      toast.success("댓글이 수정되었습니다.");
    } catch (error) {
      console.error(error);
      toast.error("댓글 수정 중 오류가 발생했습니다.");
    }
  };

  const handleAddComment = async (content: string) => {
    if (!data || !content.trim()) return;

    try {
      const params = {
        articleId: data.id,
        userId,
        content: content.trim(),
      };
      await createComment(params);

      setWrittenComment("");
      await fetchInitialData();
      toast.success("댓글 작성 완료");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (commentId: CommentId) => {
    openConfirmModal({
      title: "댓글 삭제",
      message: "정말 삭제하시겠습니까?",
      onConfirm: async () => {
        console.log("onConfirm 함수 실행 시작");

        try {
          console.log("deleteComment 호출 전");
          await deleteComment(commentId);
          console.log("deleteComment 호출 후");
          toast.success("댓글이 삭제되었습니다.");
          await fetchInitialData();
        } catch (error) {
          console.error(error);
          toast.error("댓글 삭제 중 오류가 발생했습니다.");
        }
      },
      confirmText: "삭제",
      cancelText: "취소",
    });
  };

  if (!isOpen || !data) return;

  const formattedDate = format(data.publishDate, "yyyy.MM.dd");
  const labelSrc = SOURCE_LOGOS[data.source as keyof typeof SOURCE_LOGOS] || "";

  return (
    <>
      <ModalLayout
        isOpen={isOpen}
        onClose={handleCloseModal}
        width="w-[894px]"
        noPadding={true}
        disableClose={isConfirmOpen}
      >
        <div className="h-auto rounded-tr-3xl rounded-tl-3xl pt-10 px-10 pb-6 bg-white">
          <div className="text-20-b text-slate-900 mb-2">{data.title}</div>

          <div className="flex items-center gap-4  pb-6 mb-6 border-b border-slate-200">
            <Label src={labelSrc} label={data.source} />
            <div className="flex items-center gap-3">
              <span className="text-14-r text-slate-400">{formattedDate}</span>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-1">
                <span className="text-14-r text-slate-400">읽음</span>
                <span className="text-14-r text-slate-400">
                  {data.viewCount}
                </span>
              </div>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-1">
                <img src={commentIcon} className="w-5 h-5" alt="댓글" />
                <span className="text-14-r text-slate-400">
                  {data.commentCount}
                </span>
              </div>
            </div>
          </div>
          <div className="text-18-r text-slate-500 mb-6">{data.summary}</div>

          <div className="mt-4 mb-10 border-b-slate-200">
            <Button
              size="sm"
              className="w-[162px]"
              variant="secondary"
              onClick={handleClick}
            >
              전체 기사 보러가기 →
            </Button>
          </div>
        </div>

        <div className="rounded-br-3xl rounded-bl-3xl pt-3 px-10 pb-8 bg-slate-100">
          <div className="mb-2 w-[110px]">
            <SelectBox
              items={commentItems}
              value={orderByDisplayValue}
              onChange={handleApplyFilters}
              placeholder="등록순"
              noBorder={true}
              textClassName="text-14-m text-slate-400"
              noBackground={true}
            />
          </div>
          <div className="flex items-center gap-2.5 mb-2">
            <Input
              placeholder="2025.01.01 부터"
              className="flex-1"
              value={writtenComment}
              onChange={(e) => setWrittenComment(e.target.value)}
            />
            <Button
              className="w-[92px]"
              onClick={() => handleAddComment(writtenComment)}
            >
              댓글 작성
            </Button>
          </div>
          <div>
            {comments.map((comment, index) => (
              <div
                key={comment.id}
                ref={index === comments.length - 1 ? lastElementRef : null}
              >
                <CommentCard
                  userNickname={comment.userNickname}
                  createdAt={new Date(comment.createdAt)}
                  likeCount={comment.likeCount}
                  content={comment.content}
                  isLiked={comment.likedByMe}
                  onLikeClick={handleLikeClick}
                  onEditSave={handleEditSave}
                  commentId={comment.id}
                  isMyComment={comment.userId === userId}
                  onDelete={handleDeleteComment}
                />
              </div>
            ))}
          </div>
        </div>
      </ModalLayout>
      {confirmData && (
        <ConfirmModal
          isOpen={isConfirmOpen}
          onClose={closeConfirmModal}
          onConfirm={confirmData.onConfirm}
          title={confirmData.title}
          message={confirmData.message}
          confirmText={confirmData.confirmText}
          cancelText={confirmData.cancelText}
        />
      )}
    </>
  );
}
