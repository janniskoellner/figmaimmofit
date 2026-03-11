import { useState, useRef } from "react";
import { Upload, Search, FileText, FileCog, FileCheck, X, Eye, Download } from "lucide-react";

const MOCK_DOCUMENTS = [
  { id: "d1", name: "Energieausweis_Musterstraße.pdf", property: "Musterstraße 123, Berlin", type: "Energieausweis", date: "15.01.2024", size: "1.2 MB", status: "analysiert" },
  { id: "d2", name: "Grundriss_EG_München.pdf", property: "Beispielweg 45, München", type: "Grundriss", date: "10.02.2024", size: "3.4 MB", status: "analysiert" },
  { id: "d3", name: "Heizkostenabrechnung_2023.pdf", property: "Musterstraße 123, Berlin", type: "Abrechnung", date: "20.03.2024", size: "0.8 MB", status: "analysiert" },
  { id: "d4", name: "Baupläne_Hamburg.pdf", property: "Industrieallee 78, Hamburg", type: "Baupläne", date: "05.04.2024", size: "5.1 MB", status: "läuft" },
  { id: "d5", name: "Fotos_Dach_Hamburg.zip", property: "Industrieallee 78, Hamburg", type: "Fotos", date: "08.04.2024", size: "18.3 MB", status: "neu" },
  { id: "d6", name: "ISFP_Frankfurt_2024.pdf", property: "Villenstraße 12, Frankfurt", type: "ISFP", date: "01.12.2023", size: "2.7 MB", status: "analysiert" },
];

const TYPE_ICONS: Record<string, React.ReactNode> = {
  Energieausweis: <FileCheck className="w-5 h-5 text-green-500" />,
  Grundriss: <FileCog className="w-5 h-5 text-blue-500" />,
  Abrechnung: <FileText className="w-5 h-5 text-orange-500" />,
  Baupläne: <FileCog className="w-5 h-5 text-purple-500" />,
  Fotos: <FileText className="w-5 h-5 text-pink-500" />,
  ISFP: <FileCheck className="w-5 h-5 text-teal-500" />,
};

const STATUS_STYLES: Record<string, string> = {
  analysiert: "bg-green-100 text-green-700",
  läuft: "bg-yellow-100 text-yellow-700",
  neu: "bg-blue-100 text-blue-600",
};

export function Dokumente() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterProperty, setFilterProperty] = useState("Alle");
  const [filterType, setFilterType] = useState("Alle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const properties = ["Alle", "Musterstraße 123, Berlin", "Beispielweg 45, München", "Industrieallee 78, Hamburg", "Villenstraße 12, Frankfurt"];
  const types = ["Alle", "Energieausweis", "Grundriss", "Abrechnung", "Baupläne", "Fotos", "ISFP"];

  const filtered = MOCK_DOCUMENTS.filter((doc) => {
    const matchSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchProperty = filterProperty === "Alle" || doc.property === filterProperty;
    const matchType = filterType === "Alle" || doc.type === filterType;
    return matchSearch && matchProperty && matchType;
  });

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setUploadedFiles((prev) => [...prev, ...files.map((f) => f.name)]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles((prev) => [...prev, ...files.map((f) => f.name)]);
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl text-gray-900">Dokumente</h1>
        <p className="text-sm text-gray-500 mt-1">Verwalten Sie alle Dokumente Ihrer Immobilien</p>
      </div>

      {/* Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-10 text-center mb-8 transition-colors ${isDragging ? "border-blue-400 bg-blue-50" : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/30"}`}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
            <Upload className="w-7 h-7 text-blue-500" />
          </div>
          <div>
            <p className="text-gray-700">Dokumente hierher ziehen oder</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Datei auswählen
            </button>
          </div>
          <p className="text-xs text-gray-400">PDF, JPG, PNG, ZIP bis 50 MB</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            <p className="text-xs text-blue-600">Automatische KI-Analyse nach dem Upload</p>
          </div>
        </div>
        <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileChange} />
      </div>

      {/* Uploaded file notifications */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2 mb-6">
          {uploadedFiles.map((name, i) => (
            <div key={i} className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              <FileText className="w-4 h-4 text-green-500" />
              <p className="text-sm text-green-700 flex-1">{name} – wird analysiert...</p>
              <button onClick={() => setUploadedFiles((prev) => prev.filter((_, idx) => idx !== i))}>
                <X className="w-4 h-4 text-green-500" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Dokument suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 bg-white"
          />
        </div>
        <select
          value={filterProperty}
          onChange={(e) => setFilterProperty(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 bg-white min-w-56"
        >
          {properties.map((p) => <option key={p}>{p}</option>)}
        </select>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 bg-white"
        >
          {types.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>

      {/* Document List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-5 gap-4 px-6 py-3 bg-gray-50 text-xs text-gray-500 border-b border-gray-100">
          <span className="col-span-2">Dokument</span>
          <span>Immobilie</span>
          <span>Datum</span>
          <span>Status</span>
        </div>
        {filtered.map((doc) => (
          <div key={doc.id} className="grid grid-cols-5 gap-4 px-6 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors items-center">
            <div className="col-span-2 flex items-center gap-3">
              <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
                {TYPE_ICONS[doc.type] || <FileText className="w-5 h-5 text-gray-400" />}
              </div>
              <div className="min-w-0">
                <p className="text-sm text-gray-900 truncate">{doc.name}</p>
                <p className="text-xs text-gray-400">{doc.type} · {doc.size}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 truncate">{doc.property.split(",")[0]}</p>
            <p className="text-sm text-gray-500">{doc.date}</p>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded-full ${STATUS_STYLES[doc.status]}`}>{doc.status}</span>
              <div className="flex gap-1 ml-auto">
                <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                  <Eye className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                  <Download className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-12 text-center text-gray-400 text-sm">
            Keine Dokumente gefunden
          </div>
        )}
      </div>
    </div>
  );
}
