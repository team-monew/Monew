import { useUserActivitiesList } from "@/features/activities/hooks/useUserActivitiesList";
import NewsCard from "@/features/articles/components/NewsCard";
import EmptyState from "@/components/EmptyState";
import Skeleton from "@/components/Skeleton";
import type { ArticleListItem } from "@/api/articles/types";
import { useNavigate } from "react-router";

export default function ViewedArticleList() {
  const { items, error, loading, empty } = useUserActivitiesList(
    "viewedArticles",
    10,
  );

  const navigate = useNavigate();

  if (error) {
    return <p className="text-14-r text-error">{error}</p>;
  }
  if (loading) {
    return <Skeleton height="132px" />;
  }
  if (empty) {
    return (
      <div className="min-h-[600px]">
        <EmptyState message="최근 본 기사가 없습니다." />
      </div>
    );
  }

  const handleNewsCardClick = (article: ArticleListItem) => {
    navigate(`/articles/${article.id}`, {
      state: { article },
    });
  };

  return (
    <ul className="flex flex-col gap-4 divide-y divide-gray-300">
      {items.map((a) => {
        const article: ArticleListItem = {
          id: a.id,
          title: a.articleTitle,
          summary: a.articleSummary,
          source: a.source,
          sourceUrl: a.sourceUrl,
          publishDate: a.articlePublishedDate,
          viewCount: a.articleViewCount,
          commentCount: a.articleCommentCount,
          viewedByMe: true,
        };

        return (
          <li key={a.id}>
            <NewsCard
              article={article}
              onClick={() => handleNewsCardClick(article)}
            />
          </li>
        );
      })}
    </ul>
  );
}
