import { Outlet } from "react-router";
import Header from "@/components/gnb";

export default function AuthLayout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
