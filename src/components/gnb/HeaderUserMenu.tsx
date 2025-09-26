import notificationIcon from "@/assets/icons/notification-default.svg";
import HeaderLogoutButton from "./HeaderLogOutButton";

export default function HeaderUserMenu() {
  return (
    <div className="flex items-center justify-between sm:gap-6 gap-3 max-w-[112px] h-[36px]">
      {/* 새 알림이 있을 때는 unlead 아이콘 사용 / 추후 기능 연결 시 수정 */}
      <img src={notificationIcon} alt="notification icon" className="h-6" />
      <HeaderLogoutButton />
    </div>
  );
}
