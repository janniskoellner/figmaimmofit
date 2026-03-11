import { useState } from "react";
import { Link } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  ChevronLeft,
  MapPin,
  Phone,
  Mail,
  Check,
  Circle,
  Upload,
  FileText,
  Image as ImageIcon,
  Download,
  Paperclip,
  Send,
} from "lucide-react";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";

const milestones = [
  { id: 1, label: "Aufmaß genommen", completed: true, date: "16.04.2026" },
  { id: 2, label: "Angebot bestätigt", completed: true, date: "18.04.2026" },
  {
    id: 3,
    label: "Material bestellt",
    completed: false,
    plannedDate: "25.04.2026",
  },
  { id: 4, label: "Gerüst aufgebaut", completed: false, plannedDate: "01.05.2026" },
  { id: 5, label: "Dämmung verlegt", completed: false, plannedDate: "15.05.2026" },
  { id: 6, label: "Abnahme", completed: false, plannedDate: "28.06.2026" },
];

const documents = [
  {
    id: 1,
    name: "Angebot_Dachsanierung_Schmidt.pdf",
    category: "Angebote",
    date: "18.04.2026",
    size: "2.1 MB",
    type: "pdf",
  },
  {
    id: 2,
    name: "Vertrag_unterschrieben.pdf",
    category: "Verträge",
    date: "20.04.2026",
    size: "1.8 MB",
    type: "pdf",
  },
  {
    id: 3,
    name: "Dach_vorher_01.jpg",
    category: "Fotos",
    date: "16.04.2026",
    size: "3.2 MB",
    type: "image",
  },
  {
    id: 4,
    name: "Dach_vorher_02.jpg",
    category: "Fotos",
    date: "16.04.2026",
    size: "2.8 MB",
    type: "image",
  },
];

const messages = [
  {
    id: 1,
    sender: "customer",
    text: "Hallo, wann können Sie mit der Dachsanierung beginnen?",
    timestamp: "10.03.2026, 14:32",
  },
  {
    id: 2,
    sender: "provider",
    text: "Guten Tag Herr Schmidt, wir können am 15. April starten. Ich schicke Ihnen vorab das Material-Angebot.",
    timestamp: "10.03.2026, 15:10",
  },
  {
    id: 3,
    sender: "customer",
    text: "Das klingt gut! Bitte berücksichtigen Sie auch die Südseite für mögliche PV-Vorbereitung.",
    timestamp: "10.03.2026, 16:45",
  },
  {
    id: 4,
    sender: "provider",
    text: "Selbstverständlich, ich plane das mit ein. Hier das aktualisierte Angebot.",
    timestamp: "11.03.2026, 09:20",
    attachment: "Angebot_v2.pdf",
  },
];

