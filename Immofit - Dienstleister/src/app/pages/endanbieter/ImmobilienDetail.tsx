import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Brain, FileText, Calendar, Star, MapPin, Zap, Users, FileCheck } from "lucide-react";
import { PROPERTIES, ENERGY_CLASS_COLORS, ENERGY_CLASS_BG_COLORS, ENERGY_CLASS_TEXT_COLORS } from "../../data/mockData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const energyTrendData = [
  { year: "2020", value: 180 },
  { year: "2021", value: 172 },
  { year: "2022", value: 165 },
  { year: "2023", value: 155 },
  { year: "2024", value: 142 },
  { year: "2025", value: 130 },
  { year: "2026*", value: 110 },
];

const isfpMeasures = [
  { step: 1, title: "Dachdämmung", year: "2026", cost: "8.000 €", saving: "12%", status: "geplant", color: "bg-blue-500" },
  { step: 2, title: "Fenstertausch", year: "2026", cost: "12.000 €", saving: "8%", status: "geplant", color: "bg-blue-500" },
  { step: 3, title: "Heizungstausch", year: "2027", cost: "18.000 €", saving: "25%", status: "offen", color: "bg-gray-300" },
  { step: 4, title: "Fassadendämmung", year: "2027", cost: "22.000 €", saving: "15%", status: "offen", color: "bg-gray-300" },
  { step: 5, title: "Photovoltaik", year: "2028", cost: "15.000 €", saving: "10%", status: "offen", color: "bg-gray-300" },
];

const documents = [
  { name: "Energieausweis_2024.pdf", type: "Energieausweis", date: "15.01.2024", size: "1.2 MB" },
  { name: "Grundriss_EG.pdf", type: "Grundriss", date: "10.02.2024", size: "3.4 MB" },
  { name: "Heizkostenabrechnung_2023.pdf", type: "Abrechnung", date: "20.03.2024", size: "0.8 MB" },
];

