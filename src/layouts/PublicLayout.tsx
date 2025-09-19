import { Outlet } from "react-router";
import { PublicHeader } from "@/components/common/gnb";

export default function PublicLayout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <PublicHeader />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
