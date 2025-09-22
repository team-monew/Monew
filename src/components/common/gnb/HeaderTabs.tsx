import HeaderTabButton from "@/components/common/gnb/HeaderTabButton";

export default function HeaderTabs() {
  return (
    <nav
      aria-label="GNB tabs"
      className="flex items-center justify-center md:gap-2 gap-1 max-w-[252px] h-[40px]"
    >
      <HeaderTabButton variant="feed" />
      <HeaderTabButton variant="interests" />
      <HeaderTabButton variant="history" />
    </nav>
  );
}
