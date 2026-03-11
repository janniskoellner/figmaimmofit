import { Link } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Inbox, FolderOpen, CheckCircle, Star, ArrowRight } from "lucide-react";

const kpiData = [
  {
    title: "Neue Anfragen",
    value: "5",
    icon: Inbox,
    color: "#F59E0B",
    subtitle: "+2 heute",
  },
  {
    title: "Aktive Projekte",
    value: "3",
    icon: FolderOpen,
    color: "#2563EB",
    subtitle: "1 wartet auf Freigabe",
  },
  {
    title: "Abgeschlossen",
    value: "12",
    icon: CheckCircle,
    color: "#10B981",
    subtitle: "diesen Monat: 2",
  },
  {
    title: "Bewertung",
    value: "4.8",
    icon: Star,
    color: "#FBBF24",
    subtitle: "24 Bewertungen",
  },
];

const newRequests = [
  {
    id: 1,
    propertyType: "Einfamilienhaus",
    address: "Musterstraße 12, 80331 München",
    measure: "Dachdämmung",
    budget: "15.000 - 20.000 €",
    time: "vor 2 Stunden",
  },
  {
    id: 2,
    propertyType: "Mehrfamilienhaus",
    address: "Hauptstraße 5, 81667 München",
    measure: "Wärmepumpe",
    budget: "40.000 - 55.000 €",
    time: "vor 4 Stunden",
  },
  {
    id: 3,
    propertyType: "Doppelhaushälfte",
    address: "Gartenweg 8, 85748 Garching",
    measure: "Fassadendämmung",
    budget: "18.000 - 25.000 €",
    time: "vor 1 Tag",
  },
  {
    id: 4,
    propertyType: "Einfamilienhaus",
    address: "Waldstraße 22, 80539 München",
    measure: "Solar/PV",
    budget: "12.000 - 18.000 €",
    time: "vor 2 Tagen",
  },
];

const activeProjects = [
  {
    status: "In Arbeit",
    statusColor: "bg-[#2563EB]",
    title: "Fam. Schmidt · Dachsanierung",
    progress: 65,
    progressColor: "bg-[#10B981]",
    nextStep: "Nächster Schritt: Material bestellen",
    id: 1,
  },
  {
    status: "Beauftragt",
    statusColor: "bg-[#F59E0B]",
    title: "Fam. Weber · Wärmepumpe",
    progress: 15,
    progressColor: "bg-[#FBBF24]",
    nextStep: "Nächster Schritt: Termin vereinbaren",
    id: 2,
  },
  {
    status: "Wartet auf Freigabe",
    statusColor: "bg-gray-400",
    title: "Fam. Müller · Fassadendämmung",
    progress: 90,
    progressColor: "bg-[#10B981]",
    nextStep: "Nächster Schritt: Abnahme",
    id: 3,
  },
];

export function Dashboard() {
  return (
    <div className="space-y-8">
      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-6">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card
              key={kpi.title}
              className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm text-gray-600 mb-2">{kpi.title}</div>
                  <div className="text-3xl font-bold mb-1">{kpi.value}</div>
                  <div className="text-xs text-gray-500">{kpi.subtitle}</div>
                </div>
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `${kpi.color}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color: kpi.color }} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Neue Projektanfragen - 2 columns */}
        <div className="col-span-2">
          <Card className="p-6 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Neue Projektanfragen</h2>
              <Link
                to="/projektanfragen"
                className="text-[#2563EB] hover:underline text-sm flex items-center gap-1"
              >
                Alle ansehen <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {newRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center gap-4 p-4 border-b border-gray-100 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Badge className="bg-[#F59E0B] text-white hover:bg-[#F59E0B]">
                    NEU
                  </Badge>
                  <div className="flex-1">
                    <div className="font-medium mb-1">
                      {request.propertyType} · {request.address}
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                        {request.measure}
                      </span>
                      <span className="font-semibold text-gray-900">
                        {request.budget}
                      </span>
                      <span className="text-gray-500">{request.time}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/projektanfragen/${request.id}`}>Details</Link>
                    </Button>
                    <Button size="sm" className="bg-[#2563EB] hover:bg-[#1e40af]">
                      Angebot abgeben
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Aktive Projekte - 1 column */}
        <div>
          <Card className="p-6 bg-white shadow-sm">
            <h2 className="text-xl font-bold mb-6">Aktive Projekte</h2>

            <div className="space-y-4">
              {activeProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <Badge className={`${project.statusColor} text-white mb-3`}>
                    {project.status}
                  </Badge>
                  <div className="font-semibold mb-3">{project.title}</div>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Fortschritt</span>
                      <span className="font-semibold">{project.progress}%</span>
                    </div>
                    <Progress 
                      value={project.progress} 
                      className="h-2"
                      indicatorClassName={project.progressColor}
                    />
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    {project.nextStep}
                  </div>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to={`/projekte/${project.id}`}>
                      Projekt öffnen <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}