import Logo from "@/components/gnb/Logo";
import { headerStyle } from "@/components/gnb/headerStyle";

export default function PublicHeader() {
  return (
    <header className={`${headerStyle}`}>
      <div className="flex items-center w-full">
        <Logo className="md:h-[48px] h-[36px]" />
      </div>
    </header>
  );
}
