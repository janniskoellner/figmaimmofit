import { useState } from "react";
import { MapPin, Calendar, Star, MessageSquare, FileText, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { MEINE_PROJEKTE_AKTIV, MEINE_PROJEKTE_ABGESCHLOSSEN, DIENSTLEISTER_ANFRAGEN } from "../../data/mockData";

const STATUS_COLORS: Record<string, string> = {
  "In Ausführung": "bg-blue-100 text-blue-700",
  Planung: "bg-yellow-100 text-yellow-700",
  Abnahme: "bg-green-100 text-green-700",
};

const PROGRESS_COLORS: Record<string, string> = {
  blue: "bg-blue-500",
  yellow: "bg-yellow-500",
  green: "bg-green-500",
};

const messages = [
  { sender: "Hans Müller", text: "Können wir nächste Woche mit der Abnahme beginnen?", time: "10:32" },
  { sender: "Sie", text: "Ja, Dienstag ab 14 Uhr passt mir gut.", time: "10:45" },
  { sender: "Hans Müller", text: "Super, bis dann!", time: "10:47" },
];

const offerAnfragen = DIENSTLEISTER_ANFRAGEN.slice(0, 2).map((a) => ({
  ...a,
  offerStatus: "Ausstehend",
  offerPrice: a.id === "anf-001" ? "19.800 €" : "26.500 €",
}));

export function MeineProjekte() {
  const [activeTab, setActiveTab] = useState<"aktiv" | "abgeschlossen" | "angebote">("aktiv");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeDetailTab, setActiveDetailTab] = useState<"timeline" | "dokumente" | "kommunikation">("timeline");

  const selectedProject = MEINE_PROJEKTE_AKTIV.find((p) => p.id === selectedProjectId);

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl text-gray-900">Meine Projekte</h1>
        <p className="text-sm text-gray-500 mt-1">Verwalten Sie Ihre laufenden und abgeschlossenen Projekte</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit mb-6">
        {[
          { key: "aktiv", label: `Aktiv (${MEINE_PROJEKTE_AKTIV.length})` },
          { key: "abgeschlossen", label: `Abgeschlossen (${MEINE_PROJEKTE_ABGESCHLOSSEN.length})` },
          { key: "angebote", label: `Angebote (${offerAnfragen.length})` },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key as typeof activeTab); setSelectedProjectId(null); }}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${activeTab === tab.key ? "bg-white shadow text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* List */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Aktiv */}
          {activeTab === "aktiv" && MEINE_PROJEKTE_AKTIV.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setSelectedProjectId(proj.id)}
              className={`bg-white rounded-2xl border shadow-sm p-5 cursor-pointer transition-all hover:shadow-md ${selectedProjectId === proj.id ? "border-blue-400 ring-2 ring-blue-100" : "border-gray-100"}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-gray-900">{proj.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[proj.status]}`}>{proj.status}</span>
                  </div>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {proj.address}
                  </p>
                </div>
                <p className="text-sm text-gray-700">{proj.budget}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${PROGRESS_COLORS[proj.color]} rounded-full transition-all`} style={{ width: `${proj.progress}%` }} />
                </div>
                <span className="text-sm text-gray-500 flex-shrink-0">{proj.progress}%</span>
              </div>
              <div className="flex gap-4 mt-3 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Start: {proj.startDate}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Ende: {proj.endDate}</span>
                <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> {proj.measure}</span>
              </div>
            </div>
          ))}

          {/* Abgeschlossen */}
          {activeTab === "abgeschlossen" && MEINE_PROJEKTE_ABGESCHLOSSEN.map((proj) => (
            <div key={proj.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <h3 className="text-gray-900">{proj.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500">{proj.client} · {proj.address}</p>
                </div>
                <p className="text-sm text-gray-700">{proj.budget}</p>
              </div>
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={`w-4 h-4 ${s <= proj.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`} />
                ))}
                <span className="text-sm text-gray-500 ml-2">({proj.rating}/5)</span>
              </div>
              <p className="text-sm text-gray-600 italic">"{proj.review}"</p>
              <p className="text-xs text-gray-400 mt-2">Abgeschlossen am {proj.completedDate}</p>
            </div>
          ))}

          {/* Angebote */}
          {activeTab === "angebote" && offerAnfragen.map((anf) => (
            <div key={anf.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-gray-900 mb-1">{anf.title}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {anf.address}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">{anf.offerPrice}</p>
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">{anf.offerStatus}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-xs border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50">Angebot ansehen</button>
                <button className="text-xs border border-red-200 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50">Zurückziehen</button>
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail */}
        {selectedProject && activeTab === "aktiv" && (
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm sticky top-20">
              <div className="p-5 border-b border-gray-100">
                <h3 className="text-gray-900">{selectedProject.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{selectedProject.client} · {selectedProject.measure}</p>
              </div>

              {/* Detail Tabs */}
              <div className="flex gap-1 p-3 border-b border-gray-100">
                {[
                  { key: "timeline", label: "Timeline" },
                  { key: "dokumente", label: "Dokumente" },
                  { key: "kommunikation", label: "Nachrichten" },
                ].map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setActiveDetailTab(t.key as typeof activeDetailTab)}
                    className={`flex-1 py-1.5 text-xs rounded-lg transition-colors ${activeDetailTab === t.key ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-50"}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="p-5">
                {/* Timeline */}
                {activeDetailTab === "timeline" && (
                  <div className="space-y-4">
                    {[
                      { label: "Auftragserteilung", date: selectedProject.startDate, done: true },
                      { label: "Materialbestellung", date: "2026-02-10", done: true },
                      { label: "Beginn Arbeiten", date: "2026-02-15", done: true },
                      { label: "Zwischenabnahme", date: "2026-03-01", done: selectedProject.progress >= 50 },
                      { label: "Fertigstellung", date: selectedProject.endDate, done: false },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${item.done ? "bg-blue-600 border-blue-600" : "border-gray-300"}`}>
                          {item.done && <CheckCircle2 className="w-3 h-3 text-white fill-white" />}
                        </div>
                        <div>
                          <p className={`text-sm ${item.done ? "text-gray-900" : "text-gray-400"}`}>{item.label}</p>
                          <p className="text-xs text-gray-400">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Dokumente */}
                {activeDetailTab === "dokumente" && (
                  <div className="space-y-2">
                    {["Auftragsbestätigung.pdf", "Materialrechnung.pdf", "Foto_Baustelle.jpg"].map((doc) => (
                      <div key={doc} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer">
                        <FileText className="w-4 h-4 text-blue-500" />
                        <p className="text-sm text-gray-700 truncate">{doc}</p>
                      </div>
                    ))}
                    <button className="w-full text-xs text-blue-600 border border-dashed border-blue-300 py-2 rounded-xl hover:bg-blue-50 mt-2">
                      + Dokument hochladen
                    </button>
                  </div>
                )}

                {/* Kommunikation */}
                {activeDetailTab === "kommunikation" && (
                  <div>
                    <div className="space-y-3 mb-4 max-h-56 overflow-y-auto">
                      {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.sender === "Sie" ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${msg.sender === "Sie" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}>
                            <p>{msg.text}</p>
                            <p className={`text-xs mt-1 ${msg.sender === "Sie" ? "text-blue-200" : "text-gray-400"}`}>{msg.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input type="text" placeholder="Nachricht..." className="flex-1 text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500" />
                      <button className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
