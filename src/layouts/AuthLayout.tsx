import { Outlet } from "react-router";
import Header from "@/components/gnb";

export default function AuthLayout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="min-h-[calc(100vh-80px-60px)]">
        <Outlet />
      </main>
    </div>
  );
}
