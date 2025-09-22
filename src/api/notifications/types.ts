export type NotificationsItem = {
  id: string;
  createdAt: string;
  updatedAt: string;
  confirmed: boolean;
  userId: string;
  content: string;
  resourceType: "interest" | "comment";
  resourceId: string;
};

export type NotificationId = string;

/* 알림 목록 조회 */
export type GetNotificationsParams = {
  cursor?: string;
  after?: string;
  limit: number;
};

/* 알림 목록 조회 */
export type GetNotificationsResponse = {
  content: NotificationsItem[];
  nextCursor: string | null;
  nextAfter: string | null;
  size: number;
  totalElements: number;
  hasNext: boolean;
};
