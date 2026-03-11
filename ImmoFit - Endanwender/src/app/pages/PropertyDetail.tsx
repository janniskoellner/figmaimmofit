import { useParams, Link } from "react-router";
import { ArrowLeft, Zap, FileText, Users, TrendingUp } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock data
const propertyData: Record<string, any> = {
  "1": {
    id: 1,
    image: "https://images.unsplash.com/photo-1559329146-807aff9ff1fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc3Mjc2OTQ1MXww&ixlib=rb-4.1.0&q=80&w=1080",
    address: "Musterstraße 123",
    city: "Berlin",
    postalCode: "10115",
    energyClass: "C",
    score: 72,
    yearBuilt: 1995,
    area: 120,
    rooms: 4,
    type: "Mehrfamilienhaus",
  },
};

const energyTrendData = [
  { month: "Jan 23", value: 180 },
  { month: "Apr 23", value: 165 },
  { month: "Jul 23", value: 155 },
  { month: "Okt 23", value: 148 },
  { month: "Jan 24", value: 142 },
  { month: "Apr 24", value: 138 },
  { month: "Jul 24", value: 135 },
  { month: "Okt 24", value: 132 },
  { month: "Jan 25", value: 128 },
  { month: "Apr 25", value: 125 },
];

const isfpTimeline = [
  {
    year: 2026,
    title: "Heizungserneuerung",
    description: "Austausch der alten Gasheizung gegen Wärmepumpe",
    cost: 25000,
    savings: 2500,
    status: "geplant",
  },
  {
    year: 2027,
    title: "Fassadendämmung",
    description: "Dämmung der Außenwände mit WDVS",
    cost: 35000,
    savings: 1800,
    status: "geplant",
  },
  {
    year: 2028,
    title: "Fenstertausch",
    description: "Austausch aller Fenster gegen Dreifachverglasung",
    cost: 18000,
    savings: 1200,
    status: "geplant",
  },
  {
    year: 2029,
    title: "Dachdämmung",
    description: "Aufdachdämmung mit Photovoltaikanlage",
    cost: 28000,
    savings: 2000,
    status: "geplant",
  },
];

const documents = [
  { id: 1, name: "Energieausweis.pdf", type: "Energieausweis", date: "15.02.2026", size: "2.4 MB" },
  { id: 2, name: "Grundriss.pdf", type: "Grundriss", date: "10.02.2026", size: "1.8 MB" },
  { id: 3, name: "Heizungsprotokoll.pdf", type: "Wartung", date: "05.02.2026", size: "890 KB" },
  { id: 4, name: "Fassadenfotos.zip", type: "Fotos", date: "01.02.2026", size: "12.3 MB" },
];

const energyClassColors: Record<string, string> = {
  "A": "bg-green-500 text-white",
  "B": "bg-lime-500 text-white",
  "C": "bg-yellow-500 text-white",
  "D": "bg-orange-500 text-white",
  "E": "bg-red-500 text-white",
};

export function PropertyDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<"overview" | "timeline" | "documents">("overview");

  const property = propertyData[id || "1"] || propertyData["1"];

  return (
    <div className="space-y-6">
      <Link to="/properties" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
        <ArrowLeft className="w-4 h-4" />
        Zurück zu Immobilien
      </Link>

      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative h-80 bg-gray-200">
            <ImageWithFallback
              src={property.image}
              alt={property.address}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.address}</h1>
                  <p className="text-xl text-gray-600">{property.postalCode} {property.city}</p>
                </div>
                <span className={`px-4 py-2 rounded-lg text-xl font-bold ${energyClassColors[property.energyClass]}`}>
                  Klasse {property.energyClass}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Typ</div>
                  <div className="font-semibold text-gray-900">{property.type}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Baujahr</div>
                  <div className="font-semibold text-gray-900">{property.yearBuilt}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Wohnfläche</div>
                  <div className="font-semibold text-gray-900">{property.area} m²</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Zimmer</div>
                  <div className="font-semibold text-gray-900">{property.rooms}</div>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <Zap className="w-5 h-5" />
              KI-Analyse starten
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-6 py-4 font-semibold transition-colors border-b-2 ${
                    activeTab === "overview"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Übersicht
                </button>
                <button
                  onClick={() => setActiveTab("timeline")}
                  className={`px-6 py-4 font-semibold transition-colors border-b-2 ${
                    activeTab === "timeline"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  ISFP Timeline
                </button>
                <button
                  onClick={() => setActiveTab("documents")}
                  className={`px-6 py-4 font-semibold transition-colors border-b-2 ${
                    activeTab === "documents"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Dokumente
                </button>
              </div>
            </div>

            <div className="p-6">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Score */}
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Energie-Score</h3>
                        <p className="text-gray-600">Basierend auf KI-Analyse</p>
                      </div>
                      <div className="text-5xl font-bold text-blue-600">{property.score}</div>
                    </div>
                  </div>

                  {/* Energy Trend Chart */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Energietendenz</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={energyTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#2563eb" fill="#93c5fd" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* AI Analysis Result */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-blue-600" />
                      KI-Analyse Ergebnis
                    </h3>
                    <div className="space-y-3 text-gray-700">
                      <p>Die Immobilie weist ein mittleres Energieeinsparpotenzial auf. Hauptsächliche Schwachstellen:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Veraltete Heizungsanlage (Baujahr 1995)</li>
                        <li>Unzureichende Fassadendämmung</li>
                        <li>Einfachverglasung bei einigen Fenstern</li>
                        <li>Fehlende Dachdämmung</li>
                      </ul>
                      <p className="mt-4 font-semibold text-blue-600">
                        Geschätztes Einsparpotenzial: €7.500/Jahr
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "timeline" && (
                <div className="space-y-4">
                  {isfpTimeline.map((item, index) => (
                    <div key={index} className="relative pl-8 pb-8 border-l-2 border-blue-200 last:border-0 last:pb-0">
                      <div className="absolute left-0 top-0 w-4 h-4 bg-blue-600 rounded-full -translate-x-[9px]" />
                      <div className="bg-gray-50 rounded-lg p-5">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="text-sm font-semibold text-blue-600 mb-1">{item.year}</div>
                            <h4 className="text-lg font-bold text-gray-900">{item.title}</h4>
                          </div>
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-full">
                            {item.status}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                          <div>
                            <div className="text-sm text-gray-600 mb-1">Investition</div>
                            <div className="font-bold text-gray-900">€{item.cost.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600 mb-1">Einsparung/Jahr</div>
                            <div className="font-bold text-green-600">€{item.savings.toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "documents" && (
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{doc.name}</div>
                          <div className="text-sm text-gray-600">{doc.type} · {doc.size} · {doc.date}</div>
                        </div>
                      </div>
                      <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        Öffnen
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Aktionen</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <Users className="w-5 h-5" />
                Berater anfragen
              </button>
              <button className="w-full px-4 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                <Users className="w-5 h-5" />
                Handwerker finden
              </button>
              <button className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <FileText className="w-5 h-5" />
                Förderantrag erstellen
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Zugewiesene Dienstleister</h3>
            <p className="text-gray-600 text-sm">Noch keine Dienstleister zugewiesen.</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 p-6">
            <TrendingUp className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Einsparpotenzial</h3>
            <div className="text-3xl font-bold text-green-600 mb-1">€7.500</div>
            <p className="text-sm text-gray-600">pro Jahr nach Sanierung</p>
          </div>
        </div>
      </div>
    </div>
  );
}
