import Logo from "@/components/common/gnb/Logo";
import HeaderTab from "@/components/common/gnb/HeaderTabs";
import HeaderUserMenu from "@/components/common/gnb/HeaderUserMenu";
import { headerStyle } from "@/components/common/gnb/header.styles";

export default function PrivateHeader() {
  return (
    <header className={`${headerStyle}`}>
      <div className="flex items-center justify-between w-full">
        <Logo className="md:block hidden h-[48px]" />
        <HeaderTab />
        <HeaderUserMenu />
      </div>
    </header>
  );
}
