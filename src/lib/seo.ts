const ORIGIN = "https://screenextend.app";

export const HOME_TITLE =
  "ScreenExtend: Turn Any Device Into a Wireless Second Monitor";
export const HOME_DESCRIPTION =
  "Turn any phone, tablet, or spare laptop into a wireless second monitor for your PC or Mac. ScreenExtend streams your screen over WebRTC; free, with no client install.";

export interface PageMeta {
  title: string;
  description: string;
  path: string;
  robots?: string;
}

function metaByName(name: string): HTMLMetaElement {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  return el;
}

function metaByProperty(property: string): HTMLMetaElement {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[property="${property}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  return el;
}

function canonicalLink(): HTMLLinkElement {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  return el;
}

export function applyMeta({ title, description, path, robots }: PageMeta) {
  const url = `${ORIGIN}${path}`;
  document.title = title;
  metaByName("description").content = description;
  metaByName("robots").content =
    robots ??
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  canonicalLink().href = url;
  metaByProperty("og:title").content = title;
  metaByProperty("og:description").content = description;
  metaByProperty("og:url").content = url;
  metaByName("twitter:title").content = title;
  metaByName("twitter:description").content = description;
}

export function applyHomeMeta() {
  applyMeta({
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    path: "/",
  });
}
