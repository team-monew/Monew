import { http } from "@/lib/http";

export type Article = {
  id: string;
  viewedBy: string;
  createdAt: string;
  articleId: string;
  source: string;
  sourceUrl: string;
  articleTitle: string;
  articlePublishedDate: string;
  articleSummary: string;
  articleCommentCount: number;
  articleViewCount: number;
};
