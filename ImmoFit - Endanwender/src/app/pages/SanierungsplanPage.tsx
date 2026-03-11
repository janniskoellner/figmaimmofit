import { Calendar, TrendingUp, Euro, CheckCircle } from "lucide-react";

const isfpTimeline = [
  {
    year: 2026,
    title: "Heizungserneuerung",
    description: "Austausch der alten Gasheizung gegen Wärmepumpe",
    cost: 25000,
    savings: 2500,
    status: "geplant",
    property: "Musterstraße 123, Berlin",
  },
  {
    year: 2026,
    title: "Kellerabdichtung",
    description: "Außenabdichtung des Kellers und Drainage",
    cost: 12000,
    savings: 400,
    status: "geplant",
    property: "Beispielweg 45, München",
  },
  {
    year: 2027,
    title: "Fassadendämmung",
    description: "Dämmung der Außenwände mit WDVS",
    cost: 35000,
    savings: 1800,
    status: "geplant",
    property: "Musterstraße 123, Berlin",
  },
  {
    year: 2027,
    title: "Dachsanierung",
    description: "Erneuerung der Dacheindeckung und Dämmung",
    cost: 22000,
    savings: 1500,
    status: "geplant",
    property: "Industrieallee 78, Hamburg",
  },
  {
    year: 2028,
    title: "Fenstertausch",
    description: "Austausch aller Fenster gegen Dreifachverglasung",
    cost: 18000,
    savings: 1200,
    status: "geplant",
    property: "Musterstraße 123, Berlin",
  },
  {
    year: 2028,
    title: "Lüftungsanlage",
    description: "Installation kontrollierte Wohnraumlüftung mit WRG",
    cost: 15000,
    savings: 800,
    status: "geplant",
    property: "Villenstraße 12, Frankfurt",
  },
  {
    year: 2029,
    title: "Dachdämmung",
    description: "Aufdachdämmung mit Photovoltaikanlage",
    cost: 28000,
    savings: 2000,
    status: "geplant",
    property: "Musterstraße 123, Berlin",
  },
  {
    year: 2029,
    title: "Solarthermie",
    description: "Installation Solarthermieanlage für Warmwasser",
    cost: 9000,
    savings: 600,
    status: "geplant",
    property: "Beispielweg 45, München",
  },
];

const statusColors: Record<string, string> = {
  geplant: "bg-yellow-100 text-yellow-700",
  "in Bearbeitung": "bg-blue-100 text-blue-700",
  abgeschlossen: "bg-green-100 text-green-700",
};

export function SanierungsplanPage() {
  const years = Array.from(new Set(isfpTimeline.map((item) => item.year))).sort();
  
  const totalCost = isfpTimeline.reduce((sum, item) => sum + item.cost, 0);
  const totalSavings = isfpTimeline.reduce((sum, item) => sum + item.savings, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Sanierungsplan (ISFP)</h1>
        <p className="text-gray-600 mt-2">Individueller Sanierungsfahrplan für alle Immobilien</p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{isfpTimeline.length}</div>
          <div className="text-gray-600">Geplante Maßnahmen</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Euro className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">€{totalCost.toLocaleString()}</div>
          <div className="text-gray-600">Gesamt-Investition</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">€{totalSavings.toLocaleString()}</div>
          <div className="text-gray-600">Jährliche Einsparung</div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-8">Zeitlicher Ablauf</h2>
        
        {years.map((year, yearIndex) => (
          <div key={year} className="mb-12 last:mb-0">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full font-bold text-xl">
                {year}
              </div>
              <div className="flex-1 h-0.5 bg-gray-200" />
            </div>

            <div className="space-y-4 ml-20">
              {isfpTimeline
                .filter((item) => item.year === year)
                .map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-bold text-gray-900">{item.title}</h4>
                          <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusColors[item.status]}`}>
                            {item.status}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{item.description}</p>
                        <p className="text-sm text-gray-500">{item.property}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-200">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Investition</div>
                        <div className="text-2xl font-bold text-gray-900">€{item.cost.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Einsparung pro Jahr</div>
                        <div className="text-2xl font-bold text-green-600">€{item.savings.toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-600 mb-2">
                        Amortisationszeit: <span className="font-semibold text-gray-900">{Math.round(item.cost / item.savings)} Jahre</span>
                      </div>
                      <button className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Details & Förderung prüfen
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* ROI Summary */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 p-8">
        <div className="flex items-start gap-6">
          <div className="p-4 bg-green-200 rounded-full">
            <CheckCircle className="w-8 h-8 text-green-700" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Rentabilität</h3>
            <p className="text-gray-700 mb-4">
              Mit einer Gesamt-Investition von <span className="font-bold">€{totalCost.toLocaleString()}</span> und 
              jährlichen Einsparungen von <span className="font-bold">€{totalSavings.toLocaleString()}</span> amortisiert 
              sich der Sanierungsplan in etwa <span className="font-bold">{Math.round(totalCost / totalSavings)} Jahren</span>.
            </p>
            <p className="text-sm text-gray-600">
              Zusätzlich steigert die energetische Sanierung den Immobilienwert und erhöht die Wohnqualität.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
