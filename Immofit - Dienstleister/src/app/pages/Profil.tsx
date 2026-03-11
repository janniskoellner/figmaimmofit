import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Checkbox } from "../components/ui/checkbox";
import { Switch } from "../components/ui/switch";
import { Camera, Star, Upload, FileText, Check, Clock } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const categories = [
  { id: "energieberatung", label: "Energieberatung", checked: true },
  { id: "dachdaemmung", label: "Dachdämmung", checked: true },
  { id: "fassadendaemmung", label: "Fassadendämmung", checked: true },
  { id: "kellerdaemmung", label: "Kellerdeckendämmung", checked: false },
  { id: "waermepumpe", label: "Heizungsbau (Wärmepumpe)", checked: false },
  { id: "gas-pellets", label: "Heizungsbau (Gas/Pellets)", checked: false },
  { id: "solar", label: "Solar/PV-Installation", checked: false },
  { id: "fenster", label: "Fenster & Türen", checked: true },
  { id: "elektro", label: "Elektroinstallation", checked: false },
];

const certificates = [
  {
    id: 1,
    name: "BAFA-Zulassung Energieberatung",
    status: "verified",
    date: "15.02.2026",
    file: "BAFA_Zulassung_2026.pdf",
  },
  {
    id: 2,
    name: "Handwerkskammer München - Meisterbrief",
    status: "verified",
    date: "10.01.2026",
    file: "Meisterbrief_Huber.pdf",
  },
  {
    id: 3,
    name: "Fachbetrieb nach WHG",
    status: "pending",
    date: "05.03.2026",
    file: "WHG_Nachweis.pdf",
  },
];

const reviews = [
  {
    id: 1,
    customer: "Fam. Schmidt",
    rating: 5,
    text: "Hervorragende Arbeit bei unserer Dachsanierung. Pünktlich, sauber und professionell. Absolut empfehlenswert!",
    project: "Dachsanierung",
    date: "März 2026",
    reply:
      "Vielen Dank für die tolle Bewertung! Es war uns eine Freude.",
  },
  {
    id: 2,
    customer: "Herr Weber",
    rating: 4,
    text: "Gute Beratung und fachgerechte Ausführung. Zeitplan wurde leider um eine Woche überzogen.",
    project: "Fassadendämmung",
    date: "Januar 2026",
    reply: null,
  },
  {
    id: 3,
    customer: "Fam. Bauer",
    rating: 5,
    text: "Top Service! Von der Beratung bis zur Abnahme alles aus einem Guss.",
    project: "Fensteraustausch",
    date: "Dezember 2025",
    reply: null,
  },
];

