import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Projektanfragen } from "./pages/Projektanfragen";
import { ProjektanfrageDetail } from "./pages/ProjektanfrageDetail";
import { MeineProjekte } from "./pages/MeineProjekte";
import { ProjektDetail } from "./pages/ProjektDetail";
import { Profil } from "./pages/Profil";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "projektanfragen", Component: Projektanfragen },
      { path: "projektanfragen/:id", Component: ProjektanfrageDetail },
      { path: "meine-projekte", Component: MeineProjekte },
      { path: "projekte/:id", Component: ProjektDetail },
      { path: "profil", Component: Profil },
    ],
  },
]);
