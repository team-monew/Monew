import LandingBox from "@/components/LandingBox";
import Button from "@/components/button/Button";
import { useAuthInfo } from "@/features/auth/hooks/useAuthInfo";
import { Link } from "react-router";
import { ROUTES } from "@/shared/constants/routes";
import firstImageUrl from "@/assets/images/landing_interests.png";
import secondImageUrl from "@/assets/images/landing_notifications.png";
import thirdImageUrl from "@/assets/images/landing_comments.png";

export default function LandingPage() {
  const { user } = useAuthInfo();
  const link = user ? ROUTES.ARTICLES : ROUTES.AUTH_LOGIN;

  return (
    <div className="flex flex-col items-center px-4 w-full">
      <h2 className="sm:mb-10 mb-6 text-center sm:text-[32px] text-[18px]">
        마음대로 골라 보는 모든 뉴스
        <p className="sm:text-[36px] text-[24px] font-bold text-cyan-500">
          모뉴
        </p>
      </h2>

      <div className="lg:flex-row flex flex-col justify-center items-center gap-6 w-full">
        <LandingBox
          imageSrc={firstImageUrl}
          imageAlt="관심사 목록"
          description="관심사를 등록해보세요"
          containerClassName="bg-cyan-100 border-3 border-cyan-400"
          descriptionClassName="text-cyan-500"
        />
        <LandingBox
          imageSrc={secondImageUrl}
          imageAlt="알림 목록"
          description="키워드에 맞는 뉴스가 수집돼요"
          containerClassName="bg-gray-400 border-3 border-gray-200"
          descriptionClassName="text-white"
        />
        <LandingBox
          imageSrc={thirdImageUrl}
          imageAlt="댓글 목록"
          description="뉴스를 읽고 의견을 남겨보세요"
          containerClassName="bg-gray-500 border-3 border-gray-300"
          descriptionClassName="text-white"
        />
      </div>

      <Link to={link}>
        <Button className="sm:mt-15 mt-10 w-[250px]">지금 시작하기</Button>
      </Link>
    </div>
  );
}
