import { ClipboardList, FolderCheck, CheckCircle2, Star, ArrowRight, Clock, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router";
import { DIENSTLEISTER_ANFRAGEN, MEINE_PROJEKTE_AKTIV } from "../../data/mockData";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const ratingData = [{ value: 96, fill: "#2563eb" }];

export function DienstleisterDashboard() {
  const navigate = useNavigate();

  const kpiCards = [
    { icon: <ClipboardList className="w-6 h-6 text-blue-600" />, bg: "bg-blue-50", value: "5", label: "Neue Anfragen" },
    { icon: <FolderCheck className="w-6 h-6 text-green-600" />, bg: "bg-green-50", value: "3", label: "Aktive Projekte" },
    { icon: <CheckCircle2 className="w-6 h-6 text-purple-600" />, bg: "bg-purple-50", value: "287", label: "Abgeschlossen" },
    { icon: <Star className="w-6 h-6 text-yellow-500" />, bg: "bg-yellow-50", value: "4.8", label: "Bewertung" },
  ];

  const URGENCY_COLORS: Record<string, string> = {
    hoch: "text-red-600 bg-red-50",
    mittel: "text-yellow-600 bg-yellow-50",
    niedrig: "text-green-600 bg-green-50",
  };

  const PROGRESS_COLORS: Record<string, string> = {
    blue: "bg-blue-500",
    yellow: "bg-yellow-500",
    green: "bg-green-500",
  };

  const STATUS_COLORS: Record<string, string> = {
    "In Ausführung": "bg-blue-100 text-blue-700",
    Planung: "bg-yellow-100 text-yellow-700",
    Abnahme: "bg-green-100 text-green-700",
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Willkommen zurück, Thomas! Ihre aktuelle Übersicht.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {kpiCards.map((card, i) => (
          <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center mb-4`}>
              {card.icon}
            </div>
            <div className="text-2xl text-gray-900 mb-1" style={{ fontWeight: 700 }}>{card.value}</div>
            <div className="text-sm text-gray-500">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Neue Projektanfragen */}
        <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg text-gray-900">Neue Projektanfragen</h2>
            <button
              onClick={() => navigate("/dienstleister/anfragen")}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
            >
              Alle anzeigen <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {DIENSTLEISTER_ANFRAGEN.slice(0, 5).map((anf) => (
              <div
                key={anf.id}
                onClick={() => navigate(`/dienstleister/anfragen/${anf.id}`)}
                className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ClipboardList className="w-4 h-4 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm text-gray-900">{anf.title}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${URGENCY_COLORS[anf.urgency]}`}>{anf.urgency}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{anf.address} · {anf.budget}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400 flex-shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{anf.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rating + Stats */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-gray-700 mb-4">Bewertung</h3>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" data={ratingData} startAngle={90} endAngle={-270}>
                    <RadialBar dataKey="value" background={{ fill: "#f3f4f6" }} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm text-blue-600" style={{ fontWeight: 700 }}>4.8</span>
                </div>
              </div>
              <div>
                <div className="flex gap-0.5 mb-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`w-4 h-4 ${s <= 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`} />
                  ))}
                </div>
                <p className="text-xs text-gray-500">124 Bewertungen</p>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +0.2 diesen Monat
                </p>
              </div>
            </div>
          </div>

          {/* Aktive Projekte */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-700">Aktive Projekte</h3>
              <button onClick={() => navigate("/dienstleister/projekte")} className="text-xs text-blue-600 hover:text-blue-700">
                Alle →
              </button>
            </div>
            <div className="space-y-4">
              {MEINE_PROJEKTE_AKTIV.map((proj) => (
                <div key={proj.id} className="cursor-pointer" onClick={() => navigate("/dienstleister/projekte")}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-gray-700 truncate">{proj.title}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ml-2 ${STATUS_COLORS[proj.status]}`}>{proj.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${PROGRESS_COLORS[proj.color]} rounded-full`} style={{ width: `${proj.progress}%` }} />
                    </div>
                    <span className="text-xs text-gray-400">{proj.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
