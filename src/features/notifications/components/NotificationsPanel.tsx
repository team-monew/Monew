import NotificationsCardList from "@/features/notifications/components/NotificationsCardList";
import EmptyState from "@/components/EmptyState";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";
import { useAuthInfo } from "@/features/auth/hooks/useAuthInfo";
import closeIconUrl from "@/assets/icons/close-primary-24.svg";

type NotificationsPanelProps = {
  onClose?: () => void;
  pageSize?: number;
};

export default function NotificationsPanel({
  onClose,
  pageSize = 50,
}: NotificationsPanelProps) {
  const { userId } = useAuthInfo();

  const { items, total, confirmOne, confirmAll } = useNotifications({
    userId,
    pageSize,
  });

  return (
    <aside
      className="fixed top-0 right-0 flex flex-col overflow-hidden items-center p-7
      w-[438px] h-dvh rounded-l-2xl bg-gray-100"
      role="dialog"
      aria-label="알림"
    >
      <div className="flex flex-col items-center max-w-[390px] w-full h-full">
        {/* Header */}
        <div className="flex items-center justify-between w-full px-1">
          <h2 className="text-24-b text-gray-900">알림</h2>
          <button onClick={onClose}>
            <img src={closeIconUrl} alt="close" />
          </button>
        </div>

        <div className="mt-7 mb-6 h-[1px] w-full bg-gray-300" />

        {/* Summary */}
        <div className="flex items-baseline justify-between w-full px-2 mb-5">
          <span className="text-16-m text-gray-600">총 {total}건</span>
          <button
            className="text-16-sb text-cyan-500 disabled:text-gray-400"
            onClick={() => void confirmAll()}
            disabled={items.length === 0}
          >
            모두 확인
          </button>
        </div>

        {/* List */}
        {items.length > 0 && (
          <NotificationsCardList
            items={items}
            onConfirm={(id) => void confirmOne(id)}
          />
        )}
        {items.length === 0 && (
          <div className="flex items-center h-full">
            <EmptyState message="알림이 없습니다." />
          </div>
        )}
      </div>
    </aside>
  );
}
