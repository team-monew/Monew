import NotificationButton from "@/components/gnb/NotificationButton";
import LogoutButton from "@/components/gnb/LogoutButton";

export default function UserMenu() {
  return (
    <div className="flex items-center justify-between sm:gap-6 gap-3 max-w-[112px] h-[36px]">
      <NotificationButton />
      <LogoutButton />
    </div>
  );
}