export function ImmobilienDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const property = PROPERTIES.find((p) => p.id === id) || PROPERTIES[0];

  return (
    <div className="p-8">
      {/* Back button */}
      <button
        onClick={() => navigate("/endanbieter/immobilien")}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Zurück zu Meine Immobilien
      </button>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="relative h-64">
          <img src={property.image} alt={property.address} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm opacity-90">{property.city}</span>
            </div>
            <h1 className="text-3xl mb-1" style={{ fontWeight: 700 }}>{property.address}</h1>
            <p className="opacity-80 text-sm">{property.description}</p>
          </div>
          <div className={`absolute top-4 right-4 ${ENERGY_CLASS_COLORS[property.energyClass]} text-white w-14 h-14 rounded-2xl flex items-center justify-center`} style={{ fontSize: "24px", fontWeight: 700 }}>
            {property.energyClass}
          </div>
        </div>
        <div className="p-6 flex items-center justify-between">
          <div className="flex gap-8">
            <div>
              <p className="text-xs text-gray-400 mb-1">Baujahr</p>
              <p className="text-gray-800">{property.year}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Wohnfläche</p>
              <p className="text-gray-800">{property.area} m²</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Heizung</p>
              <p className="text-gray-800">{property.heatingType}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Fenster</p>
              <p className="text-gray-800">{property.windows}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Score</p>
              <div className="flex items-center gap-1">
                <div className="h-2 w-20 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${property.score}%` }} />
                </div>
                <span className="text-sm text-blue-600">{property.score}/100</span>
              </div>
            </div>
          </div>
          <button
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors text-sm"
          >
            <Brain className="w-4 h-4" />
            KI-Analyse starten
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Tabs */}
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
            {[
              { key: "overview", label: "Übersicht" },
              { key: "isfp", label: "ISFP Timeline" },
              { key: "documents", label: "Dokumente" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${activeTab === tab.key ? "bg-white shadow text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Energy Trend Chart */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-gray-900 mb-4">Energietendenz (kWh/m²a)</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={energyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#9ca3af" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#2563eb" fill="#eff6ff" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
                <p className="text-xs text-gray-400 mt-2">* 2026 – Prognose nach geplanten Maßnahmen</p>
              </div>

              {/* KI Analysis */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Brain className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="text-gray-900">KI-Analyse Ergebnis</h3>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">Abgeschlossen</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{property.aiAnalysis}</p>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className={`${ENERGY_CLASS_BG_COLORS[property.energyClass]} rounded-xl p-4 text-center`}>
                    <p className={`text-2xl ${ENERGY_CLASS_TEXT_COLORS[property.energyClass]}`} style={{ fontWeight: 700 }}>{property.energyClass}</p>
                    <p className="text-xs text-gray-500">Energieklasse</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <p className="text-2xl text-blue-600" style={{ fontWeight: 700 }}>€{(property.savings / 1000).toFixed(0)}k</p>
                    <p className="text-xs text-gray-500">Einsparpotenzial</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 text-center">
                    <p className="text-2xl text-purple-600" style={{ fontWeight: 700 }}>{property.measures}</p>
                    <p className="text-xs text-gray-500">Maßnahmen</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ISFP Timeline Tab */}
          {activeTab === "isfp" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-gray-900 mb-6">ISFP Sanierungsfahrplan</h3>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
                <div className="space-y-6">
                  {isfpMeasures.map((measure, i) => (
                    <div key={i} className="relative flex gap-6 pl-14">
                      <div className={`absolute left-4 top-1 w-4 h-4 rounded-full ${measure.color} border-2 border-white shadow`} />
                      <div className={`flex-1 border rounded-xl p-5 ${measure.status === "geplant" ? "border-blue-200 bg-blue-50" : "border-gray-100 bg-white"}`}>
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">Schritt {measure.step}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${measure.status === "geplant" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"}`}>
                                {measure.status}
                              </span>
                            </div>
                            <h4 className="text-gray-900">{measure.title}</h4>
                            <p className="text-sm text-gray-500 mt-1">Geplant für {measure.year}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-900">{measure.cost}</p>
                            <p className="text-sm text-green-600">-{measure.saving} Energie</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-900">Dokumente</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  Hochladen
                </button>
              </div>
              <div className="space-y-3">
                {documents.map((doc, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{doc.name}</p>
                      <p className="text-xs text-gray-400">{doc.type} · {doc.date} · {doc.size}</p>
                    </div>
                    <button className="text-xs text-blue-600 hover:text-blue-700 px-3 py-1.5 border border-blue-200 rounded-lg">
                      Herunterladen
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Actions */}
        <div className="w-64 flex-shrink-0 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h4 className="text-gray-700 mb-4">Aktionen</h4>
            <div className="space-y-2">
              <button
                onClick={() => navigate("/endanbieter/netzwerk")}
                className="w-full flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Users className="w-4 h-4" />
                Berater anfragen
              </button>
              <button
                onClick={() => navigate("/endanbieter/netzwerk")}
                className="w-full flex items-center gap-2 text-sm border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <Zap className="w-4 h-4" />
                Handwerker finden
              </button>
              <button
                className="w-full flex items-center gap-2 text-sm border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <FileCheck className="w-4 h-4" />
                Förderantrag erstellen
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h4 className="text-gray-700 mb-3">Energieklasse</h4>
            <div className={`${ENERGY_CLASS_COLORS[property.energyClass]} text-white rounded-xl p-4 text-center`}>
              <p className="text-4xl mb-1" style={{ fontWeight: 700 }}>{property.energyClass}</p>
              <p className="text-sm opacity-90">Aktuelle Klasse</p>
            </div>
            <div className="mt-3 flex gap-1">
              {["A", "B", "C", "D", "E", "F", "G"].map((cls) => (
                <div key={cls} className={`flex-1 h-4 rounded-sm ${ENERGY_CLASS_COLORS[cls]} ${cls !== property.energyClass ? "opacity-30" : ""}`} title={`Klasse ${cls}`} />
              ))}
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-400">
              <span>A</span><span>G</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h4 className="text-gray-700 mb-3">Bewertung</h4>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${property.score}%` }} />
              </div>
              <span className="text-sm text-blue-600 shrink-0">{property.score}/100</span>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={`w-4 h-4 ${s <= Math.round(property.score / 20) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`} />
              ))}
              <span className="text-xs text-gray-500 ml-1">Energieeffizienz Score</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
