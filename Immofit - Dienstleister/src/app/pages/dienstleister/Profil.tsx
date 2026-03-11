import { useState } from "react";
import { Building2, Phone, Mail, Globe, MapPin, Award, Star, Camera, Plus, Trash2 } from "lucide-react";
import { DIENSTLEISTER_PROFIL } from "../../data/mockData";
import { PROPERTY_IMAGES } from "../../data/mockData";

const REVIEWS = [
  { name: "Thomas Vogel", rating: 5, text: "Excellente Arbeit, sehr professionell und pünktlich.", date: "20.01.2026", project: "Fassadendämmung" },
  { name: "Sabine Koch", rating: 4, text: "Sehr gute Arbeit. Kleine Verzögerungen, aber Top-Ergebnis.", date: "10.12.2025", project: "PV-Anlage" },
  { name: "Maria Weber", rating: 5, text: "Absolut empfehlenswert! Sauberste Arbeit.", date: "28.11.2025", project: "Fenstertausch" },
];

export function DienstleisterProfil() {
  const [activeTab, setActiveTab] = useState<"firma" | "kategorien" | "qualifikationen" | "bewertungen" | "einstellungen">("firma");
  const [profil, setProfil] = useState(DIENSTLEISTER_PROFIL);
  const [newCategory, setNewCategory] = useState("");

  return (
    <div className="p-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <div className="flex items-start gap-6">
          {/* Logo */}
          <div className="relative group">
            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center">
              <Building2 className="w-10 h-10 text-blue-500" />
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
              <Camera className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl text-gray-900">{profil.companyName}</h1>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm text-gray-700">{profil.rating}</span>
                <span className="text-sm text-gray-400">({profil.totalReviews} Bewertungen)</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{profil.address}</span>
              <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{profil.phone}</span>
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{profil.email}</span>
              <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" />{profil.website}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-xl text-blue-600" style={{ fontWeight: 700 }}>{profil.completedProjects}</p>
                <p className="text-xs text-gray-400">Projekte</p>
              </div>
              <div className="text-center">
                <p className="text-xl text-blue-600" style={{ fontWeight: 700 }}>{profil.employees}</p>
                <p className="text-xs text-gray-400">Mitarbeiter</p>
              </div>
              <div className="text-center">
                <p className="text-xl text-blue-600" style={{ fontWeight: 700 }}>{profil.founded}</p>
                <p className="text-xs text-gray-400">Gegründet</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
        {[
          { key: "firma", label: "Firmendaten" },
          { key: "kategorien", label: "Kategorien" },
          { key: "qualifikationen", label: "Qualifikationen" },
          { key: "bewertungen", label: "Bewertungen" },
          { key: "einstellungen", label: "Einstellungen" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${activeTab === tab.key ? "bg-white shadow text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Firmendaten */}
      {activeTab === "firma" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg text-gray-900 mb-6">Firmendaten & Logo</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-500 mb-1.5">Firmenname</label>
              <input
                type="text"
                value={profil.companyName}
                onChange={(e) => setProfil({ ...profil, companyName: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1.5">Ansprechpartner</label>
              <input
                type="text"
                value={profil.contactName}
                onChange={(e) => setProfil({ ...profil, contactName: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1.5">E-Mail</label>
              <input type="email" value={profil.email} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1.5">Telefon</label>
              <input type="tel" value={profil.phone} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-gray-500 mb-1.5">Adresse</label>
              <input type="text" value={profil.address} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1.5">Website</label>
              <input type="url" value={profil.website} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1.5">Mitarbeiteranzahl</label>
              <input type="number" value={profil.employees} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-gray-500 mb-1.5">Firmenbeschreibung</label>
              <textarea
                rows={4}
                value={profil.description}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-colors text-sm">
              Änderungen speichern
            </button>
          </div>
        </div>
      )}

      {/* Kategorien */}
      {activeTab === "kategorien" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg text-gray-900 mb-6">Kategorien & Gewerke</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {profil.categories.map((cat) => (
              <div key={cat} className="flex items-center gap-2 bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-xl text-sm">
                {cat}
                <button
                  onClick={() => setProfil({ ...profil, categories: profil.categories.filter((c) => c !== cat) })}
                  className="text-blue-400 hover:text-blue-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Neues Gewerk hinzufügen..."
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={() => { if (newCategory) { setProfil({ ...profil, categories: [...profil.categories, newCategory] }); setNewCategory(""); } }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 text-sm"
            >
              <Plus className="w-4 h-4" />
              Hinzufügen
            </button>
          </div>
          <div className="mt-8">
            <h3 className="text-gray-700 mb-4">Referenzprojekte</h3>
            <div className="grid grid-cols-3 gap-4">
              {[PROPERTY_IMAGES.berlin, PROPERTY_IMAGES.munich, PROPERTY_IMAGES.hamburg].map((img, i) => (
                <div key={i} className="relative group rounded-xl overflow-hidden border border-gray-100 h-32">
                  <img src={img} alt="Referenz" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="text-white text-xs bg-red-500 px-2 py-1 rounded-lg">Entfernen</button>
                  </div>
                </div>
              ))}
              <button className="h-32 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-colors">
                <Plus className="w-6 h-6" />
                <span className="text-xs">Referenz hinzufügen</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Qualifikationen */}
      {activeTab === "qualifikationen" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg text-gray-900 mb-6">Qualifikationen & Zertifikate</h2>
          <div className="space-y-3 mb-6">
            {profil.certifications.map((cert, i) => (
              <div key={i} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl">
                <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{cert}</p>
                  <p className="text-xs text-gray-400">Aktiv · Zertifikat verfügbar</p>
                </div>
                <button className="text-xs text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50">
                  Anzeigen
                </button>
              </div>
            ))}
          </div>
          <button className="flex items-center gap-2 text-sm text-blue-600 border border-dashed border-blue-300 px-4 py-2.5 rounded-xl hover:bg-blue-50 w-full justify-center">
            <Plus className="w-4 h-4" />
            Zertifikat hinzufügen
          </button>
        </div>
      )}

      {/* Bewertungen */}
      {activeTab === "bewertungen" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-6 mb-8 pb-6 border-b border-gray-100">
            <div className="text-center">
              <p className="text-5xl text-blue-600 mb-2" style={{ fontWeight: 700 }}>{profil.rating}</p>
              <div className="flex gap-0.5 justify-center mb-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={`w-5 h-5 ${s <= Math.round(profil.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`} />
                ))}
              </div>
              <p className="text-sm text-gray-500">{profil.totalReviews} Bewertungen</p>
            </div>
            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-6">{stars}★</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 7 : stars === 2 ? 2 : 1}%` }} />
                  </div>
                  <span className="text-xs text-gray-400 w-8">{stars === 5 ? 87 : stars === 4 ? 25 : stars === 3 ? 9 : stars === 2 ? 2 : 1}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {REVIEWS.map((review, i) => (
              <div key={i} className="p-4 border border-gray-100 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm text-gray-900">{review.name}</p>
                    <p className="text-xs text-gray-400">{review.project} · {review.date}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`w-4 h-4 ${s <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Einstellungen */}
      {activeTab === "einstellungen" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg text-gray-900 mb-6">Einstellungen</h2>
          <div className="space-y-6">
            {[
              { label: "E-Mail Benachrichtigungen", desc: "Neue Projektanfragen per E-Mail erhalten", enabled: true },
              { label: "Neue Anfragen anzeigen", desc: "Im Dashboard Neuanfragen sichtbar machen", enabled: true },
              { label: "Profil öffentlich sichtbar", desc: "Im Netzwerk für Endanbieter sichtbar", enabled: true },
              { label: "SMS-Benachrichtigungen", desc: "Dringende Anfragen per SMS erhalten", enabled: false },
            ].map((setting, i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-gray-50">
                <div>
                  <p className="text-sm text-gray-900">{setting.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{setting.desc}</p>
                </div>
                <button className={`relative w-11 h-6 rounded-full transition-colors ${setting.enabled ? "bg-blue-600" : "bg-gray-200"}`}>
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${setting.enabled ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h3 className="text-gray-700 mb-4">Passwort ändern</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-xs text-gray-500 block mb-1">Aktuelles Passwort</label>
                <input type="password" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Neues Passwort</label>
                <input type="password" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Bestätigen</label>
                <input type="password" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
              </div>
            </div>
            <button className="mt-4 bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 text-sm">
              Passwort aktualisieren
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
