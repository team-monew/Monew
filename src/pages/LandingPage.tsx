function LandingBox() {
  return <div></div>;
}

export default function LandingPage() {
  return (
    <main>
      <div>내가 원하는 모든 뉴스, 모뉴</div>
      <div className="md:flex flex-col">
        <LandingBox />
        <LandingBox />
        <LandingBox />
      </div>
      <button>지금 시작하기</button>
    </main>
  );
}
