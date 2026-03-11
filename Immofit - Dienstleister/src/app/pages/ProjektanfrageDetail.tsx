import { useState } from "react";
import { Link } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Checkbox } from "../components/ui/checkbox";
import { ChevronLeft, ChevronRight, Upload, Check } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const propertyImages = [
  "https://images.unsplash.com/photo-1756646165604-6155a65dbd8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZXJtYW4lMjBob3VzZSUyMGV4dGVyaW9yJTIwcmVzaWRlbnRpYWx8ZW58MXx8fHwxNzczMjY1ODI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1770928755532-a3d1d79d50be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBldXJvcGVhbiUyMGhvdXNlJTIwZmFjYWRlfGVufDF8fHx8MTc3MzI2NTgzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1771479755055-6a305f50845e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGJ1aWxkaW5nJTIwcm9vZiUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzMyNjU4MzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
];

export function ProjektanfrageDetail() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % propertyImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? propertyImages.length - 1 : prev - 1
    );
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto">
        <Link
          to="/projektanfragen"
          className="inline-flex items-center text-[#2563EB] hover:underline mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Zurück zu Projektanfragen
        </Link>

        <Card className="p-12 bg-white shadow-sm text-center">
          <div className="w-16 h-16 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-[#10B981] mb-2">
            Angebot erfolgreich gesendet!
          </h2>
          <p className="text-gray-600 mb-6">
            Ihr Angebot wurde an den Kunden übermittelt. Sie werden benachrichtigt,
            sobald der Kunde eine Entscheidung getroffen hat.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link to="/projektanfragen">Zu Projektanfragen</Link>
            </Button>
            <Button className="bg-[#2563EB] hover:bg-[#1e40af]" asChild>
              <Link to="/">Zum Dashboard</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <Link
        to="/projektanfragen"
        className="inline-flex items-center text-[#2563EB] hover:underline"
      >
        <ChevronLeft className="w-4 h-4" />
        Zurück zu Projektanfragen
      </Link>

      {/* Property Header */}
      <Card className="p-6 bg-white shadow-sm">
        <div className="grid grid-cols-2 gap-8">
          {/* Image Carousel */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-200">
              <ImageWithFallback
                src={propertyImages[currentImageIndex]}
                alt="Property"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {propertyImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Property Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-2xl font-bold">Musterstraße 12, 80331 München</h1>
              <Badge className="bg-[#F59E0B] text-white hover:bg-[#F59E0B]">
                NEU
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-500">Baujahr</div>
                <div className="font-semibold">1985</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Wohnfläche</div>
                <div className="font-semibold">180 m²</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Grundstück</div>
                <div className="font-semibold">450 m²</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Aktuelles Heizsystem</div>
                <div className="font-semibold">Gas-Brennwert</div>
              </div>
              <div className="col-span-2">
                <div className="text-sm text-gray-500">Energieklasse</div>
                <Badge className="bg-[#F59E0B] text-white hover:bg-[#F59E0B] mt-1">
                  E
                </Badge>
              </div>
            </div>

            <div className="text-sm text-gray-500 mt-6">
              Erstellt am: 10.03.2026
            </div>
          </div>
        </div>
      </Card>

      {/* Gewünschte Maßnahmen */}
      <Card className="p-6 bg-white shadow-sm">
        <h2 className="text-xl font-bold mb-6">Gewünschte Maßnahmen</h2>

        <div className="space-y-4 mb-6">
          <Card className="p-4 border-2 border-blue-100 bg-blue-50">
            <div className="font-semibold text-lg mb-2">Maßnahme 1: Dachdämmung</div>
            <div className="text-sm text-gray-700 mb-3">
              Komplette Dachdämmung inkl. Dampfsperre
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Geschätzte Kosten (ISFP):</span>{" "}
                <span className="font-semibold">12.000 - 15.000 €</span>
              </div>
              <div>
                <span className="text-gray-600">Einsparung/Jahr:</span>{" "}
                <span className="font-semibold text-[#10B981]">450 €</span>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-2 border-blue-100 bg-blue-50">
            <div className="font-semibold text-lg mb-2">
              Maßnahme 2: Fassadendämmung
            </div>
            <div className="text-sm text-gray-700 mb-3">
              WDVS Fassadendämmung, 16cm
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Geschätzte Kosten (ISFP):</span>{" "}
                <span className="font-semibold">18.000 - 22.000 €</span>
              </div>
              <div>
                <span className="text-gray-600">Einsparung/Jahr:</span>{" "}
                <span className="font-semibold text-[#10B981]">680 €</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Gesamtbudget:</span>
            <span className="text-2xl font-bold text-[#2563EB]">
              25.000 - 35.000 €
            </span>
          </div>
          <div className="text-sm text-gray-600">
            Gewünschter Zeitraum: Start Q2 2026
          </div>
        </div>
      </Card>

      {/* Besondere Anforderungen */}
      <Card className="p-6 bg-gray-50 border border-gray-200">
        <h3 className="font-semibold mb-3">Besondere Anforderungen</h3>
        <p className="text-sm text-gray-700 mb-2 italic">
          "Das Dach hat eine Südausrichtung. Bitte prüfen Sie auch die Möglichkeit
          einer PV-Anlage auf dem neuen Dach. Zugang über die Garageneinfahrt."
        </p>
        <p className="text-xs text-gray-500">Angaben vom Eigentümer</p>
      </Card>

      {/* Angebot abgeben */}
      <Card className="p-6 bg-white shadow-sm">
        <h2 className="text-xl font-bold mb-6">Ihr Angebot</h2>

        <div className="space-y-6">
          {/* Angebotssumme */}
          <div>
            <Label htmlFor="amount" className="mb-2 block">
              Angebotssumme (€) *
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="z.B. 28.500"
              className="max-w-xs"
            />
          </div>

          {/* Zeitraum */}
          <div>
            <Label className="mb-2 block">Vorgeschlagener Zeitraum *</Label>
            <div className="flex gap-4 max-w-xl">
              <div className="flex-1">
                <Label htmlFor="from" className="text-sm text-gray-600 mb-1 block">
                  Von:
                </Label>
                <Input id="from" type="date" />
              </div>
              <div className="flex-1">
                <Label htmlFor="to" className="text-sm text-gray-600 mb-1 block">
                  Bis:
                </Label>
                <Input id="to" type="date" />
              </div>
            </div>
          </div>

          {/* Nachricht */}
          <div>
            <Label htmlFor="message" className="mb-2 block">
              Nachricht an den Kunden *
            </Label>
            <Textarea
              id="message"
              placeholder="Beschreiben Sie Ihr Angebot, Vorgehensweise und Besonderheiten..."
              rows={6}
            />
          </div>

          {/* File Upload */}
          <div>
            <Label className="mb-2 block">
              Detailliertes Angebot hochladen (PDF)
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#2563EB] transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700 mb-1">
                Drag & Drop oder klicken zum Auswählen
              </p>
              <p className="text-xs text-gray-500">Max. 10 MB, PDF-Format</p>
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-start gap-2">
            <Checkbox
              id="confirm"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
            />
            <Label htmlFor="confirm" className="cursor-pointer text-sm">
              Ich bestätige, dass dieses Angebot verbindlich ist
            </Label>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Button variant="outline" asChild>
              <Link to="/projektanfragen">Abbrechen</Link>
            </Button>
            <Button
              className="bg-[#2563EB] hover:bg-[#1e40af] px-8"
              disabled={!agreed}
              onClick={() => setIsSubmitted(true)}
            >
              Angebot absenden
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
