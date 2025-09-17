import { Outlet } from "react-router";
import Header from "@/components/gnb";

export default function AppLayout() {
  return (
    <div className="min-h-dvh">
      <Header />
      <main className="min-h-[calc(100vh-80px)]">
        <Outlet />
      </main>
    </div>
  );
}
