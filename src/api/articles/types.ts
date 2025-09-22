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

/* 기사 뷰 등록 */
export type ArticleId = string;
export type UserId = string;
export type AddArticleViewParams = {
  articleId: ArticleId;
  requestUserId: UserId;
};

/* 기사 뷰 등록 - 응답 래퍼 */
export type AddArticleViewResponse = {
  id: string;
  viewedBy: string;
  createdAt: string;
  articleId: string;
  source: ArticleSource;
  sourceUrl: string;
  articleTitle: string;
  articlePublishedDate: string;
  articleSummary: string;
  articleCommentCount: number;
  articleViewCount: number;
};

/* 뉴스 기사 목록 조회 */
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

/* 뉴스 기사 목록 조회 - 응답 래퍼 */
export type GetArticlesResponse = {
  content: ArticleListItem[];
  nextCursor: string | null;
  nextAfter: string | null;
  size: number;
  totalElements: number;
  hasNext: boolean;
};

/* 출처 목록 조회 */
export type ArticleSource = string;

/* 뉴스 복구 */
export type RestoreArticlesParams = {
  from: string;
  to: string;
};

/* 뉴스 복구 - 응답 래퍼 */
export type RestoreArticlesResponse = {
  restoreDate: string;
  restoredArticleIds: string[];
  restoredArticleCount: number;
};
