const fs = require("fs");
const path = require("path");

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]
  );
}

const files = walk("src").filter(
  (f) => /\.(tsx?|jsx?)$/.test(f) && !f.includes("admin") && !f.includes("legal")
);

const re = /(?<![A-Za-z0-9_])t\(\"((?:[^\"\\]|\\.)*)\"\)/g;
const keys = new Set();
for (const f of files) {
  const c = fs.readFileSync(f, "utf8");
  let m;
  while ((m = re.exec(c))) keys.add(m[1]);
}

// Load the dictionary source and evaluate just the object literal.
const dictSrc = fs.readFileSync("src/lib/i18n/dictionaries.ts", "utf8");
const start = dictSrc.indexOf("export const fr");
const brace = dictSrc.indexOf("{", start);
const objSrc = dictSrc.slice(brace, dictSrc.lastIndexOf("};") + 1);
// eslint-disable-next-line no-eval
const dict = eval("(" + objSrc + ")");

const missing = [...keys].filter((k) => !(k in dict));
console.log("Total t() literal keys:", keys.size);
console.log("Missing from dictionary:", missing.length);
if (missing.length) console.log(JSON.stringify(missing, null, 2));