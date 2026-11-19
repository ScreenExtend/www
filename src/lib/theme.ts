export const THEME_KEY = "se-theme";

export function applyThemeAttr(id: string) {
  // keep the page background (overscroll area) in step with the theme
  if (id === "system") document.documentElement.removeAttribute("data-theme");
  else document.documentElement.setAttribute("data-theme", id);
}
