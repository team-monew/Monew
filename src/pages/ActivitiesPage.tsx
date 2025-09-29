import ActivitiesTabs from "@/features/activities/components/ActivitiesTabs";
import ProfileCard from "@/features/activities/components/ProfileCard";

function ActivitiesPage() {
  return (
    <div className="flex justify-center gap-6 w-full px-4">
      <ProfileCard/>
      <ActivitiesTabs/>
    </div>
  );
}

export default ActivitiesPage;
