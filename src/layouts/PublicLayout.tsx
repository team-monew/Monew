import { Outlet } from "react-router";
import { PublicHeader } from "@/components/gnb";

export default function PublicLayout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <PublicHeader />
      <main className="flex-1 flex items-center justify-center p-8">
        <Outlet />
      </main>
    </div>
  );
}
