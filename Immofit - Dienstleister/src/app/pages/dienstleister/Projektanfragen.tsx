import { useState } from "react";
import { Search, MapPin, Euro, Clock, ChevronRight, X, Send } from "lucide-react";
import { DIENSTLEISTER_ANFRAGEN } from "../../data/mockData";

const URGENCY_COLORS: Record<string, string> = {
  hoch: "text-red-600 bg-red-50 border-red-200",
  mittel: "text-yellow-600 bg-yellow-50 border-yellow-200",
  niedrig: "text-green-600 bg-green-50 border-green-200",
};

const MEASURE_OPTIONS = ["Alle Maßnahmen", "Dachdämmung", "Heizungsoptimierung", "Fenstertausch", "Fassadendämmung", "Photovoltaik"];
const REGION_OPTIONS = ["Alle Regionen", "Berlin", "Bayern", "Hamburg", "Hessen", "Baden-Württemberg"];
const BUDGET_OPTIONS = ["Alle Budgets", "bis 15.000 €", "15.000 – 30.000 €", "über 30.000 €"];

export function Projektanfragen() {
  const [search, setSearch] = useState("");
  const [measure, setMeasure] = useState("Alle Maßnahmen");
  const [region, setRegion] = useState("Alle Regionen");
  const [budget, setBudget] = useState("Alle Budgets");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [offerText, setOfferText] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [submittedIds, setSubmittedIds] = useState<string[]>([]);

  const filtered = DIENSTLEISTER_ANFRAGEN.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.address.toLowerCase().includes(search.toLowerCase());
    const matchMeasure = measure === "Alle Maßnahmen" || a.measure === measure;
    const matchRegion = region === "Alle Regionen" || a.region === region || a.address.includes(region);
    return matchSearch && matchMeasure && matchRegion;
  });

  const selected = DIENSTLEISTER_ANFRAGEN.find((a) => a.id === selectedId);

  const handleSubmitOffer = () => {
    if (selectedId) {
      setSubmittedIds((prev) => [...prev, selectedId]);
      setSelectedId(null);
      setOfferText("");
      setOfferPrice("");
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl text-gray-900">Projektanfragen</h1>
        <p className="text-sm text-gray-500 mt-1">Verfügbare Anfragen in Ihrer Region</p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Suche nach Projekt oder Ort..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 bg-white"
          />
        </div>
        <select value={measure} onChange={(e) => setMeasure(e.target.value)} className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 bg-white">
          {MEASURE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
        </select>
        <select value={region} onChange={(e) => setRegion(e.target.value)} className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 bg-white">
          {REGION_OPTIONS.map((o) => <option key={o}>{o}</option>)}
        </select>
        <select value={budget} onChange={(e) => setBudget(e.target.value)} className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 bg-white">
          {BUDGET_OPTIONS.map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>

      <div className="flex gap-6">
        {/* List */}
        <div className="flex-1 min-w-0 space-y-4">
          {filtered.map((anf) => (
            <div
              key={anf.id}
              onClick={() => setSelectedId(anf.id)}
              className={`bg-white rounded-2xl border shadow-sm p-5 cursor-pointer transition-all hover:shadow-md ${selectedId === anf.id ? "border-blue-400 ring-2 ring-blue-100" : "border-gray-100"}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0 mr-3">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-gray-900 text-base">{anf.title}</h3>
                    {submittedIds.includes(anf.id) && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Angebot gesendet</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="w-3.5 h-3.5" />
                    {anf.address}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`text-xs px-2.5 py-1 rounded-full border ${URGENCY_COLORS[anf.urgency]}`}>
                    Priorität: {anf.urgency}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Euro className="w-3.5 h-3.5" />
                  <span>{anf.budget}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Bis: {anf.deadline}</span>
                </div>
                <div className="ml-auto flex gap-2">
                  <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-lg">{anf.measure}</span>
                  <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-lg">{anf.region}</span>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 py-16 text-center text-gray-400">
              Keine Anfragen gefunden
            </div>
          )}
        </div>

        {/* Detail + Offer Form */}
        {selected && (
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm sticky top-20">
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <h3 className="text-gray-900">Anfragedetails</h3>
                <button onClick={() => setSelectedId(null)} className="p-1 hover:bg-gray-100 rounded-lg">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <h4 className="text-base text-gray-900 mb-1">{selected.title}</h4>
                  <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    {selected.address}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{selected.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Budget</p>
                    <p className="text-gray-800">{selected.budget}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Deadline</p>
                    <p className="text-gray-800">{selected.deadline}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Maßnahme</p>
                    <p className="text-gray-800">{selected.measure}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Kontakt</p>
                    <p className="text-gray-800">{selected.contact}</p>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h4 className="text-sm text-gray-700 mb-3">Angebot erstellen</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Angebotspreis (€)</label>
                      <input
                        type="text"
                        value={offerPrice}
                        onChange={(e) => setOfferPrice(e.target.value)}
                        placeholder="z.B. 18.500"
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Anschreiben</label>
                      <textarea
                        value={offerText}
                        onChange={(e) => setOfferText(e.target.value)}
                        rows={4}
                        placeholder="Beschreiben Sie Ihr Angebot..."
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none"
                      />
                    </div>
                    <button
                      onClick={handleSubmitOffer}
                      disabled={!offerPrice || !offerText}
                      className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-xl hover:bg-blue-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      Angebot absenden
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
