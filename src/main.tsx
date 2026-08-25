import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";

import "./index.css";

const root = document.getElementById("root")!;
const tree = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

if (root.hasChildNodes()) {
  hydrateRoot(root, tree);
} else {
  createRoot(root).render(tree);
}
