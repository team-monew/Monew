import logoUrl from "@/assets/logos/app/logo.svg";
import HeaderTab from "@/components/gnb/HeaderTab";

export default function Header() {
  return (
    <header className="flex items-center justify-center w-full h-[80px] bg-white">
      <div className="flex  justify-between w-[1200px]">
        <img src={logoUrl} alt="Monew logo" className="h-[48px]" />
        <HeaderTab />
      </div>
    </header>
  );
}
