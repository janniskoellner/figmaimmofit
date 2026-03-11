import { useNavigate } from "react-router";
import { Building2, Wrench, ArrowRight, Zap, Shield, TrendingUp } from "lucide-react";

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl text-blue-600" style={{ fontWeight: 700 }}>Immofit</span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/endanbieter/dashboard")}
            className="text-sm text-gray-600 border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Anmelden
          </button>
          <button
            onClick={() => navigate("/endanbieter/dashboard")}
            className="text-sm bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Registrieren
          </button>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 text-center py-20">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm mb-8">
          <Zap className="w-4 h-4" />
          Energetische Sanierung leicht gemacht
        </div>
        <h1 className="text-5xl text-gray-900 max-w-3xl mb-6 leading-tight" style={{ fontWeight: 700 }}>
          Die Plattform für{" "}
          <span className="text-blue-600">energetische Gebäudesanierung</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mb-14 leading-relaxed">
          Immofit verbindet Immobilieneigentümer mit qualifizierten Dienstleistern. KI-gestützte Analyse, ISFP-Timeline und Förderberatung aus einer Hand.
        </p>

        {/* Portal Cards */}
        <div className="grid grid-cols-2 gap-6 max-w-2xl w-full mb-16">
          {/* Endanbieter */}
          <div
            className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8 cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 group text-left"
            onClick={() => navigate("/endanbieter/dashboard")}
          >
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
              <Building2 className="w-7 h-7 text-blue-600" />
            </div>
            <h2 className="text-xl text-gray-900 mb-3">Eigentümer Portal</h2>
            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
              Verwalten Sie Ihre Immobilien, erhalten Sie KI-Analysen und erstellen Sie Ihren persönlichen Sanierungsfahrplan.
            </p>
            <div className="flex items-center gap-1 text-blue-600 text-sm">
              Zum Eigentümer-Portal
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Dienstleister */}
          <div
            className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8 cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 group text-left"
            onClick={() => navigate("/dienstleister/dashboard")}
          >
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-green-100 transition-colors">
              <Wrench className="w-7 h-7 text-green-600" />
            </div>
            <h2 className="text-xl text-gray-900 mb-3">Dienstleister Portal</h2>
            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
              Finden Sie passende Projektanfragen, verwalten Sie Ihre Projekte und bauen Sie Ihr Netzwerk aus.
            </p>
            <div className="flex items-center gap-1 text-green-600 text-sm">
              Zum Dienstleister-Portal
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-6 max-w-3xl w-full">
          {[
            { icon: <Zap className="w-5 h-5 text-blue-500" />, title: "KI-Analyse", text: "Automatische Auswertung Ihrer Gebäudedokumente mit modernster KI" },
            { icon: <TrendingUp className="w-5 h-5 text-green-500" />, title: "ISFP Timeline", text: "Individueller Sanierungsfahrplan mit Kosten, Einsparungen & Förderung" },
            { icon: <Shield className="w-5 h-5 text-purple-500" />, title: "Geprüfte Partner", text: "Alle Dienstleister sind zertifiziert und geprüft" },
          ].map((feature, i) => (
            <div key={i} className="bg-white/80 rounded-2xl border border-gray-100 p-5 text-left">
              <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center mb-3">
                {feature.icon}
              </div>
              <h4 className="text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.text}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6 text-center">
        <p className="text-sm text-gray-400">© 2026 Immofit GmbH · Datenschutz · Impressum</p>
      </footer>
    </div>
  );
}
