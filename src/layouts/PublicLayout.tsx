import { Outlet } from "react-router";
import HeaderAuth from "@/components/gnb/auth";

export default function PublicLayout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <HeaderAuth />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
