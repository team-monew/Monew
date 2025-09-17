import { Outlet } from "react-router";
import Header from "@/components/gnb";
import Footer from "@/components/Footer";

export default function AppLayout() {
  return (
    <div className="min-h-dvh flex flex-col gap-[60px]">
      <Header />
      <main className="min-h-[calc(100vh-80px-60px)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
