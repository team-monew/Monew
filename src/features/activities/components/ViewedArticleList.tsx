import { useUserActivitiesList } from "@/features/activities/hooks/useUserActivitiesList";
import NewsCard from "@/features/articles/components/NewsCard";
import EmptyState from "@/components/EmptyState";
import Skeleton from "@/components/Skeleton";

export default function ViewedArticleList() {
  const { items, error, loading, empty } = useUserActivitiesList(
    "viewedArticles",
    5,
  );

  if (error) {
    return <p className="text-14-r text-error">{error}</p>;
  }
  if (loading) {
    return <Skeleton height="132px" />;
  }
  if (empty) {
    return <EmptyState message="최근 본 기사가 없습니다." />;
  }

  return (
    <ul className="flex flex-col gap-4 divide-y divide-gray-300">
      {items.map((a) => (
        <li key={a.id}>
          <NewsCard
            title={a.articleTitle}
            summary={a.articleSummary}
            source={a.source}
            sourceUrl={a.sourceUrl}
            publishDate={a.articlePublishedDate}
            viewCount={a.articleViewCount}
            commentCount={a.articleCommentCount}
          />
        </li>
      ))}
    </ul>
  );
}
