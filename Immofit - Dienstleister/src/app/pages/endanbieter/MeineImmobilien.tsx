import { useState } from "react";
import { Grid3X3, List, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { PROPERTIES, ENERGY_CLASS_COLORS } from "../../data/mockData";

export function MeineImmobilien() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl text-gray-900">Meine Immobilien</h1>
          <p className="text-sm text-gray-500 mt-1">{PROPERTIES.length} Immobilien gefunden</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Neue Immobilie
          </button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-3 gap-6">
          {PROPERTIES.map((property) => (
            <div key={property.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-52">
                <img src={property.image} alt={property.address} className="w-full h-full object-cover" />
                <span className={`absolute top-3 right-3 ${ENERGY_CLASS_COLORS[property.energyClass]} text-white text-xs px-2.5 py-1 rounded-full`} style={{ fontWeight: 700 }}>
                  Klasse {property.energyClass}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-gray-900 mb-0.5">{property.address}</h3>
                <p className="text-sm text-blue-600 mb-3">{property.city}</p>
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Baujahr: {property.year}</span>
                  <span>{property.area} m²</span>
                </div>
                <p className="text-sm text-blue-500 mb-4">{property.status}</p>
                <button
                  onClick={() => navigate(`/endanbieter/immobilien/${property.id}`)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {PROPERTIES.map((property) => (
            <div key={property.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex gap-5 hover:shadow-md transition-shadow">
              <img src={property.image} alt={property.address} className="w-28 h-20 object-cover rounded-lg flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-gray-900">{property.address}</h3>
                    <p className="text-sm text-blue-600">{property.city}</p>
                  </div>
                  <span className={`${ENERGY_CLASS_COLORS[property.energyClass]} text-white text-xs px-2.5 py-1 rounded-full`} style={{ fontWeight: 700 }}>
                    Klasse {property.energyClass}
                  </span>
                </div>
                <div className="flex gap-4 text-sm text-gray-500 mt-2 mb-3">
                  <span>Baujahr: {property.year}</span>
                  <span>{property.area} m²</span>
                  <span className="text-blue-500">{property.status}</span>
                </div>
              </div>
              <button
                onClick={() => navigate(`/endanbieter/immobilien/${property.id}`)}
                className="flex-shrink-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm h-fit"
              >
                Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Property Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-2xl p-8 w-[500px] shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl text-gray-900 mb-6">Neue Immobilie hinzufügen</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Straße & Hausnummer</label>
                <input type="text" placeholder="z.B. Musterstraße 123" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">PLZ</label>
                  <input type="text" placeholder="10115" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Stadt</label>
                  <input type="text" placeholder="Berlin" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Baujahr</label>
                  <input type="number" placeholder="1990" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Wohnfläche (m²)</label>
                  <input type="number" placeholder="150" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Gebäudetyp</label>
                <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500">
                  <option>Einfamilienhaus</option>
                  <option>Mehrfamilienhaus</option>
                  <option>Reihenhaus</option>
                  <option>Doppelhaushälfte</option>
                  <option>Wohnung</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg hover:bg-gray-50 text-sm">
                Abbrechen
              </button>
              <button onClick={() => setShowAddModal(false)} className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 text-sm">
                Immobilie hinzufügen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
