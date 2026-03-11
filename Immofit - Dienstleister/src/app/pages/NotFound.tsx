import { useNavigate } from "react-router";
import { Home, ArrowLeft } from "lucide-react";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl text-gray-300" style={{ fontWeight: 900 }}>404</h1>
          <h2 className="text-2xl text-gray-800 mt-4" style={{ fontWeight: 700 }}>Seite nicht gefunden</h2>
          <p className="text-gray-500 mt-2">Die von Ihnen gesuchte Seite existiert nicht.</p>
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            Zur Startseite
          </button>
        </div>
      </div>
    </div>
  );
}
