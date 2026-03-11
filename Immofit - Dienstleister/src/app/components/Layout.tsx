import { Outlet } from "react-router";
import { TopNav } from "./TopNav";
import { Sidebar } from "./SidebarNav";

export function Layout() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <TopNav />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-60 mt-16 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
