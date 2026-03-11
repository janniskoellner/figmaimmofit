import { Link } from "react-router";
import { Building2, TrendingUp, FileCheck, AlertCircle, Plus, Upload, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// Mock data
const properties = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1559329146-807aff9ff1fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc3Mjc2OTQ1MXww&ixlib=rb-4.1.0&q=80&w=1080",
    address: "Musterstraße 123, 10115 Berlin",
    energyClass: "C",
    status: "KI-Analyse abgeschlossen",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1717245233537-1b51136c35ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGhvdXNlJTIwZmFjYWRlfGVufDF8fHx8MTc3Mjg4ODk2NHww&ixlib=rb-4.1.0&q=80&w=1080",
    address: "Beispielweg 45, 80331 München",
    energyClass: "B",
    status: "Analyse läuft",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1651666176094-2bef8442db12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzI4ODg5NjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    address: "Industrieallee 78, 20095 Hamburg",
    energyClass: "D",
    status: "Dokumente hochgeladen",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1719299224357-19232e85e6ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWxsYSUyMHByb3BlcnR5JTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzcyODg4OTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    address: "Villenstraße 12, 60311 Frankfurt",
    energyClass: "A",
    status: "ISFP Timeline erstellt",
  },
];

const energyClassColors: Record<string, string> = {
  "A": "bg-green-500 text-white",
  "B": "bg-lime-500 text-white",
  "C": "bg-yellow-500 text-white",
  "D": "bg-orange-500 text-white",
  "E": "bg-red-500 text-white",
};

export function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Willkommen zurück! Hier ist Ihre Übersicht.</p>
      </div>

      {/* KPI-Übersicht */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">4</div>
          <div className="text-gray-600">Anzahl Immobilien</div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">B</div>
          <div className="text-gray-600">Ø Energieklasse</div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <FileCheck className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">€45.000</div>
          <div className="text-gray-600">Einsparpotenzial</div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">7</div>
          <div className="text-gray-600">Offene Maßnahmen</div>
        </div>
      </div>

      {/* Meine Immobilien */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Meine Immobilien</h2>
          <Link
            to="/properties"
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
          >
            Alle anzeigen
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {properties.map((property) => (
            <Link
              key={property.id}
              to={`/properties/${property.id}`}
              className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 bg-gray-200">
                <ImageWithFallback
                  src={property.image}
                  alt={property.address}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${energyClassColors[property.energyClass]}`}>
                    {property.energyClass}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="font-semibold text-gray-900 mb-2">{property.address}</div>
                <div className="text-sm text-gray-600 mb-3">{property.status}</div>
                <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors group-hover:bg-blue-700">
                  Details ansehen
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Schnellaktionen */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Schnellaktionen</h2>
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-5 h-5" />
            Neue Immobilie hinzufügen
          </button>
          <Link
            to="/documents"
            className="flex items-center gap-3 px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Upload className="w-5 h-5" />
            Dokument hochladen
          </Link>
        </div>
      </div>
    </div>
  );
}
