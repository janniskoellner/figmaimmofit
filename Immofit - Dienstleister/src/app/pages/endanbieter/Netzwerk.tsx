import { useState } from "react";
import { Search, Star, MapPin, Plus, User } from "lucide-react";
import { NETWORK_PROVIDERS } from "../../data/mockData";

const TYPE_COLORS: Record<string, string> = {
  Berater: "bg-blue-100 text-blue-700",
  Handwerker: "bg-purple-100 text-purple-700",
};

export function Netzwerk() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("Alle Typen");
  const [specialtyFilter, setSpecialtyFilter] = useState("Alle Fachgebiete");
  const [contactedId, setContactedId] = useState<string | null>(null);

  const allSpecialties = Array.from(new Set(NETWORK_PROVIDERS.flatMap((p) => p.specialties)));

  const filtered = NETWORK_PROVIDERS.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "Alle Typen" || p.type === typeFilter;
    const matchSpec = specialtyFilter === "Alle Fachgebiete" || p.specialties.includes(specialtyFilter);
    return matchSearch && matchType && matchSpec;
  });

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl text-gray-900">Netzwerk</h1>
        <p className="text-sm text-gray-500 mt-1">Finden Sie qualifizierte Berater und Handwerker</p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Name oder Leistung..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 bg-white"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 bg-white"
        >
          <option>Alle Typen</option>
          <option>Berater</option>
          <option>Handwerker</option>
        </select>
        <select
          value={specialtyFilter}
          onChange={(e) => setSpecialtyFilter(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 bg-white"
        >
          <option>Alle Fachgebiete</option>
          {allSpecialties.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Results count + suggest button */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-gray-500">{filtered.length} Dienstleister gefunden</p>
        <button className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          Dienstleister vorschlagen
        </button>
      </div>

      {/* Provider Cards */}
      <div className="grid grid-cols-2 gap-5">
        {filtered.map((provider) => (
          <div key={provider.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start gap-4 mb-4">
              <img
                src={provider.avatar}
                alt={provider.name}
                className="w-12 h-12 rounded-full object-cover border border-gray-100"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  target.nextElementSibling?.classList.remove("hidden");
                }}
              />
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center hidden">
                <User className="w-6 h-6 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-gray-900 text-base">{provider.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${TYPE_COLORS[provider.type]}`}>{provider.type}</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-gray-700">{provider.rating}</span>
                  <span className="text-sm text-gray-400">({provider.reviews} Bewertungen)</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-blue-600 mb-3">{provider.description}</p>
            <div className="mb-3">
              <p className="text-xs text-gray-400 mb-2">Fachgebiete:</p>
              <div className="flex flex-wrap gap-1.5">
                {provider.specialties.map((s) => (
                  <span key={s} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">{s}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1 mb-4">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-sm text-gray-500">{provider.location}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setContactedId(provider.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm transition-colors ${contactedId === provider.id ? "bg-green-500 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}`}
              >
                <User className="w-4 h-4" />
                {contactedId === provider.id ? "Anfrage gesendet ✓" : "Kontaktieren"}
              </button>
              <button className="px-4 py-2 border border-gray-200 text-gray-600 text-sm rounded-xl hover:bg-gray-50 transition-colors">
                Profil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
