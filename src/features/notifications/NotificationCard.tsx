import type { NotificationsItem } from "@/api/notifications/types";
import { formatTimeAgo } from "@/shared/utils/formatTimeAgo";
import bellIconUrl from "@/assets/icons/bell.svg";
import heartIconUrl from "@/assets/icons/like-active.svg";
import closeIconUrl from "@/assets/icons/close-secondary-24.svg";

type NotificationCardProps = {
  item: NotificationsItem;
  onConfirm: (id: NotificationsItem["id"]) => void;
};

type TypeIconProps = {
  type: NotificationsItem["resourceType"];
  className?: string;
};

function TypeIcon({ type, className }: TypeIconProps) {
  if (type === "comment") {
    return <img src={heartIconUrl} alt="" className={`${className}`} />;
  }
  return <img src={bellIconUrl} alt="" className={`${className}`} />;
}

export default function NotificationCard({
  item,
  onConfirm,
}: NotificationCardProps) {
  const timeText = formatTimeAgo(item.createdAt);

  return (
    <article
      className="flex items-center justify-between
      w-full max-w-[390px] h-[80px] bg-white border border-gray-200 rounded-xl p-4 gap-2.5"
      role="listitem"
    >
      <div className="flex items-start w-full">
        <TypeIcon type={item.resourceType} className="mr-2" />

        <div className="flex items-start justify-between w-full">
          <div className="flex flex-col gap-1">
            {/* 스웨거 테스트 결과 동적 데이터+문구가 한 문장으로 나와서, css 다르게 줄 수 없음 */}
            <p className="text-[15px] leading-5 text-gray-900">
              {item.content}
            </p>
            <p className="text-14-m text-gray-400">{timeText}</p>
          </div>

          <button
            type="button"
            aria-label="알림 삭제"
            title="알림 삭제"
            onClick={(e) => {
              e.stopPropagation();
              onConfirm(item.id);
            }}
          >
            <img
              src={closeIconUrl}
              alt="notification close"
              className="top-0 h-6"
            />
          </button>
        </div>
      </div>
    </article>
  );
}
