export default function NotificationPanel() {
  const totalElements = "10";

  return (
    <aside
      className="fixed top-0 right-0 flex flex-col overflow-hidden p-6
      w-[420px] h-dvh rounded-l-2xl bg-gray-100"
      role="dialog"
      aria-label="알림"
    >
      <div className="flex flex-col items-center justify-center w-[390px]">
        {/* Header : title */}

        <div className="flex items-center justify-between w-full">
          <h2 className="text-24-b text-gray-900">알림</h2>
          <button>X</button>
        </div>

        <div className="h-[1px] w-[390px] bg-gray-300" />

        {/* Header : total */}
        <div className="flex items-baseline justify-between w-full">
          <span className="text-16-m text-gray-600">총 {totalElements}건</span>
          <button className="text-16-sb text-cyan-500">모두 확인</button>
        </div>
      </div>
    </aside>
  );
}
