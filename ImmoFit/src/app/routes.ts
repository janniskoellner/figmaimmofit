import { createBrowserRouter } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { Properties } from "./pages/Properties";
import { PropertyDetail } from "./pages/PropertyDetail";
import { Documents } from "./pages/Documents";
import { Network } from "./pages/Network";
import { SanierungsplanPage } from "./pages/SanierungsplanPage";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "properties", Component: Properties },
      { path: "properties/:id", Component: PropertyDetail },
      { path: "documents", Component: Documents },
      { path: "sanierungsplan", Component: SanierungsplanPage },
      { path: "network", Component: Network },
    ],
  },
]);
