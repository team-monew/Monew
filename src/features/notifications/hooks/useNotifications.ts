import { useCallback, useEffect, useState } from "react";
import type { UserId, NotificationId } from "@/types/ids";
import type {
  NotificationsItem,
  GetNotificationsResponse,
} from "@/api/notifications/types";
import {
  getNotifications,
  checkNotifications,
  checkAllNotifications,
} from "@/api/notifications";

type Options = {
  userId: UserId;
  pageSize?: number;
};

type Return = {
  items: NotificationsItem[];
  total: number;
  loading: boolean;
  error: string | null;

  refresh: () => Promise<void>;
  confirmOne: (id: NotificationId) => Promise<void>;
  confirmAll: () => Promise<void>;
};

function toMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export function useNotifications({ userId, pageSize = 50 }: Options): Return {
  const [items, setItems] = useState<NotificationsItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const applyPage = (page: GetNotificationsResponse) => {
    setItems(page.content);
    setTotal(page.totalElements);
  };

  const refresh = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const page = await getNotifications({ limit: pageSize }, userId);
      applyPage(page);
    } catch (error) {
      setError(toMessage(error));
    } finally {
      setLoading(false);
    }
  }, [pageSize, userId]);

  const confirmOne = useCallback(
    async (id: NotificationId) => {
      // 낙관적 제거 + 실패 시 동기화
      const snapshot = { items, total };
      setItems((prev) => prev.filter((n) => n.id !== id));
      setTotal((t) => Math.max(0, t - 1));
      try {
        await checkNotifications(id, userId);
      } catch (error) {
        setItems(snapshot.items);
        setTotal(snapshot.total);
        setError(toMessage(error));
      }
    },
    [items, total, userId]
  );

  const confirmAll = useCallback(async () => {
    const snapshot = { items, total };
    setItems([]);
    setTotal(0);
    try {
      await checkAllNotifications(userId);
    } catch (error) {
      setItems(snapshot.items);
      setTotal(snapshot.total);
      setError(toMessage(error));
    }
  }, [items, total, userId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { items, total, loading, error, refresh, confirmOne, confirmAll };
}
