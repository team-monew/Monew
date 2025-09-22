import { http } from "@/lib/http";

export type ArticleListItem = {
  id: string;
  source: string;
  sourceUrl: string;
  title: string;
  publishDate: string;
  summary: string;
  commentCount: number;
  viewCount: number;
  viewedByMe: boolean;
};

/* 기사 정렬 아이템 */
export type ArticlesOrderBy = "publishDate" | "viewCount" | "commentCount";
export type SortDirection = "ASC" | "DESC"; // 오름차순, 내림차순

/* 기사 목록 조회 */
export type GetArticlesParams = {
  keyword?: string;
  interestId?: string;
  sourceIn?: string[];
  publishDateFrom?: string;
  publishDateTo?: string;
  orderBy: ArticlesOrderBy;
  direction: SortDirection;
  cursor?: string;
  after?: string;
  limit: number;
};

/* 응답 래퍼 */
export type GetArticlesResponse = {
  content: ArticleListItem[];
  nextCursor: string | null;
  nextAfter: string | null;
  size: number;
  totalElements: number;
  hasNext: boolean;
};

export async function getArticles(
  params: GetArticlesParams,
  requestUserId: string
): Promise<GetArticlesResponse> {
  const { data } = await http.get<GetArticlesResponse>("/articles", {
    params,
    headers: { "Monew-Request-User-ID": requestUserId },
  });
  return data;
}
