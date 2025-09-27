import { Link } from "react-router";
import Logo from "@/components/Logo";
import HeaderTab from "@/components/gnb/HeaderTabs";
import UserMenu from "@/components/gnb/UserMenu";
import { headerStyle } from "@/components/gnb/header.styles";
import { ROUTES } from "@/shared/constants/routes";

export default function PrivateHeader() {
  return (
    <header className={`${headerStyle}`}>
      <div className="flex items-center justify-between w-full">
        <Link to={ROUTES.ARTICLES} aria-label="articles">
          <Logo className="md:block hidden h-[48px]" />
        </Link>
        <HeaderTab />
        <UserMenu />
      </div>
    </header>
  );
}
