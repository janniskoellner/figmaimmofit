import { Users, Search, Star, MapPin, Phone, Mail, Award, Plus } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const serviceProviders = [
  {
    id: 1,
    name: "Energieberatung Schmidt",
    type: "Berater",
    rating: 4.8,
    reviews: 124,
    location: "Berlin",
    specialties: ["Energieausweis", "ISFP", "Förderberatung"],
    description: "Zertifizierte Energieberatung mit über 15 Jahren Erfahrung",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
  },
  {
    id: 2,
    name: "Dämmtechnik Meyer GmbH",
    type: "Handwerker",
    rating: 4.9,
    reviews: 89,
    location: "München",
    specialties: ["Fassadendämmung", "Dachdämmung", "WDVS"],
    description: "Spezialist für alle Arten der Gebäudedämmung",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400",
  },
  {
    id: 3,
    name: "Wärmepumpen Nord",
    type: "Handwerker",
    rating: 4.7,
    reviews: 156,
    location: "Hamburg",
    specialties: ["Wärmepumpen", "Heizungssanierung", "Solarthermie"],
    description: "Ihr Partner für moderne Heizsysteme",
    image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=400",
  },
  {
    id: 4,
    name: "Fenster & Türen Fischer",
    type: "Handwerker",
    rating: 4.6,
    reviews: 98,
    location: "Frankfurt",
    specialties: ["Fenstertausch", "Türen", "Dreifachverglasung"],
    description: "Qualitätsfenster für energieeffizientes Wohnen",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400",
  },
  {
    id: 5,
    name: "Grüne Energie Beratung",
    type: "Berater",
    rating: 4.9,
    reviews: 167,
    location: "Stuttgart",
    specialties: ["KfW-Förderung", "BAFA", "Steuerberatung"],
    description: "Experten für Fördermittel und Finanzierung",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
  },
  {
    id: 6,
    name: "Solar Plus Installation",
    type: "Handwerker",
    rating: 4.8,
    reviews: 134,
    location: "Köln",
    specialties: ["Photovoltaik", "Solarthermie", "Energiespeicher"],
    description: "Solaranlagen vom Fachbetrieb",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
  },
];

export function Network() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  const types = ["all", "Berater", "Handwerker"];
  const allSpecialties = Array.from(
    new Set(serviceProviders.flatMap((provider) => provider.specialties))
  );

  const filteredProviders = serviceProviders.filter((provider) => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || provider.type === selectedType;
    const matchesSpecialty = selectedSpecialty === "all" || 
      provider.specialties.includes(selectedSpecialty);
    return matchesSearch && matchesType && matchesSpecialty;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Netzwerk</h1>
        <p className="text-gray-600 mt-2">
          Finden Sie qualifizierte Berater und Handwerker für Ihre Sanierungsvorhaben
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Suchen</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Name oder Leistung..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Typ</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type === "all" ? "Alle Typen" : type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fachgebiet</label>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              <option value="all">Alle Fachgebiete</option>
              {allSpecialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">{filteredProviders.length} Dienstleister gefunden</p>
        <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          <Plus className="w-5 h-5" />
          Dienstleister vorschlagen
        </button>
      </div>

      {/* Service Providers Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredProviders.map((provider) => (
          <div
            key={provider.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <ImageWithFallback
                    src={provider.image}
                    alt={provider.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{provider.name}</h3>
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded mt-1">
                        {provider.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-semibold text-gray-900">{provider.rating}</span>
                    </div>
                    <span className="text-gray-500">({provider.reviews} Bewertungen)</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{provider.description}</p>

              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Fachgebiete:</div>
                <div className="flex flex-wrap gap-2">
                  {provider.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <MapPin className="w-4 h-4" />
                <span>{provider.location}</span>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Users className="w-4 h-4" />
                  Kontaktieren
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Profil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProviders.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Keine Dienstleister gefunden</p>
          <p className="text-sm text-gray-500">Versuchen Sie andere Suchkriterien</p>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Award className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Qualitätsgeprüfte Dienstleister</h3>
            <p className="text-gray-700 text-sm">
              Alle aufgeführten Berater und Handwerker wurden von uns geprüft und erfüllen hohe 
              Qualitätsstandards. Sie verfügen über die notwendigen Zertifikate und Qualifikationen 
              für energetische Sanierungen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
