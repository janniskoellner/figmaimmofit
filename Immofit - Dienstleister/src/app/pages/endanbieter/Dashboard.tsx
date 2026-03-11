import { Building2, TrendingUp, Euro, AlertCircle, ArrowRight, Plus, Upload } from "lucide-react";
import { useNavigate } from "react-router";
import { PROPERTIES, ENERGY_CLASS_COLORS } from "../../data/mockData";

export function EndanbieterDashboard() {
  const navigate = useNavigate();

  const kpiCards = [
    {
      icon: <Building2 className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-50",
      value: "4",
      label: "Anzahl Immobilien",
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      bg: "bg-green-50",
      value: "B",
      label: "⌀ Energieklasse",
    },
    {
      icon: <Euro className="w-6 h-6 text-yellow-600" />,
      bg: "bg-yellow-50",
      value: "€45.000",
      label: "Einsparpotenzial",
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-orange-600" />,
      bg: "bg-orange-50",
      value: "7",
      label: "Offene Maßnahmen",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Willkommen zurück! Hier ist Ihre Übersicht.</p>
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

      {/* Meine Immobilien */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg text-gray-900">Meine Immobilien</h2>
          <button
            onClick={() => navigate("/endanbieter/immobilien")}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
          >
            Alle anzeigen
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {PROPERTIES.map((property) => (
            <div key={property.id} className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-36">
                <img
                  src={property.image}
                  alt={property.address}
                  className="w-full h-full object-cover"
                />
                <span className={`absolute top-2 right-2 w-7 h-7 ${ENERGY_CLASS_COLORS[property.energyClass]} text-white text-xs flex items-center justify-center rounded-full`} style={{ fontWeight: 700 }}>
                  {property.energyClass}
                </span>
              </div>
              <div className="p-3">
                <p className="text-sm text-gray-900 truncate" style={{ fontWeight: 600 }}>{property.address}</p>
                <p className="text-xs text-gray-400 mb-1">{property.city}</p>
                <p className="text-xs text-blue-500 mb-3">{property.status}</p>
                <button
                  onClick={() => navigate(`/endanbieter/immobilien/${property.id}`)}
                  className="w-full bg-blue-600 text-white text-sm py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Details ansehen
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schnellaktionen */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg text-gray-900 mb-4">Schnellaktionen</h2>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/endanbieter/immobilien")}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Neue Immobilie hinzufügen
          </button>
          <button
            onClick={() => navigate("/endanbieter/dokumente")}
            className="flex items-center gap-2 border-2 border-blue-600 text-blue-600 px-5 py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-sm"
          >
            <Upload className="w-4 h-4" />
            Dokument hochladen
          </button>
        </div>
      </div>
    </div>
  );
}
