import { createRoot } from "react-dom/client";
import "@/index.css";
import AppDemo from "@/components/home/app-demo/AppDemo.tsx";

const theme = new URLSearchParams(location.search).get("theme") ?? "dark";
document.documentElement.dataset.theme = theme;
createRoot(document.getElementById("root")!).render(
  <div style={{ padding: "24px 16px" }}>
    <AppDemo className="mx-auto max-w-[1000px]" />
  </div>,
);
