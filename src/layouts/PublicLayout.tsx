import { Outlet } from "react-router";
import { PublicHeader } from "@/components/gnb";

export default function PublicLayout() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh">
      <PublicHeader />
      <main className="flex-1 flex items-center justify-center p-8">
        <Outlet />
      </main>
    </div>
  );
}
