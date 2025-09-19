import { Link } from "react-router";
import logoUrl from "@/assets/logos/app/logo.svg";
import HeaderTab from "@/components/common/gnb/HeaderTabs";
import HeaderUserMenu from "@/components/common/gnb/HeaderUserMenu";
import { ROUTES } from "@/shared/constants/routes";

export default function Header() {
  return (
    <header className="flex items-center justify-center w-full h-[80px] bg-white border-b border-gray-200 lg:px-[19vw] px-[5vw]">
      <div className="flex items-center justify-between w-full">
        <Link to={ROUTES.ROOT} aria-label="홈" className="md:block hidden">
          <img src={logoUrl} alt="Monew logo" className="h-[48px]" />
        </Link>
        <HeaderTab />
        <HeaderUserMenu />
      </div>
    </header>
  );
}
