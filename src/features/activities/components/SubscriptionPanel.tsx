import { useEffect, useState } from "react";
import { getUserActivities } from "@/api/user-activities";
import type { SubscriptionInterestResponse } from "@/api/interests/types";
import { useAuthInfo } from "@/features/auth/hooks/useAuthInfo";
import arrowIconUrl from "@/assets/icons/chevron-right.svg";
import SubscriptionCard from "@/features/activities/components/SubscriptionCard";
import Skeleton from "@/components/Skeleton";
import { Link } from "react-router";
import { ROUTES } from "@/shared/constants/routes";

const PER_PAGE = 4;

export default function SubscriptionPanel() {
  const [items, setItems] = useState<SubscriptionInterestResponse[] | null>(
    null
  );
  const [totalCount, setTotalCount] = useState(0);

  const [error, setError] = useState<string | null>(null);

  const { userId } = useAuthInfo();

  const empty = items?.length === 0;

  useEffect(() => {
    let isActive = true;

    (async () => {
      setError(null);

      try {
        const data = await getUserActivities(userId);
        const list = data.subscriptions ?? [];
        if (!isActive) return;

        setTotalCount(list.length);
        setItems(list.slice(0, PER_PAGE));
      } catch {
        if (!isActive) return;
        setError("구독 정보를 불러오지 못했습니다.");
      }
    })();

    return () => {
      isActive = false;
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

  return (
    <div
      role="dialog"
      aria-label="구독 중인 관심사"
      className="w-[260px] min-h-0 rounded-2xl p-6 bg-white border border-gray-200"
    >
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <h2 className="text-18-b text-gray-900">
          총<span className="text-cyan-600">{totalCount}개</span>의 관심사
          구독중
        </h2>
        <Link to={ROUTES.INTERESTS} aria-label="interests">
          <img src={arrowIconUrl} alt="" />
        </Link>
      </div>

      {!empty && <div className="mt-6 h-[1px] w-[212px] bg-gray-200" />}

      {!empty && (
        <ul className="flex flex-col items-aline divide-y divide-gray-200">
          {items.map((s) => (
            <li key={s.interestId} className="first:pt-0">
              <SubscriptionCard
                name={s.interestName}
                keywords={s.interestKeywords}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
