import Logo from "@/components/common/gnb/Logo";
import { headerStyle } from "@/components/common/gnb/header.styles";

export default function PublicHeader() {
  return (
    <header className={`${headerStyle}`}>
      <div className="flex items-center w-full">
        <Logo className="md:h-[48px] h-[36px]" />
      </div>
    </header>
  );
}
