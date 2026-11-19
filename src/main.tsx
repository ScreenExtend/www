import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { BASE } from "@/lib/base.ts";

import "./index.css";
import "./font-variant.ts";

const root = document.getElementById("root")!;
const tree = (
  <BrowserRouter basename={BASE || undefined}>
    <App />
  </BrowserRouter>
);

// Only "/" is prerendered. Other routes (legal pages, via the SPA fallback) receive
// the homepage markup, so hydrating it would mismatch; render those from scratch.
if (root.hasChildNodes() && window.location.pathname.slice(BASE.length) === "/") {
  hydrateRoot(root, tree);
} else {
  root.textContent = "";
  createRoot(root).render(tree);
}
