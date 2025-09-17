import Logo from "@/components/gnb/Logo";
import HeaderTab from "@/components/gnb/HeaderTabs";
import HeaderUserMenu from "@/components/gnb/HeaderUserMenu";
import { headerStyle } from "@/components/gnb/headerStyle";

export default function Header() {
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
