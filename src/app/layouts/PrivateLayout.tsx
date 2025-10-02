import { Outlet } from "react-router";
import { PrivateHeader } from "@/shared/components/gnb";
import Footer from "@/shared/components/Footer";

export default function PrivateLayout() {
  return (
    <div className="min-h-dvh flex flex-col space-y-[60px]">
      <PrivateHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
