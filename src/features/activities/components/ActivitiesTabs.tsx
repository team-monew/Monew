import ActivitiesTabButton from "@/features/activities/components/ActivitiesTabButton";

export default function ActivitiesTabs() {
  return (
    <nav
      aria-label="Activities tabs"
      className="flex items-center justify-center md:gap-2 gap-1 w-full max-w-[895px] h-[66px]"
    >
      <ActivitiesTabButton variant="recentComments" />
      <ActivitiesTabButton variant="likeComments" />
      <ActivitiesTabButton variant="viewedArticles" />
    </nav>
  );
}
