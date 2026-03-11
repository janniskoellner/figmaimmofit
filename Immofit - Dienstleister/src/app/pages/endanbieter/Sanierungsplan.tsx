import { CheckCircle2, Clock, Circle, ChevronDown, ChevronUp, Euro, TrendingDown, Award } from "lucide-react";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const PROPERTIES_SANIERUNG = [
  {
    id: "1",
    name: "Musterstraße 123, Berlin",
    energyClass: "C",
    targetClass: "B",
  },
  {
    id: "3",
    name: "Industrieallee 78, Hamburg",
    energyClass: "D",
    targetClass: "B",
  },
];

const ALL_MEASURES = [
  { id: 1, title: "Dachdämmung", property: "Musterstraße 123, Berlin", year: 2026, q: "Q2", cost: 8000, saving: 12, status: "geplant", foerderung: 3200 },
  { id: 2, title: "Fenstertausch (12 Stk.)", property: "Musterstraße 123, Berlin", year: 2026, q: "Q3", cost: 12000, saving: 8, status: "geplant", foerderung: 4800 },
  { id: 3, title: "Ölheizung → Wärmepumpe", property: "Industrieallee 78, Hamburg", year: 2026, q: "Q4", cost: 22000, saving: 30, status: "offen", foerderung: 10000 },
  { id: 4, title: "Fassadendämmung WDVS", property: "Musterstraße 123, Berlin", year: 2027, q: "Q1", cost: 18000, saving: 15, status: "offen", foerderung: 7200 },
  { id: 5, title: "Fassadendämmung WDVS", property: "Industrieallee 78, Hamburg", year: 2027, q: "Q2", cost: 25000, saving: 18, status: "offen", foerderung: 10000 },
  { id: 6, title: "Photovoltaik 10kWp", property: "Musterstraße 123, Berlin", year: 2028, q: "Q1", cost: 16000, saving: 10, status: "offen", foerderung: 0 },
];

const yearData = [
  { year: "2026", kosten: 42000, einsparung: 6800, foerderung: 18000 },
  { year: "2027", kosten: 43000, einsparung: 14200, foerderung: 17200 },
  { year: "2028", kosten: 16000, einsparung: 17800, foerderung: 0 },
];