export function Profil() {
  const [isEditing, setIsEditing] = useState(false);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-[#FBBF24] text-[#FBBF24]"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Firmenprofil</h1>

      {/* Profile Header */}
      <Card className="p-6 bg-white shadow-sm">
        <div className="flex gap-6 items-start">
          {/* Logo */}
          <div className="relative group">
            <div className="w-32 h-32 rounded-lg bg-gray-100 overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1738817628102-0b420c17dac3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjb25zdHJ1Y3Rpb24lMjBjb21wYW55JTIwbG9nb3xlbnwxfHx8fDE3NzMyNjU5OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Company Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center cursor-pointer">
              <div className="text-white text-center">
                <Camera className="w-6 h-6 mx-auto mb-1" />
                <p className="text-xs">Logo ändern</p>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">Meisterbetrieb Huber GmbH</h2>
            <p className="text-gray-600 mb-2">
              Energieberatung · Dachdeckerei · Dämmung
            </p>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-1">
                {renderStars(4.8)}
                <span className="ml-2 font-semibold">4.8</span>
                <span className="text-gray-600">(24 Bewertungen)</span>
              </div>
              <Badge className="bg-[#10B981] text-white hover:bg-[#10B981]">
                <Check className="w-3 h-3 mr-1" />
                Verifiziert
              </Badge>
            </div>
          </div>

          {/* Action Button */}
          <div>
            {isEditing ? (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Abbrechen
                </Button>
                <Button
                  className="bg-[#2563EB] hover:bg-[#1e40af]"
                  onClick={() => setIsEditing(false)}
                >
                  Speichern
                </Button>
              </div>
            ) : (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Profil bearbeiten
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Firmendaten */}
      <Card className="p-6 bg-white shadow-sm">
        <h2 className="text-lg font-bold mb-6">Firmendaten</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label htmlFor="company-name">Firmenname</Label>
            <Input
              id="company-name"
              defaultValue="Meisterbetrieb Huber GmbH"
              disabled={!isEditing}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="owner">Inhaber</Label>
            <Input
              id="owner"
              defaultValue="Max Huber"
              disabled={!isEditing}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="street">Straße</Label>
            <Input
              id="street"
              defaultValue="Handwerkerstraße 15"
              disabled={!isEditing}
              className="mt-2"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="zip">PLZ</Label>
              <Input
                id="zip"
                defaultValue="80331"
                disabled={!isEditing}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="city">Ort</Label>
              <Input
                id="city"
                defaultValue="München"
                disabled={!isEditing}
                className="mt-2"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="phone">Telefon</Label>
            <Input
              id="phone"
              defaultValue="089 12345678"
              disabled={!isEditing}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="email">E-Mail</Label>
            <Input
              id="email"
              defaultValue="info@huber-dach.de"
              disabled={!isEditing}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              defaultValue="www.huber-dach.de"
              disabled={!isEditing}
              className="mt-2"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="founded">Gründungsjahr</Label>
              <Input
                id="founded"
                defaultValue="2005"
                disabled={!isEditing}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="employees">Mitarbeiter</Label>
              <Input
                id="employees"
                defaultValue="8"
                disabled={!isEditing}
                className="mt-2"
              />
            </div>
          </div>
          <div className="col-span-2">
            <Label htmlFor="about">Über uns</Label>
            <Textarea
              id="about"
              defaultValue="Seit über 20 Jahren sind wir Ihr zuverlässiger Partner für Dacharbeiten und energetische Sanierung in München und Umgebung..."
              disabled={!isEditing}
              className="mt-2"
              rows={4}
            />
          </div>
        </div>
      </Card>

      {/* Kategorien & Gewerke */}
      <Card className="p-6 bg-white shadow-sm">
        <h2 className="text-lg font-bold mb-6">Kategorien & Gewerke</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center gap-2">
              <Checkbox
                id={category.id}
                defaultChecked={category.checked}
                disabled={!isEditing}
              />
              <Label htmlFor={category.id} className="cursor-pointer">
                {category.label}
              </Label>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t border-gray-200">
          <Label htmlFor="radius">Einzugsgebiet</Label>
          <Input
            id="radius"
            defaultValue="Umkreis: 50 km"
            disabled={!isEditing}
            className="mt-2 max-w-xs"
          />
        </div>
      </Card>

      {/* Qualifikationen & Zertifikate */}
      <Card className="p-6 bg-white shadow-sm">
        <h2 className="text-lg font-bold mb-6">Qualifikationen & Zertifikate</h2>
        <div className="space-y-4 mb-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <div className="font-semibold mb-1">{cert.name}</div>
                <div className="text-sm text-gray-600">
                  Hochgeladen: {cert.date}
                </div>
              </div>
              <Badge
                className={
                  cert.status === "verified"
                    ? "bg-[#10B981] text-white hover:bg-[#10B981]"
                    : "bg-[#F59E0B] text-white hover:bg-[#F59E0B]"
                }
              >
                {cert.status === "verified" ? (
                  <>
                    <Check className="w-3 h-3 mr-1" />
                    Verifiziert
                  </>
                ) : (
                  <>
                    <Clock className="w-3 h-3 mr-1" />
                    In Prüfung
                  </>
                )}
              </Badge>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FileText className="w-4 h-4" />
                {cert.file}
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="border-dashed w-full">
          <Upload className="w-4 h-4 mr-2" />
          Zertifikat hinzufügen
        </Button>
      </Card>

      {/* Bewertungen & Referenzen */}
      <Card className="p-6 bg-white shadow-sm">
        <h2 className="text-lg font-bold mb-6">Bewertungen</h2>

        {/* Rating Summary */}
        <div className="flex gap-12 mb-8 pb-6 border-b border-gray-200">
          {/* Big Rating */}
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">4.8</div>
            <div className="flex gap-1 mb-1">
              {renderStars(5)}
            </div>
            <div className="text-sm text-gray-600">(24 Bewertungen)</div>
          </div>

          {/* Distribution */}
          <div className="flex-1 space-y-2">
            {[
              { stars: 5, count: 18 },
              { stars: 4, count: 4 },
              { stars: 3, count: 1 },
              { stars: 2, count: 0 },
              { stars: 1, count: 1 },
            ].map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <span className="text-sm w-12">{item.stars} Sterne</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FBBF24]"
                    style={{ width: `${(item.count / 24) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="pb-6 border-b border-gray-200 last:border-0">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-semibold">{review.customer}</div>
                  {renderStars(review.rating)}
                </div>
                <div className="text-sm text-gray-600">
                  {review.project} · {review.date}
                </div>
              </div>
              <p className="text-gray-700 mb-3">{review.text}</p>
              {review.reply ? (
                <div className="ml-6 p-3 bg-blue-50 rounded-lg border-l-4 border-[#2563EB]">
                  <div className="text-sm font-semibold text-[#2563EB] mb-1">
                    Ihre Antwort:
                  </div>
                  <p className="text-sm text-gray-700">{review.reply}</p>
                </div>
              ) : (
                <Button variant="outline" size="sm">
                  Antworten
                </Button>
              )}
            </div>
          ))}
          <Button variant="link" className="text-[#2563EB]">
            Alle Bewertungen ansehen
          </Button>
        </div>
      </Card>

      {/* Einstellungen */}
      <Card className="p-6 bg-white shadow-sm">
        <h2 className="text-lg font-bold mb-6">Einstellungen</h2>

        <div className="space-y-6">
          {/* Notifications */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-requests">E-Mail bei neuen Projektanfragen</Label>
              <Switch id="email-requests" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-updates">E-Mail bei Projekt-Updates</Label>
              <Switch id="email-updates" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push">Push-Benachrichtigungen</Label>
              <Switch id="push" />
            </div>
          </div>

          {/* Availability */}
          <div className="pt-6 border-t border-gray-200 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="accepting">Aktuell Aufträge annehmend</Label>
              <Switch id="accepting" defaultChecked />
            </div>
            <div>
              <Label htmlFor="busy-until">Ausgelastet bis:</Label>
              <Input id="busy-until" type="date" className="mt-2 max-w-xs" />
            </div>
          </div>

          {/* Danger Zone */}
          <div className="pt-6 border-t-2 border-red-100 space-y-4">
            <h3 className="font-semibold text-gray-900">Sicherheit</h3>
            <div className="flex gap-4">
              <Button variant="outline">Passwort ändern</Button>
              <Button variant="ghost" className="text-red-600 hover:text-red-700">
                Konto löschen
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
