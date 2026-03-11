import { useState } from "react";
import { Bell, ClipboardList, MessageSquare, Star, Check, CheckCheck, Trash2 } from "lucide-react";

interface Notification {
  id: string;
  type: "anfrage" | "nachricht" | "bewertung";
  title: string;
  text: string;
  time: string;
  read: boolean;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: "n1", type: "anfrage", title: "Neue Projektanfrage", text: "Dachdämmung Mehrfamilienhaus in Berlin – Budget: 15.000–25.000 €", time: "vor 5 Min.", read: false },
  { id: "n2", type: "nachricht", title: "Neue Nachricht von Hans Müller", text: "Können wir nächste Woche mit der Abnahme beginnen?", time: "vor 1 Std.", read: false },
  { id: "n3", type: "bewertung", title: "Neue Bewertung erhalten", text: "Thomas Vogel hat Ihnen 5 Sterne für die Fassadendämmung gegeben.", time: "vor 2 Std.", read: false },
  { id: "n4", type: "anfrage", title: "Neue Projektanfrage", text: "Heizungstausch auf Wärmepumpe in München – Budget: 20.000–35.000 €", time: "vor 3 Std.", read: true },
  { id: "n5", type: "nachricht", title: "Neue Nachricht von Maria Weber", text: "Die Fenster sehen großartig aus! Vielen Dank.", time: "gestern", read: true },
  { id: "n6", type: "bewertung", title: "Neue Bewertung erhalten", text: "Sabine Koch hat Ihnen 4 Sterne für die PV-Anlage gegeben.", time: "gestern", read: true },
  { id: "n7", type: "anfrage", title: "Neue Projektanfrage", text: "Fenstersanierung komplettes Haus in Hamburg – Budget: 12.000–18.000 €", time: "vor 2 Tagen", read: true },
  { id: "n8", type: "nachricht", title: "Anfrage-Update", text: "Ihr Angebot für die Dachdämmung wurde angesehen.", time: "vor 2 Tagen", read: true },
];

const TYPE_CONFIG = {
  anfrage: { icon: <ClipboardList className="w-4 h-4 text-blue-500" />, bg: "bg-blue-50", color: "text-blue-500" },
  nachricht: { icon: <MessageSquare className="w-4 h-4 text-green-500" />, bg: "bg-green-50", color: "text-green-500" },
  bewertung: { icon: <Star className="w-4 h-4 text-yellow-500" />, bg: "bg-yellow-50", color: "text-yellow-500" },
};

const TYPE_LABELS = { anfrage: "Anfrage", nachricht: "Nachricht", bewertung: "Bewertung" };

export function Benachrichtigungen() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<"alle" | "ungelesen" | "anfrage" | "nachricht" | "bewertung">("alle");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  const deleteNotif = (id: string) => setNotifications((prev) => prev.filter((n) => n.id !== id));

  const filtered = notifications.filter((n) => {
    if (filter === "ungelesen") return !n.read;
    if (filter === "anfrage" || filter === "nachricht" || filter === "bewertung") return n.type === filter;
    return true;
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl text-gray-900">Benachrichtigungen</h1>
          <p className="text-sm text-gray-500 mt-1">
            {unreadCount > 0 ? `${unreadCount} ungelesene Benachrichtigungen` : "Alle Benachrichtigungen gelesen"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 border border-blue-200 px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors"
          >
            <CheckCheck className="w-4 h-4" />
            Alle als gelesen markieren
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { key: "alle", label: "Alle" },
          { key: "ungelesen", label: `Ungelesen (${unreadCount})` },
          { key: "anfrage", label: "Anfragen" },
          { key: "nachricht", label: "Nachrichten" },
          { key: "bewertung", label: "Bewertungen" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as typeof filter)}
            className={`px-4 py-2 rounded-xl text-sm transition-colors border ${filter === tab.key ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 text-gray-500 hover:border-blue-300 bg-white"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {filtered.map((notif) => {
          const config = TYPE_CONFIG[notif.type];
          return (
            <div
              key={notif.id}
              className={`bg-white rounded-2xl border shadow-sm p-5 transition-all ${!notif.read ? "border-blue-100 bg-blue-50/20" : "border-gray-100"}`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 ${config.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  {config.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <p className={`text-sm ${notif.read ? "text-gray-700" : "text-gray-900"}`} style={!notif.read ? { fontWeight: 600 } : {}}>
                          {notif.title}
                        </p>
                        {!notif.read && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                        )}
                        <span className={`text-xs px-2 py-0.5 rounded-full ${config.bg} ${config.color}`}>
                          {TYPE_LABELS[notif.type]}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{notif.text}</p>
                      <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      {!notif.read && (
                        <button
                          onClick={() => markRead(notif.id)}
                          className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors text-blue-500"
                          title="Als gelesen markieren"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotif(notif.id)}
                        className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-gray-400 hover:text-red-500"
                        title="Löschen"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 py-16 flex flex-col items-center gap-3 text-gray-400">
            <Bell className="w-10 h-10 text-gray-200" />
            <p className="text-sm">Keine Benachrichtigungen</p>
          </div>
        )}
      </div>
    </div>
  );
}
