import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/layout/Layout";
import { Landing } from "./pages/Landing";
import { NotFound } from "./pages/NotFound";

// Endanbieter pages
import { EndanbieterDashboard } from "./pages/endanbieter/Dashboard";
import { MeineImmobilien } from "./pages/endanbieter/MeineImmobilien";
import { ImmobilienDetail } from "./pages/endanbieter/ImmobilienDetail";
import { Dokumente } from "./pages/endanbieter/Dokumente";
import { Sanierungsplan } from "./pages/endanbieter/Sanierungsplan";
import { Netzwerk } from "./pages/endanbieter/Netzwerk";
import { EndanbieterProfil } from "./pages/endanbieter/Profil";

// Dienstleister pages
import { DienstleisterDashboard } from "./pages/dienstleister/Dashboard";
import { Projektanfragen } from "./pages/dienstleister/Projektanfragen";
import { MeineProjekte } from "./pages/dienstleister/MeineProjekte";
import { DienstleisterProfil } from "./pages/dienstleister/Profil";
import { Benachrichtigungen } from "./pages/dienstleister/Benachrichtigungen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/endanbieter",
    element: <Layout role="endanbieter" />,
    children: [
      { index: true, element: <Navigate to="/endanbieter/dashboard" replace /> },
      { path: "dashboard", element: <EndanbieterDashboard /> },
      { path: "immobilien", element: <MeineImmobilien /> },
      { path: "immobilien/:id", element: <ImmobilienDetail /> },
      { path: "dokumente", element: <Dokumente /> },
      { path: "sanierungsplan", element: <Sanierungsplan /> },
      { path: "netzwerk", element: <Netzwerk /> },
      { path: "benachrichtigungen", element: <div className="p-8"><h1>Benachrichtigungen</h1></div> },
      { path: "profil", element: <EndanbieterProfil /> },
    ],
  },
  {
    path: "/dienstleister",
    element: <Layout role="dienstleister" />,
    children: [
      { index: true, element: <Navigate to="/dienstleister/dashboard" replace /> },
      { path: "dashboard", element: <DienstleisterDashboard /> },
      { path: "anfragen", element: <Projektanfragen /> },
      { path: "projekte", element: <MeineProjekte /> },
      { path: "profil", element: <DienstleisterProfil /> },
      { path: "benachrichtigungen", element: <Benachrichtigungen /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);