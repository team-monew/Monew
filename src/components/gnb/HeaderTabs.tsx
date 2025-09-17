import HeaderTabButton from "@/components/gnb/HeaderTabButton";

export default function HeaderTabs() {
  return (
    <nav
      aria-label="GNB tabs"
      className="flex items-center justify-center gap-2 w-[252px] h-[40px]"
    >
      <HeaderTabButton variant="feed" />
      <HeaderTabButton variant="interests" />
      <HeaderTabButton variant="history" />
    </nav>
  );
}
