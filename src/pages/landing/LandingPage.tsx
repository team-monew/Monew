import LandingBox from "@/pages/landing/components/LandingBox";
/* 추후 로그인 기능 추가 시 경로 설정 '/' */

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
