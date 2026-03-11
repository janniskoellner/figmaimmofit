import { Link, useLocation, Outlet } from "react-router";
import { Home, Building2, FileText, Calendar, Users, Bell, User } from "lucide-react";

export function Layout() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/properties", label: "Meine Immobilien", icon: Building2 },
    { path: "/documents", label: "Dokumente", icon: FileText },
    { path: "/sanierungsplan", label: "Sanierungsplan", icon: Calendar },
    { path: "/network", label: "Netzwerk", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">Immofit</h1>
        </div>
        <nav className="flex-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
              (item.path !== "/" && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg mb-1 transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <User className="w-5 h-5" />
              <span className="font-medium">Profil</span>
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Anmelden
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}