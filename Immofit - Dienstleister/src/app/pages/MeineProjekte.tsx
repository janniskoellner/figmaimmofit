import { useState } from "react";
import { Link } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { User, MapPin, Wrench, Euro, Calendar, ArrowRight } from "lucide-react";

const activeProjects = [
  {
    id: 1,
    status: "In Arbeit",
    statusColor: "bg-[#2563EB]",
    title: "Dachsanierung",
    customer: "Fam. Schmidt",
    phone: "089 12345678",
    address: "Musterstraße 12, 80331 München",
    measure: "Dachdämmung + Dacheindeckung",
    contractSum: "28.500 €",
    timeline: "15.04.2026 - 30.06.2026",
    progress: 65,
    nextStep: "Material bestellen",
  },
  {
    id: 2,
    status: "Beauftragt",
    statusColor: "bg-[#F59E0B]",
    title: "Wärmepumpe Installation",
    customer: "Fam. Weber",
    phone: "089 98765432",
    address: "Hauptstraße 5, 81667 München",
    measure: "Luft-Wasser-Wärmepumpe inkl. Installation",
    contractSum: "42.000 €",
    timeline: "01.07.2026 - 15.09.2026",
    progress: 15,
    nextStep: "Termin vereinbaren",
  },
  {
    id: 3,
    status: "Wartet auf Freigabe",
    statusColor: "bg-gray-400",
    title: "Fassadendämmung",
    customer: "Fam. Müller",
    phone: "089 55566677",
    address: "Gartenweg 8, 85748 Garching",
    measure: "WDVS Fassadendämmung 16cm",
    contractSum: "35.200 €",
    timeline: "01.03.2026 - 30.04.2026",
    progress: 90,
    nextStep: "Abnahme durch Kunden",
  },
];

const completedProjects = [
  {
    id: 101,
    status: "Abgeschlossen",
    statusColor: "bg-[#10B981]",
    title: "Kellerdeckendämmung",
    customer: "Fam. Bauer",
    phone: "089 77788899",
    address: "Sonnenallee 44, 85764 Oberschleißheim",
    measure: "Kellerdeckendämmung 12cm",
    contractSum: "8.500 €",
    timeline: "01.01.2026 - 15.02.2026",
    progress: 100,
    completedDate: "16.02.2026",
  },
  {
    id: 102,
    status: "Abgeschlossen",
    statusColor: "bg-[#10B981]",
    title: "Fensteraustausch",
    customer: "Herr Schneider",
    phone: "089 11122233",
    address: "Waldweg 9, 82008 Unterhaching",
    measure: "12 Fenster 3-fach-Verglasung",
    contractSum: "22.800 €",
    timeline: "15.12.2025 - 10.01.2026",
    progress: 100,
    completedDate: "12.01.2026",
  },
];

const submittedOffers = [
  {
    id: 201,
    status: "Wartet auf Antwort",
    statusColor: "bg-[#F59E0B]",
    title: "Solar/PV-Anlage",
    customer: "Fam. Wagner",
    address: "Bergstraße 33, 80331 München",
    measure: "10 kWp PV-Anlage mit Speicher",
    offerSum: "18.500 €",
    sentDate: "08.03.2026",
  },
  {
    id: 202,
    status: "Abgelehnt",
    statusColor: "bg-gray-400",
    title: "Heizungstausch",
    customer: "Herr Fischer",
    address: "Marktplatz 7, 85748 Garching",
    measure: "Gas-Brennwertheizung",
    offerSum: "12.000 €",
    sentDate: "02.03.2026",
  },
];

