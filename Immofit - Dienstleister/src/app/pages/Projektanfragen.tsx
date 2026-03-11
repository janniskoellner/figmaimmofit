import { useState } from "react";
import { Link } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Home, Building, ChevronLeft, ChevronRight } from "lucide-react";

const projectRequests = [
  {
    id: 1,
    isNew: true,
    propertyType: "Einfamilienhaus",
    icon: Home,
    address: "Musterstraße 12, 80331 München",
    year: 1985,
    area: 180,
    measures: ["Dachdämmung", "Fassadendämmung"],
    budget: "25.000 - 35.000 €",
    timeline: "Q2 2026",
  },
  {
    id: 2,
    isNew: true,
    propertyType: "Mehrfamilienhaus",
    icon: Building,
    address: "Hauptstraße 5, 81667 München",
    year: 1972,
    area: 450,
    measures: ["Wärmepumpe", "Kellerdeckendämmung"],
    budget: "40.000 - 55.000 €",
    timeline: "Q3 2026",
  },
  {
    id: 3,
    isNew: false,
    propertyType: "Doppelhaushälfte",
    icon: Home,
    address: "Gartenweg 8, 85748 Garching",
    year: 1998,
    area: 140,
    measures: ["Solar/PV-Anlage"],
    budget: "12.000 - 18.000 €",
    timeline: "Q1 2026",
  },
  {
    id: 4,
    isNew: true,
    propertyType: "Einfamilienhaus",
    icon: Home,
    address: "Waldstraße 22, 80539 München",
    year: 1990,
    area: 160,
    measures: ["Fenster & Türen"],
    budget: "18.000 - 25.000 €",
    timeline: "Q2 2026",
  },
  {
    id: 5,
    isNew: false,
    propertyType: "Mehrfamilienhaus",
    icon: Building,
    address: "Bahnhofstraße 15, 82008 Unterhaching",
    year: 1965,
    area: 320,
    measures: ["Dachdämmung", "Heizung"],
    budget: "35.000 - 50.000 €",
    timeline: "Q3 2026",
  },
  {
    id: 6,
    isNew: false,
    propertyType: "Einfamilienhaus",
    icon: Home,
    address: "Sonnenallee 33, 85764 Oberschleißheim",
    year: 2000,
    area: 200,
    measures: ["Fassadendämmung"],
    budget: "20.000 - 28.000 €",
    timeline: "Q2 2026",
  },
];

export function Projektanfragen() {
  const [showOnlyNew, setShowOnlyNew] = useState(false);

  const filteredRequests = showOnlyNew
    ? projectRequests.filter((r) => r.isNew)
    : projectRequests;

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <Card className="p-4 bg-[#F3F4F6] border-gray-200">
        <div className="flex items-center gap-4">
          <Select defaultValue="alle-massnahmen">
            <SelectTrigger className="w-48 bg-white">
              <SelectValue placeholder="Maßnahme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alle-massnahmen">Alle Maßnahmen</SelectItem>
              <SelectItem value="daemmung-fassade">Dämmung (Fassade)</SelectItem>
              <SelectItem value="daemmung-dach">Dämmung (Dach)</SelectItem>
              <SelectItem value="daemmung-keller">Dämmung (Keller)</SelectItem>
              <SelectItem value="waermepumpe">Heizung (Wärmepumpe)</SelectItem>
              <SelectItem value="gas">Heizung (Gas)</SelectItem>
              <SelectItem value="pellets">Heizung (Pellets)</SelectItem>
              <SelectItem value="solar">Solar/PV</SelectItem>
              <SelectItem value="fenster">Fenster & Türen</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="alle-regionen">
            <SelectTrigger className="w-40 bg-white">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alle-regionen">Alle Regionen</SelectItem>
              <SelectItem value="muenchen">München Stadt</SelectItem>
              <SelectItem value="muenchen-land">München Land</SelectItem>
              <SelectItem value="umland">Umland</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="alle-budgets">
            <SelectTrigger className="w-48 bg-white">
              <SelectValue placeholder="Budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alle-budgets">Alle Budgets</SelectItem>
              <SelectItem value="bis-10000">bis 10.000 €</SelectItem>
              <SelectItem value="10000-25000">10.000-25.000 €</SelectItem>
              <SelectItem value="25000-50000">25.000-50.000 €</SelectItem>
              <SelectItem value="ueber-50000">über 50.000 €</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Projekt suchen..."
            className="w-64 bg-white"
          />

          <div className="ml-auto flex items-center gap-2">
            <Switch
              id="nur-neue"
              checked={showOnlyNew}
              onCheckedChange={setShowOnlyNew}
            />
            <Label htmlFor="nur-neue" className="cursor-pointer">
              Nur neue Anfragen
            </Label>
          </div>
        </div>
      </Card>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{filteredRequests.length} Projektanfragen</h2>
        <Select defaultValue="neueste">
          <SelectTrigger className="w-56">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="neueste">Sortieren nach: Neueste zuerst</SelectItem>
            <SelectItem value="budget-hoch">Budget: Hoch → Niedrig</SelectItem>
            <SelectItem value="budget-niedrig">Budget: Niedrig → Hoch</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-3 gap-6">
        {filteredRequests.map((request) => {
          const Icon = request.icon;
          return (
            <Card
              key={request.id}
              className="p-6 bg-white shadow-sm hover:shadow-lg transition-shadow relative"
            >
              {request.isNew && (
                <Badge className="absolute top-4 right-4 bg-[#F59E0B] text-white hover:bg-[#F59E0B]">
                  NEU
                </Badge>
              )}

              <div className="flex items-center gap-2 mb-3">
                <Icon className="w-5 h-5 text-gray-600" />
                <span className="font-semibold text-gray-900">
                  {request.propertyType}
                </span>
              </div>

              <div className="text-sm text-gray-600 mb-4">{request.address}</div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Baujahr:</span>{" "}
                    <span className="font-medium">{request.year}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Wohnfläche:</span>{" "}
                    <span className="font-medium">{request.area} m²</span>
                  </div>
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {request.measures.map((measure) => (
                  <span
                    key={measure}
                    className="px-3 py-1 bg-blue-50 text-[#2563EB] text-sm rounded-full"
                  >
                    {measure}
                  </span>
                ))}
              </div>

              <div className="mb-2">
                <div className="text-xl font-bold text-gray-900 mb-1">
                  {request.budget}
                </div>
                <div className="text-sm text-gray-600">
                  Gewünscht: {request.timeline}
                </div>
              </div>

              <div className="space-y-2 mt-4 pt-4 border-t border-gray-200">
                <Button variant="outline" className="w-full" asChild>
                  <Link to={`/projektanfragen/${request.id}`}>
                    Details ansehen
                  </Link>
                </Button>
                <Button className="w-full bg-[#2563EB] hover:bg-[#1e40af]">
                  Angebot abgeben
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-8">
        <Button variant="outline" size="sm" disabled>
          <ChevronLeft className="w-4 h-4 mr-1" />
          Zurück
        </Button>
        <Button
          size="sm"
          className="bg-[#2563EB] hover:bg-[#1e40af] min-w-[2.5rem]"
        >
          1
        </Button>
        <Button variant="outline" size="sm" className="min-w-[2.5rem]">
          2
        </Button>
        <Button variant="outline" size="sm" className="min-w-[2.5rem]">
          3
        </Button>
        <Button variant="outline" size="sm">
          Weiter
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