export function ProjektDetail() {
  const [activeTab, setActiveTab] = useState("uebersicht");
  const [status, setStatus] = useState("in-arbeit");

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Link
        to="/meine-projekte"
        className="inline-flex items-center text-[#2563EB] hover:underline"
      >
        <ChevronLeft className="w-4 h-4" />
        Meine Projekte → Dachsanierung · Fam. Schmidt
      </Link>

      {/* Project Header */}
      <Card className="p-6 bg-white shadow-sm">
        <div className="flex justify-between items-start">
          {/* Left side */}
          <div>
            <h1 className="text-3xl font-bold mb-4">Dachsanierung</h1>
            <div className="mb-4">
              <Label className="text-sm text-gray-600 mb-2 block">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beauftragt">Beauftragt</SelectItem>
                  <SelectItem value="in-arbeit">In Arbeit</SelectItem>
                  <SelectItem value="wartet">Wartet auf Freigabe</SelectItem>
                  <SelectItem value="abgeschlossen">Abgeschlossen</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-4 text-sm">
              <button className="flex items-center gap-2 text-[#2563EB] hover:underline">
                <Phone className="w-4 h-4" />
                Fam. Schmidt
              </button>
              <button className="flex items-center gap-2 text-[#2563EB] hover:underline">
                <Mail className="w-4 h-4" />
                Email
              </button>
            </div>
          </div>

          {/* Right side */}
          <div className="text-right">
            <div className="flex items-center gap-2 text-gray-700 mb-2">
              <MapPin className="w-4 h-4" />
              <span>Musterstraße 12, 80331 München</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">28.500 €</div>
            <div className="text-sm text-gray-600">15.04.2026 - 30.06.2026</div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger
            value="uebersicht"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#2563EB] data-[state=active]:bg-transparent px-6 py-3"
          >
            Übersicht
          </TabsTrigger>
          <TabsTrigger
            value="dokumente"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#2563EB] data-[state=active]:bg-transparent px-6 py-3"
          >
            Dokumente
          </TabsTrigger>
          <TabsTrigger
            value="kommunikation"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#2563EB] data-[state=active]:bg-transparent px-6 py-3"
          >
            Kommunikation
          </TabsTrigger>
        </TabsList>

        {/* TAB 1 - Übersicht */}
        <TabsContent value="uebersicht" className="mt-6 space-y-6">
          {/* Timeline */}
          <Card className="p-6 bg-white shadow-sm">
            <h2 className="text-lg font-bold mb-6">Projektphasen</h2>
            <div className="flex items-center justify-between relative">
              {/* Background line */}
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200" />
              <div
                className="absolute top-6 left-0 h-0.5 bg-[#10B981]"
                style={{ width: "25%" }}
              />

              {/* Phases */}
              <div className="flex-1 flex justify-between relative z-10">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#10B981] flex items-center justify-center mb-3 mx-auto">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-semibold">Planung</div>
                  <div className="text-sm text-gray-600">15.04 - 20.04</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#2563EB] flex items-center justify-center mb-3 mx-auto border-4 border-white shadow-lg animate-pulse">
                    <Circle className="w-6 h-6 text-white fill-white" />
                  </div>
                  <div className="font-semibold text-[#2563EB]">Material</div>
                  <div className="text-sm text-gray-600">21.04 - 30.04</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-3 mx-auto">
                    <Circle className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="font-semibold text-gray-400">Ausführung</div>
                  <div className="text-sm text-gray-600">01.05 - 20.06</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-3 mx-auto">
                    <Circle className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="font-semibold text-gray-400">Abnahme</div>
                  <div className="text-sm text-gray-600">21.06 - 28.06</div>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-3 gap-6">
            {/* Milestones */}
            <div className="col-span-2">
              <Card className="p-6 bg-white shadow-sm">
                <h2 className="text-lg font-bold mb-6">Meilensteine</h2>
                <div className="space-y-3">
                  {milestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-center gap-3">
                      <Checkbox checked={milestone.completed} />
                      <div className="flex-1">
                        <span
                          className={
                            milestone.completed
                              ? "line-through text-gray-500"
                              : "font-medium"
                          }
                        >
                          {milestone.label}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {milestone.completed
                          ? milestone.date
                          : `geplant: ${milestone.plannedDate}`}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div>
              <Card className="p-6 bg-white shadow-sm">
                <h2 className="text-lg font-bold mb-6">Aktionen</h2>
                <div className="space-y-3">
                  <Button className="w-full bg-[#2563EB] hover:bg-[#1e40af]">
                    Status aktualisieren
                  </Button>
                  <Button variant="outline" className="w-full">
                    Rechnung erstellen
                  </Button>
                  <Button variant="outline" className="w-full">
                    Kunde kontaktieren
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-[#10B981] border-[#10B981] hover:bg-[#10B981] hover:text-white"
                  >
                    Projekt abschließen
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* TAB 2 - Dokumente */}
        <TabsContent value="dokumente" className="mt-6 space-y-6">
          {/* Upload Section */}
          <Card className="p-6 bg-white shadow-sm">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#2563EB] transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-lg font-medium text-gray-700 mb-1">
                Dokument hochladen
              </p>
              <p className="text-sm text-gray-500">
                PDF, JPG, PNG (max. 10 MB)
              </p>
            </div>
          </Card>

          {/* Document List */}
          <Card className="p-6 bg-white shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-lg font-bold">Dokumente</h2>
              <div className="flex gap-2 text-sm">
                <Button variant="ghost" size="sm">
                  Alle
                </Button>
                <Button variant="ghost" size="sm">
                  Angebote
                </Button>
                <Button variant="ghost" size="sm">
                  Verträge
                </Button>
                <Button variant="ghost" size="sm">
                  Rechnungen
                </Button>
                <Button variant="ghost" size="sm">
                  Fotos
                </Button>
                <Button variant="ghost" size="sm">
                  Protokolle
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="p-2 bg-gray-100 rounded">
                    {doc.type === "pdf" ? (
                      <FileText className="w-5 h-5 text-red-600" />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{doc.name}</div>
                    <div className="text-sm text-gray-600">
                      {doc.category} · {doc.date}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">{doc.size}</div>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* TAB 3 - Kommunikation */}
        <TabsContent value="kommunikation" className="mt-6">
          <Card className="p-6 bg-white shadow-sm h-[600px] flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "provider" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-4 ${
                      message.sender === "provider"
                        ? "bg-[#2563EB] text-white"
                        : "bg-gray-200 text-gray-900"
                    }`}
                  >
                    <p className="mb-2">{message.text}</p>
                    {message.attachment && (
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/20">
                        <Paperclip className="w-4 h-4" />
                        <span className="text-sm">{message.attachment}</span>
                      </div>
                    )}
                    <p className="text-xs opacity-75 mt-2">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="border-t pt-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Nachricht schreiben..."
                  className="flex-1"
                />
                <Button variant="ghost" size="icon">
                  <Paperclip className="w-5 h-5" />
                </Button>
                <Button size="icon" className="bg-[#2563EB] hover:bg-[#1e40af]">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
