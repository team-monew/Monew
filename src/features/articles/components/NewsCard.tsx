import Label from "@/components/Label";
import naverLogo from "@/assets/logos/news/naver.svg";
import chosunLogo from "@/assets/logos/news/chosun-ilbo.svg";
import koreanLogo from "@/assets/logos/news/korean-economy.svg";
import yonhapLogo from "@/assets/logos/news/yonhap-news.svg";
import commentIcon from "@/assets/icons/comment.svg";
import { format } from "date-fns";

interface NewsCardProps {
  title: string;
  summary: string;
  source: string;
  sourceUrl: string;
  publishDate: Date;
  viewCount: number;
  commentCount: number;
}

const SOURCE_LOGOS = {
  NAVER: naverLogo,
  YONHAP: yonhapLogo,
  CHOSUN: chosunLogo,
  KOREAN: koreanLogo,
} as const;

export default function NewsCard({
  title,
  summary,
  source,
  sourceUrl,
  publishDate,
  viewCount,
  commentCount,
}: NewsCardProps) {
  const labelSrc = SOURCE_LOGOS[source as keyof typeof SOURCE_LOGOS] || "";

  const formattedDate = format(publishDate, "yyyy.MM.dd");

  const handleClick = () => {
    window.open(sourceUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="max-w-4xl w-auto min-h-48 h-auto cursor-pointer"
      onClick={handleClick}
    >
      <div className="my-6 mx-1">
        <div className="text-20-b text-slate-900 mb-2">{title}</div>
        <div className="text-18-r text-slate-500 mb-6">{summary}</div>
        <div className="flex justify-between items-center">
          <Label src={labelSrc} label={source} />
          <div className="flex items-center gap-3">
            <span className="text-14-r text-slate-400">{formattedDate}</span>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1">
              <span className="text-14-r text-slate-400">읽음</span>
              <span className="text-14-r text-slate-400">{viewCount}</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1">
              <img src={commentIcon} className="w-5 h-5" alt="댓글" />
              <span className="text-14-r text-slate-400">{commentCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
