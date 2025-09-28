import NewsCard from "@/features/articles/components/NewsCard";

function ArticlesPage() {
  // 테스트 데이터
  const testArticles = [
    {
      id: "678a8a00-0395-44af-ac37-d7dbaf25c70f",
      source: "NAVER",
      sourceUrl: "http://view.koreaherald.com/kh/view.php?ud=20130227000947",
      title: "'돌풍' SK 나이츠, 정규시즌 우승 초읽기",
      publishDate: "2013-02-27T18:03:00",
      summary:
        '프로농구 서울 SK 나이츠가 구단 역사상 최초의 정규시즌 우승을 앞두고 위한... Some fans called their misfortune the "curse of Seo," in reference to a string of bad luck that struck them...',
      commentCount: 0,
      viewCount: 0,
      viewedByMe: false,
    },
    {
      id: "750a932a-a384-4b20-8bfd-ad81925dca54",
      source: "NAVER",
      sourceUrl: "http://www.newsen.com/news_view.php?uid=201312120752332410",
      title: '정준하 다이어트 비법 공개 "과도하지 않아"',
      publishDate: "2013-12-12T07:59:00",
      summary:
        '전 그저 열심히 운동하고 음식관리하며(몸에 좋은 음식 먹고) 비타민이나 필수 아미노산 등 꼭 필요한 영양제 챙겨먹고 그러거든요"라고 알렸다. 정준하는 이어 "너무 걱정하지들 마시고 멀리 내다봅시다 우리. 다들...',
      commentCount: 0,
      viewCount: 0,
      viewedByMe: false,
    },
    {
      id: "981d2b49-fedb-4f58-af1e-e30d63796a97",
      source: "NAVER",
      sourceUrl:
        "http://magazine.joins.com/monthly/article_view.asp?aid=300972",
      title:
        "작가 윤고은의 호기심 취재파일 - 요즘 젊은이들이 꿈꾸는 '연애의 기...",
      publishDate: "2014-03-19T16:56:00",
      summary:
        "한때 '지식in'과 같은 포털사이트의 열린 공간에 연애상담을 하는 이들이 정말 이해되지 않았지만, 고백하... 그러다 마흔이 가까워지면 결혼하라는 압박이 들어오고 하니 소개팅도 해보고 결혼정보회사 통해서 사람도...",
      commentCount: 1,
      viewCount: 7,
      viewedByMe: false,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-32-b text-slate-900 mb-8">Articles</h1>

      <div className="space-y-6">
        {testArticles.map((article) => (
          <NewsCard
            key={article.id}
            title={article.title}
            summary={article.summary}
            source={article.source}
            sourceUrl={article.sourceUrl}
            publishDate={new Date(article.publishDate)}
            viewCount={article.viewCount}
            commentCount={article.commentCount}
          />
        ))}
      </div>
    </div>
  );
}

export default ArticlesPage;
