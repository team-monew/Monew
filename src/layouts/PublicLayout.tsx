import { Outlet } from "react-router";
import PublicHeader from "@/components/gnb/auth";

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
