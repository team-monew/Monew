import { useEffect, useState } from "react";
import { getUserActivities } from "@/api/user-activities";
import type { SubscriptionInterestResponse } from "@/api/interests/types";
import { useAuthInfo } from "@/features/auth/hooks/useAuthInfo";
import arrowIconUrl from "@/assets/icons/chevron-right.svg";
import Button from "@/components/button/Button";
import Skeleton from "@/components/Skeleton";

const PER_PAGE = 4;

export default function SubscriptionPanel() {
  const [items, setItems] = useState<SubscriptionInterestResponse[] | null>(
    null
  );
  const [totalCount, setTotalCount] = useState(0);

  const [error, setError] = useState<string | null>(null);

  const { userId } = useAuthInfo();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setError(null);
        const data = await getUserActivities(userId);
        const list = data.subscriptions ?? [];
        if (!cancelled) {
          setTotalCount(list.length);
          setItems(list.slice(0, PER_PAGE));
        }
      } catch {
        if (!cancelled) setError("구독 정보를 불러오지 못했습니다.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (error) {
    return (
      <div>
        <p className="text-14-r text-error">{error}</p>
      </div>
    );
  }
  if (items === null) {
    return <Skeleton height="132px" />;
  }
  if (items.length === 0) {
    return (
      <div>
        <p className="text-14-r text-slate-500">
          아직 구독한 관심사가 없습니다.
        </p>
        <Button className="">구독하러 가기</Button>
      </div>
    );
  }

  return (
    <div
      role="dialog"
      aria-label="구독 중인 관심사"
      className="w-[260px] min-h-0 rounded-2xl p-6 bg-white border border-gray-200"
    >
      {/* Header */}
      <div className="flex justify-between w-full">
        <h2 className="text-18-b text-gray-900">
          총<span className="text-cyan-600">{totalCount}개</span>의 관심사
          구독중
        </h2>
        <button aria-label="관심사 목록 페이지 이동">
          <img src={arrowIconUrl} alt="" />
        </button>
      </div>

      <div className="my-6 h-[1px] w-[212px] bg-gray-200" />
    </div>
  );
}
