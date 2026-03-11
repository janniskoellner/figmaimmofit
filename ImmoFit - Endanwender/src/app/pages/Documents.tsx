import { Upload, FileText, Search, Filter, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

// Mock documents
const allDocuments = [
  {
    id: 1,
    name: "Energieausweis.pdf",
    type: "Energieausweis",
    property: "Musterstraße 123, Berlin",
    date: "15.02.2026",
    size: "2.4 MB",
  },
  {
    id: 2,
    name: "Grundriss.pdf",
    type: "Grundriss",
    property: "Musterstraße 123, Berlin",
    date: "10.02.2026",
    size: "1.8 MB",
  },
  {
    id: 3,
    name: "Heizungsprotokoll.pdf",
    type: "Wartung",
    property: "Beispielweg 45, München",
    date: "05.02.2026",
    size: "890 KB",
  },
  {
    id: 4,
    name: "Fassadenfotos.zip",
    type: "Fotos",
    property: "Musterstraße 123, Berlin",
    date: "01.02.2026",
    size: "12.3 MB",
  },
  {
    id: 5,
    name: "Sanierungsplan.pdf",
    type: "ISFP",
    property: "Industrieallee 78, Hamburg",
    date: "28.01.2026",
    size: "3.2 MB",
  },
  {
    id: 6,
    name: "Förderantrag.pdf",
    type: "Förderung",
    property: "Villenstraße 12, Frankfurt",
    date: "25.01.2026",
    size: "1.5 MB",
  },
];

export function Documents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedProperty, setSelectedProperty] = useState("all");
  const [isDragging, setIsDragging] = useState(false);

  const documentTypes = ["all", "Energieausweis", "Grundriss", "Wartung", "Fotos", "ISFP", "Förderung"];
  const properties = [
    "all",
    "Musterstraße 123, Berlin",
    "Beispielweg 45, München",
    "Industrieallee 78, Hamburg",
    "Villenstraße 12, Frankfurt",
  ];

  const filteredDocuments = allDocuments.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || doc.type === selectedType;
    const matchesProperty = selectedProperty === "all" || doc.property === selectedProperty;
    return matchesSearch && matchesType && matchesProperty;
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file upload here
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dokumente</h1>
        <p className="text-gray-600 mt-2">Verwalten Sie alle Dokumente Ihrer Immobilien</p>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
          }`}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-blue-100 rounded-full">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Dokumente hochladen</h3>
              <p className="text-gray-600 mb-4">
                Ziehen Sie Dateien hierher oder klicken Sie zum Durchsuchen
              </p>
            </div>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Datei auswählen
            </button>
            <p className="text-sm text-gray-500 mt-2">
              Automatische KI-Analyse nach Upload
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-4 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filter</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nach Immobilie filtern
            </label>
            <select
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              {properties.map((property) => (
                <option key={property} value={property}>
                  {property === "all" ? "Alle Immobilien" : property}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nach Dokumenttyp
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              {documentTypes.map((type) => (
                <option key={type} value={type}>
                  {type === "all" ? "Alle Typen" : type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Suchen
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Dokument suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {filteredDocuments.length} Dokumente gefunden
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="h-32 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                {doc.type === "Fotos" ? (
                  <ImageIcon className="w-12 h-12 text-blue-600" />
                ) : (
                  <FileText className="w-12 h-12 text-blue-600" />
                )}
              </div>
              <div className="p-4">
                <div className="font-semibold text-gray-900 mb-1 truncate">{doc.name}</div>
                <div className="text-sm text-gray-600 mb-2">
                  <span className="inline-block px-2 py-1 bg-gray-100 rounded text-xs font-medium mr-2">
                    {doc.type}
                  </span>
                  {doc.size}
                </div>
                <div className="text-sm text-gray-600 mb-3 truncate">{doc.property}</div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{doc.date}</span>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Öffnen
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">Keine Dokumente gefunden</p>
          </div>
        )}
      </div>
    </div>
  );
}
