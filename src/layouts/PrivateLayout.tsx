import { Outlet } from "react-router";
import { PrivateHeader } from "@/components/common/gnb";
import Footer from "@/components/common/Footer";

export default function PrivateLayout() {
  return (
    <div className="min-h-dvh flex flex-col gap-[60px]">
      <PrivateHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