export function MeineProjekte() {
  const [activeTab, setActiveTab] = useState("aktiv");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Meine Projekte</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger
            value="aktiv"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#2563EB] data-[state=active]:bg-transparent px-6 py-3"
          >
            Aktive Projekte ({activeProjects.length})
          </TabsTrigger>
          <TabsTrigger
            value="abgeschlossen"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#2563EB] data-[state=active]:bg-transparent px-6 py-3"
          >
            Abgeschlossene Projekte ({completedProjects.length})
          </TabsTrigger>
          <TabsTrigger
            value="angebote"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#2563EB] data-[state=active]:bg-transparent px-6 py-3"
          >
            Gesendete Angebote ({submittedOffers.length})
          </TabsTrigger>
        </TabsList>

        {/* Active Projects Tab */}
        <TabsContent value="aktiv" className="mt-6 space-y-4">
          {activeProjects.map((project) => (
            <Card
              key={project.id}
              className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-8">
                {/* Left Section - 70% */}
                <div className="flex-1">
                  <Badge className={`${project.statusColor} text-white mb-3`}>
                    {project.status}
                  </Badge>
                  <h3 className="text-xl font-bold mb-4">{project.title}</h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <User className="w-4 h-4" />
                      <span>
                        {project.customer} · Tel: {project.phone}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="w-4 h-4" />
                      <span>{project.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Wrench className="w-4 h-4" />
                      <span>{project.measure}</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-gray-900">
                      <Euro className="w-4 h-4" />
                      <span>{project.contractSum}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="w-4 h-4" />
                      <span>{project.timeline}</span>
                    </div>
                  </div>
                </div>

                {/* Right Section - 30% */}
                <div className="w-80 space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Fortschritt</span>
                      <span className="font-bold text-lg">{project.progress}%</span>
                    </div>
                    <Progress
                      value={project.progress}
                      className="h-3"
                      indicatorClassName={
                        project.progress >= 70 ? "bg-[#10B981]" : "bg-[#FBBF24]"
                      }
                    />
                  </div>

                  <Card className="p-3 bg-gray-50 border border-gray-200">
                    <div className="text-xs text-gray-600 mb-1">
                      Nächster Schritt:
                    </div>
                    <div className="font-medium text-sm">{project.nextStep}</div>
                  </Card>

                  <Button className="w-full bg-[#2563EB] hover:bg-[#1e40af]" asChild>
                    <Link to={`/projekte/${project.id}`}>
                      Projekt öffnen <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        {/* Completed Projects Tab */}
        <TabsContent value="abgeschlossen" className="mt-6 space-y-4">
          {completedProjects.map((project) => (
            <Card
              key={project.id}
              className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-8">
                <div className="flex-1">
                  <Badge className={`${project.statusColor} text-white mb-3`}>
                    {project.status}
                  </Badge>
                  <h3 className="text-xl font-bold mb-4">{project.title}</h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <User className="w-4 h-4" />
                      <span>
                        {project.customer} · Tel: {project.phone}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="w-4 h-4" />
                      <span>{project.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Wrench className="w-4 h-4" />
                      <span>{project.measure}</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-gray-900">
                      <Euro className="w-4 h-4" />
                      <span>{project.contractSum}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="w-4 h-4" />
                      <span>{project.timeline}</span>
                    </div>
                    <div className="text-gray-600 mt-2">
                      Abgeschlossen am: {project.completedDate}
                    </div>
                  </div>
                </div>

                <div className="w-80">
                  <Progress value={100} className="h-3 mb-4" />
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={`/projekte/${project.id}`}>
                      Projekt ansehen <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        {/* Submitted Offers Tab */}
        <TabsContent value="angebote" className="mt-6 space-y-4">
          {submittedOffers.map((offer) => (
            <Card
              key={offer.id}
              className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-8">
                <div className="flex-1">
                  <Badge className={`${offer.statusColor} text-white mb-3`}>
                    {offer.status}
                  </Badge>
                  <h3 className="text-xl font-bold mb-4">{offer.title}</h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <User className="w-4 h-4" />
                      <span>{offer.customer}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="w-4 h-4" />
                      <span>{offer.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Wrench className="w-4 h-4" />
                      <span>{offer.measure}</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-gray-900">
                      <Euro className="w-4 h-4" />
                      <span>{offer.offerSum}</span>
                    </div>
                    <div className="text-gray-600 mt-2">
                      Angebot gesendet am: {offer.sentDate}
                    </div>
                  </div>
                </div>

                <div className="w-80">
                  <Button variant="outline" className="w-full">
                    Angebot ansehen
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}