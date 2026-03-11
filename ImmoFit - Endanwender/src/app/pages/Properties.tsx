import { Link } from "react-router";
import { Plus, Grid3x3, List } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// Mock data
const properties = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1559329146-807aff9ff1fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc3Mjc2OTQ1MXww&ixlib=rb-4.1.0&q=80&w=1080",
    address: "Musterstraße 123",
    city: "Berlin",
    postalCode: "10115",
    energyClass: "C",
    status: "KI-Analyse abgeschlossen",
    yearBuilt: 1995,
    area: 120,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1717245233537-1b51136c35ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGhvdXNlJTIwZmFjYWRlfGVufDF8fHx8MTc3Mjg4ODk2NHww&ixlib=rb-4.1.0&q=80&w=1080",
    address: "Beispielweg 45",
    city: "München",
    postalCode: "80331",
    energyClass: "B",
    status: "Analyse läuft",
    yearBuilt: 2005,
    area: 95,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1651666176094-2bef8442db12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzI4ODg5NjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    address: "Industrieallee 78",
    city: "Hamburg",
    postalCode: "20095",
    energyClass: "D",
    status: "Dokumente hochgeladen",
    yearBuilt: 1988,
    area: 250,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1719299224357-19232e85e6ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWxsYSUyMHByb3BlcnR5JTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzcyODg4OTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    address: "Villenstraße 12",
    city: "Frankfurt",
    postalCode: "60311",
    energyClass: "A",
    status: "ISFP Timeline erstellt",
    yearBuilt: 2018,
    area: 180,
  },
];

const energyClassColors: Record<string, string> = {
  "A": "bg-green-500 text-white",
  "B": "bg-lime-500 text-white",
  "C": "bg-yellow-500 text-white",
  "D": "bg-orange-500 text-white",
  "E": "bg-red-500 text-white",
};

export function Properties() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meine Immobilien</h1>
          <p className="text-gray-600 mt-2">{properties.length} Immobilien gefunden</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-5 h-5" />
            Neue Immobilie
          </button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Link
              key={property.id}
              to={`/properties/${property.id}`}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-56 bg-gray-200">
                <ImageWithFallback
                  src={property.image}
                  alt={property.address}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1.5 rounded-full text-sm font-bold ${energyClassColors[property.energyClass]}`}>
                    Klasse {property.energyClass}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="font-bold text-lg text-gray-900 mb-1">{property.address}</div>
                <div className="text-gray-600 mb-4">{property.postalCode} {property.city}</div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>Baujahr: {property.yearBuilt}</span>
                  <span>{property.area} m²</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{property.status}</span>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors group-hover:bg-blue-700">
                    Details
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Immobilie</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Energieklasse</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Baujahr</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Fläche</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Aktion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {properties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                          <ImageWithFallback
                            src={property.image}
                            alt={property.address}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{property.address}</div>
                          <div className="text-sm text-gray-600">{property.postalCode} {property.city}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${energyClassColors[property.energyClass]}`}>
                        {property.energyClass}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{property.yearBuilt}</td>
                    <td className="px-6 py-4 text-gray-900">{property.area} m²</td>
                    <td className="px-6 py-4 text-gray-600">{property.status}</td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/properties/${property.id}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
