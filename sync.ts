import { mkdirSync, readdirSync, readFileSync, rmdirSync, rmSync, statSync, writeFileSync } from "fs";
import { basename, dirname, join } from "path";
import { cwd, exit } from "process";
import Package from "./package.json";

const CHANGED_REMIX_IMPORTS = {
  "netlify": "@remix-run/node",
  "architect": "@remix-run/node",
  "fly": "@remix-run/node",
  "pages": "@remix-run/cloudflare",
  "vercel": "@remix-run/node",
  "workers": "@remix-run/cloudflare"
}

function readdirRecursivelySync(dir: string, oldArray: string[] = []) {
  const files = readdirSync(dir);

  files.forEach(file => {
    if (statSync(join(dir, file)).isDirectory()) {
      readdirRecursivelySync(join(dir, file), oldArray);
    }
    else {
      oldArray.push(join(dir, file));
    }
  })

  return oldArray
}

const { workspaces: { packages } } = Package;

if (packages.length < 2) {
  exit(0);
}

const source = packages[0];
const targets = packages.slice(1);

const sourceApp = join(cwd(), source, "app")
const sourceFiles = readdirRecursivelySync(sourceApp);

const sourceFileContents = new Map<string, string>()

function duplicate(target: string) {
  const targetApp = join(cwd(), target, "app")

  readdirSync(targetApp).forEach(file => rmSync(join(targetApp, file), { recursive: true }))

  sourceFiles.forEach(file => {
    if (!sourceFileContents.has(file)) {
      sourceFileContents.set(file, readFileSync(file, "utf8"))
    }

    const content = sourceFileContents.get(file) || ""

    const targetContent = content.replace("@remix-run/node", `${CHANGED_REMIX_IMPORTS[target as keyof typeof CHANGED_REMIX_IMPORTS]}`)

    const newPath = file.replace(sourceApp, targetApp)
    mkdirSync(dirname(newPath), { recursive: true })

    writeFileSync(newPath, targetContent)
  })
}

for (const target of targets) {
  duplicate(target)
  console.log("Done", target)
}