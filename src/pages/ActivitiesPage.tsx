import ActivitiesTabs from "@/features/activities/components/ActivitiesTabs";
import ProfileCard from "@/features/activities/components/ProfileCard";

function ActivitiesPage() {
  return (
    <div className="flex w-full">
      <ProfileCard/>
      <ActivitiesTabs/>
    </div>
  );
}

export default ActivitiesPage;
