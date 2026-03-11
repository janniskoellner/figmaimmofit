import { User, Mail, Phone, MapPin, Bell, Shield } from "lucide-react";
import { useState } from "react";

export function EndanbieterProfil() {
  const [activeTab, setActiveTab] = useState("profil");

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl text-gray-900">Mein Profil</h1>
        <p className="text-sm text-gray-500 mt-1">Persönliche Daten und Einstellungen</p>
      </div>

      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit mb-6">
        {[{ key: "profil", label: "Profil" }, { key: "einstellungen", label: "Einstellungen" }, { key: "sicherheit", label: "Sicherheit" }].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${activeTab === tab.key ? "bg-white shadow text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "profil" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
              <User className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h2 className="text-lg text-gray-900">Max Mustermann</h2>
              <p className="text-sm text-gray-400">Eigentümer · Mitglied seit 2024</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-xs text-gray-400 block mb-1.5">Vorname</label>
              <input defaultValue="Max" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1.5">Nachname</label>
              <input defaultValue="Mustermann" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1.5">E-Mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input defaultValue="max@mustermann.de" className="w-full pl-9 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1.5">Telefon</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input defaultValue="+49 30 12345678" className="w-full pl-9 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
              </div>
            </div>
            <div className="col-span-2">
              <label className="text-xs text-gray-400 block mb-1.5">Adresse</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input defaultValue="Musterstraße 1, 10115 Berlin" className="w-full pl-9 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 text-sm">Speichern</button>
          </div>
        </div>
      )}

      {activeTab === "einstellungen" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-2xl">
          <h2 className="text-lg text-gray-900 mb-6 flex items-center gap-2"><Bell className="w-5 h-5" /> Benachrichtigungseinstellungen</h2>
          <div className="space-y-4">
            {[
              { label: "E-Mail bei neuen Angeboten", enabled: true },
              { label: "Push-Benachrichtigungen", enabled: false },
              { label: "Wöchentlicher Bericht", enabled: true },
              { label: "Projektstatusänderungen", enabled: true },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50">
                <p className="text-sm text-gray-700">{s.label}</p>
                <button className={`relative w-10 h-5 rounded-full transition-colors ${s.enabled ? "bg-blue-600" : "bg-gray-200"}`}>
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${s.enabled ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "sicherheit" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-2xl">
          <h2 className="text-lg text-gray-900 mb-6 flex items-center gap-2"><Shield className="w-5 h-5" /> Sicherheit</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 block mb-1.5">Aktuelles Passwort</label>
              <input type="password" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1.5">Neues Passwort</label>
              <input type="password" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1.5">Passwort bestätigen</label>
              <input type="password" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 text-sm mt-2">Passwort ändern</button>
          </div>
        </div>
      )}
    </div>
  );
}
