import { Bell, User, ChevronDown, LogOut, Settings } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";

interface TopNavProps {
  role: "endanbieter" | "dienstleister";
  notificationCount?: number;
}

export function TopNav({ role, notificationCount = 3 }: TopNavProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const profilePath = role === "endanbieter" ? "/endanbieter/profil" : "/dienstleister/profil";
  const notifPath = role === "endanbieter" ? "/endanbieter/benachrichtigungen" : "/dienstleister/benachrichtigungen";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }

    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [profileOpen]);

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 fixed top-0 left-64 right-0 z-30">
      <div />
      <div className="flex items-center gap-4">
        {/* Role switcher */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 text-sm">
          <button
            onClick={() => navigate("/endanbieter/dashboard")}
            className={`px-3 py-1 rounded-md transition-colors ${role === "endanbieter" ? "bg-white shadow text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
          >
            Endanbieter
          </button>
          <button
            onClick={() => navigate("/dienstleister/dashboard")}
            className={`px-3 py-1 rounded-md transition-colors ${role === "dienstleister" ? "bg-white shadow text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
          >
            Dienstleister
          </button>
        </div>

        {/* Notifications */}
        <button
          onClick={() => navigate(notifPath)}
          className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <Bell className="w-5 h-5 text-gray-600" />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center" style={{ fontSize: "10px" }}>
              {notificationCount}
            </span>
          )}
        </button>

        {/* Profile dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <User className="w-5 h-5" />
            <span className="text-sm">Profil</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-10 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
              <button
                onClick={() => { navigate(profilePath); setProfileOpen(false); }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <User className="w-4 h-4" />
                Mein Profil
              </button>
              <button
                onClick={() => setProfileOpen(false)}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Settings className="w-4 h-4" />
                Einstellungen
              </button>
              <hr className="my-1 border-gray-100" />
              <button
                onClick={() => { navigate("/"); setProfileOpen(false); }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                Abmelden
              </button>
            </div>
          )}
        </div>

        {/* Anmelden button */}
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Anmelden
        </button>
      </div>
    </header>
  );
}