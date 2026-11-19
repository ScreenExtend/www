// Empty on the real site. A preview host serving the site under a sub-path sets
// <html data-base="/v/x">, and routes and home links follow it.
export const BASE = (typeof document !== "undefined" && document.documentElement.dataset.base) || "";
