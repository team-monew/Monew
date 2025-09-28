import { Outlet } from "react-router";
import { PrivateHeader } from "@/components/gnb";
import Footer from "@/components/Footer";

export default function PrivateLayout() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh gap-[60px]">
      <PrivateHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
