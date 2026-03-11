import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";

interface LayoutProps {
  role: "endanbieter" | "dienstleister";
}

export function Layout({ role }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar role={role} />
      <div className="flex-1 ml-64">
        <TopNav role={role} notificationCount={role === "dienstleister" ? 5 : 3} />
        <main className="pt-14 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