const STATUS_CONFIG = {
  geplant: { color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", icon: <Clock className="w-4 h-4 text-blue-500" /> },
  offen: { color: "text-gray-500", bg: "bg-gray-50", border: "border-gray-100", icon: <Circle className="w-4 h-4 text-gray-400" /> },
  abgeschlossen: { color: "text-green-600", bg: "bg-green-50", border: "border-green-200", icon: <CheckCircle2 className="w-4 h-4 text-green-500" /> },
};

export function Sanierungsplan() {
  const [expandedIds, setExpandedIds] = useState<number[]>([1]);
  const [selectedProp, setSelectedProp] = useState("Alle");

  const toggle = (id: number) => setExpandedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);

  const filtered = ALL_MEASURES.filter((m) => selectedProp === "Alle" || m.property.includes(selectedProp.split(",")[0]));

  const totalCost = filtered.reduce((s, m) => s + m.cost, 0);
  const totalSaving = filtered.reduce((s, m) => s + m.saving, 0);
  const totalFoerderung = filtered.reduce((s, m) => s + m.foerderung, 0);

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl text-gray-900">Sanierungsplan (ISFP)</h1>
        <p className="text-sm text-gray-500 mt-1">Individueller Sanierungsfahrplan für Ihre Immobilien</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center">
              <Euro className="w-5 h-5 text-orange-500" />
            </div>
            <span className="text-sm text-gray-500">Gesamtinvestition</span>
          </div>
          <p className="text-2xl text-gray-900" style={{ fontWeight: 700 }}>€{(totalCost / 1000).toFixed(0)}k</p>
          <p className="text-xs text-gray-400 mt-1">über alle Maßnahmen</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-green-500" />
            </div>
            <span className="text-sm text-gray-500">Energieeinsparung</span>
          </div>
          <p className="text-2xl text-gray-900" style={{ fontWeight: 700 }}>bis zu {totalSaving}%</p>
          <p className="text-xs text-gray-400 mt-1">nach vollständiger Sanierung</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
              <Award className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-sm text-gray-500">Förderung möglich</span>
          </div>
          <p className="text-2xl text-gray-900" style={{ fontWeight: 700 }}>€{(totalFoerderung / 1000).toFixed(0)}k</p>
          <p className="text-xs text-gray-400 mt-1">BEG / KfW Förderung</p>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Timeline */}
        <div className="flex-1 min-w-0">
          {/* Filter */}
          <div className="flex gap-2 mb-5">
            {["Alle", ...PROPERTIES_SANIERUNG.map((p) => p.name)].map((p) => (
              <button
                key={p}
                onClick={() => setSelectedProp(p)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${selectedProp === p ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 text-gray-500 hover:border-blue-300"}`}
              >
                {p === "Alle" ? "Alle Immobilien" : p.split(",")[0]}
              </button>
            ))}
          </div>

          {/* Group by year */}
          {[2026, 2027, 2028].map((year) => {
            const yearMeasures = filtered.filter((m) => m.year === year);
            if (yearMeasures.length === 0) return null;
            return (
              <div key={year} className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px flex-1 bg-gray-200" />
                  <span className="text-sm text-gray-400 px-3">{year}</span>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>
                <div className="space-y-3">
                  {yearMeasures.map((measure) => {
                    const cfg = STATUS_CONFIG[measure.status as keyof typeof STATUS_CONFIG];
                    const isExpanded = expandedIds.includes(measure.id);
                    return (
                      <div key={measure.id} className={`bg-white rounded-xl border ${cfg.border} shadow-sm overflow-hidden`}>
                        <button
                          className="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-50/50 transition-colors"
                          onClick={() => toggle(measure.id)}
                        >
                          {cfg.icon}
                          <div className="flex-1 text-left">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-900">{measure.title}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>{measure.q}</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-0.5">{measure.property.split(",")[0]}</p>
                          </div>
                          <div className="text-right mr-4">
                            <p className="text-sm text-gray-900">€{measure.cost.toLocaleString()}</p>
                            <p className="text-xs text-green-600">-{measure.saving}% Energie</p>
                          </div>
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
                        </button>
                        {isExpanded && (
                          <div className="px-5 pb-5 border-t border-gray-50">
                            <div className="grid grid-cols-3 gap-4 mt-4">
                              <div>
                                <p className="text-xs text-gray-400">Investitionskosten</p>
                                <p className="text-sm text-gray-900">€{measure.cost.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-400">Förderung (BEG)</p>
                                <p className="text-sm text-green-600">{measure.foerderung > 0 ? `€${measure.foerderung.toLocaleString()}` : "–"}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-400">Nettokosten</p>
                                <p className="text-sm text-gray-900">€{(measure.cost - measure.foerderung).toLocaleString()}</p>
                              </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                              <button className="text-xs bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700">
                                Handwerker anfragen
                              </button>
                              <button className="text-xs border border-gray-200 text-gray-600 px-4 py-1.5 rounded-lg hover:bg-gray-50">
                                Förderantrag starten
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Chart Sidebar */}
        <div className="w-72 flex-shrink-0 space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h4 className="text-gray-700 mb-4">Kosten & Einsparung je Jahr</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={yearData} barSize={16}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#9ca3af" }} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip formatter={(v: number) => `€${v.toLocaleString()}`} />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Bar dataKey="kosten" name="Kosten" fill="#93c5fd" radius={[4, 4, 0, 0]} />
                <Bar dataKey="foerderung" name="Förderung" fill="#86efac" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h4 className="text-gray-700 mb-4">Ziel-Energieklassen</h4>
            <div className="space-y-3">
              {PROPERTIES_SANIERUNG.map((p) => (
                <div key={p.id} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-600 truncate">{p.name.split(",")[0]}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded">{p.energyClass}</span>
                      <span className="text-xs text-gray-400">→</span>
                      <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">{p.targetClass}</span>
                    </div>
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
