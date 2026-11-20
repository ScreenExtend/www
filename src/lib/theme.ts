export const THEME_KEY = "se-theme";

export function applyThemeAttr(id: string) {
  const root = document.documentElement;
  // no colour transitions during the swap; released after the next paint
  root.classList.add("theme-swap");
  // keep the page background (overscroll area) in step with the theme
  if (id === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", id);
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("theme-swap")));
}
