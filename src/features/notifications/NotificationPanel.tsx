import NotificationCard from "@/features/notifications/NotificationCard";
import closeIconUrl from "@/assets/icons/close-primary-24.svg";

export default function NotificationPanel() {
  const totalElements = 10;
  const dummyData = {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    createdAt: "2025-09-26T18:46:31.431Z",
    updatedAt: "2025-09-26T18:46:31.431Z",
    confirmed: false,
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    content: "string",
    resourceType: "interest",
    resourceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  };

  return (
    <aside
      className="fixed top-0 right-0 flex flex-col overflow-hidden items-center p-6
      w-[438px] h-dvh rounded-l-2xl bg-gray-100"
      role="dialog"
      aria-label="알림"
    >
      {/* Header : title */}
      <div className="flex flex-col max-w-[390px] w-full">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-24-b text-gray-900">알림</h2>
          <button>
            <img src={closeIconUrl} alt="close" />
          </button>
        </div>

        <div className="mt-6 mb-5 h-[1px] w-[390px] bg-gray-300" />

        {/* Header : total */}
        <div className="flex items-baseline justify-between w-full px-2 mb-4">
          <span className="text-16-m text-gray-600">총 {totalElements}건</span>
          <button className="text-16-sb text-cyan-500">모두 확인</button>
        </div>
        <NotificationCard item={dummyData} />
      </div>
    </aside>
  );
}
