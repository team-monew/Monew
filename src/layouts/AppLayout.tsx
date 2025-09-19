import { Outlet } from "react-router";
import Header from "@/components/common/gnb";
import Footer from "@/components/common/Footer";

export default function AppLayout() {
  return (
    <div className="min-h-dvh flex flex-col gap-[60px]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
