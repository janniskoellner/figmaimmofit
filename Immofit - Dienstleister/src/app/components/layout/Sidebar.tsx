import {
  LayoutDashboard, Building2, FileText, Calendar, Network,
  ClipboardList, FolderOpen, User, Bell
} from "lucide-react";
import { useNavigate, useLocation } from "react-router";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  role: "endanbieter" | "dienstleister";
}

const endanbieterNav: NavItem[] = [
  { label: "Dashboard", path: "/endanbieter/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: "Meine Immobilien", path: "/endanbieter/immobilien", icon: <Building2 className="w-5 h-5" /> },
  { label: "Dokumente", path: "/endanbieter/dokumente", icon: <FileText className="w-5 h-5" /> },
  { label: "Sanierungsplan", path: "/endanbieter/sanierungsplan", icon: <Calendar className="w-5 h-5" /> },
  { label: "Netzwerk", path: "/endanbieter/netzwerk", icon: <Network className="w-5 h-5" /> },
];

const dienstleisterNav: NavItem[] = [
  { label: "Dashboard", path: "/dienstleister/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: "Projektanfragen", path: "/dienstleister/anfragen", icon: <ClipboardList className="w-5 h-5" /> },
  { label: "Meine Projekte", path: "/dienstleister/projekte", icon: <FolderOpen className="w-5 h-5" /> },
  { label: "Profil", path: "/dienstleister/profil", icon: <User className="w-5 h-5" /> },
  { label: "Benachrichtigungen", path: "/dienstleister/benachrichtigungen", icon: <Bell className="w-5 h-5" /> },
];

export function Sidebar({ role }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = role === "endanbieter" ? endanbieterNav : dienstleisterNav;

  const isActive = (path: string) => {
    if (path === location.pathname) return true;
    if (path !== `/endanbieter/dashboard` && path !== `/dienstleister/dashboard`) {
      return location.pathname.startsWith(path);
    }
    return false;
  };

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="h-14 flex items-center px-6 border-b border-gray-100">
        <button onClick={() => navigate("/")} className="flex items-center gap-2">
          <span className="text-xl text-blue-600" style={{ fontWeight: 700 }}>Immofit</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
              isActive(item.path)
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <span className={isActive(item.path) ? "text-blue-600" : "text-gray-400"}>
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-800 truncate">
              {role === "endanbieter" ? "Max Mustermann" : "Thomas Meier"}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {role === "endanbieter" ? "Endanbieter" : "Dienstleister"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
