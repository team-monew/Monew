import type { NotificationsItem } from "@/api/notifications/types";
import NotificationCard from "@/features/notifications/components/NotificationCard";

type Props = {
  items: NotificationsItem[];
  onConfirm: (id: NotificationsItem["id"]) => void;
  className?: string;
};

export default function NotificationsCardList({
  items,
  onConfirm,
  className,
}: Props) {
  return (
    <ul className={className ?? "w-full space-y-4 py-2"}>
      {items.map((currentItem) => (
        <li key={currentItem.id}>
          <NotificationCard item={currentItem} onConfirm={onConfirm} />
        </li>
      ))}
    </ul>
  );
}
