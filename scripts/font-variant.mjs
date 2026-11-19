// node scripts/font-variant.mjs F3  -> writes src/font-variant.ts for that pairing
// node scripts/font-variant.mjs      -> back to Archivo + IBM Plex Mono
import fs from "node:fs";
const key = process.argv[2];
const all = JSON.parse(fs.readFileSync(new URL("./fonts.json", import.meta.url)));
if (!key) { fs.writeFileSync("src/font-variant.ts", "// Replaced by scripts/font-variant.mjs for each font build; empty keeps Archivo.\nexport {};\n"); process.exit(0); }
const v = all[key]; if (!v) throw new Error("unknown font set " + key);
const css = `:root{--se-font-display:${v.display},system-ui,sans-serif;--se-font-body:${v.body},system-ui,sans-serif;--se-font-mono:${v.mono},ui-monospace,monospace}`;
fs.writeFileSync("src/font-variant.css", css + "\n");
fs.writeFileSync("src/font-variant.ts", `// ${key}: ${v.label}\n` + v.imports.map((i) => `import "${i}";`).join("\n") + `\nimport "./font-variant.css";\n`);
console.log(key, v.label);
