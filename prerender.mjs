import { readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const { render } = await import(
  pathToFileURL(resolve("dist-server/entry-server.js")).href
);

const template = readFileSync("dist/index.html", "utf-8");
const appHtml = render("/");

if (!template.includes('<div id="root"></div>')) {
  throw new Error("prerender: could not find empty root placeholder in index.html");
}

let out = template.replace(
  '<div id="root"></div>',
  `<div id="root">${appHtml}</div>`,
);

const cssLink = out.match(/<link[^>]+rel="stylesheet"[^>]+href="(\/assets\/[^"]+\.css)"[^>]*>/);
if (cssLink) {
  const css = readFileSync(`dist${cssLink[1]}`, "utf-8");
  out = out.replace(cssLink[0], `<style>${css}</style>`);
}

writeFileSync("dist/index.html", out);

console.log(
  `prerender: injected ${appHtml.length} bytes of homepage HTML + inlined CSS`,
);
