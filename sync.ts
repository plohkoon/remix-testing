import { mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { cwd, exit } from "process";
import Package from "./package.json" assert { type: 'json' };

const CHANGED_REMIX_IMPORTS = {
  "netlify": "@remix-run/node",
  "architect": "@remix-run/node",
  "fly": "@remix-run/node",
  "pages": "@remix-run/cloudflare",
  "vercel": "@remix-run/node",
  "workers": "@remix-run/cloudflare"
}

// Get all the files in the source app folder
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
  console.log("You need to have at least two packages in your workspace to run this script")
  exit(0);
}

// The first one counts as the "source" package
const source = packages[0];
const targets = packages.slice(1);

// Get the paths of all files in the source app
const sourceApp = join(cwd(), source, "app")
const sourcePrisma = join(cwd(), source, "prisma")
const sourceFiles = readdirRecursivelySync(sourceApp);
const sourcePrismaFiles = readdirRecursivelySync(sourcePrisma);

// Cache the contents of the file so we don't have to read it again and again
const sourceFileContents = new Map<string, string>()

function duplicate(target: string) {
  const targetApp = join(cwd(), target, "app")

  // Ensure the app folder is empty (don't want/need old files around)
  readdirSync(targetApp).forEach(file => rmSync(join(targetApp, file), { recursive: true }))

  // Copy all files from the source app to the target app and modify the remix
  // imports to point to the new package
  sourceFiles.forEach(file => {
    if (!sourceFileContents.has(file)) {
      sourceFileContents.set(file, readFileSync(file, "utf8"))
    }

    const content = sourceFileContents.get(file) || ""

    let targetContent = content.replace("@remix-run/node", `${CHANGED_REMIX_IMPORTS[target as keyof typeof CHANGED_REMIX_IMPORTS]}`)

    if (target.match(/pages|worker/)) {
      targetContent = targetContent.replace("@prisma/client", "@prisma/client/edge")
    }

    const newPath = file.replace(sourceApp, targetApp)
    mkdirSync(dirname(newPath), { recursive: true })

    writeFileSync(newPath, targetContent)
  })

  // Copy the prisma folder to the target app
  const targetPrisma = join(cwd(), target, "prisma")

  // Ensure the app folder is empty (don't want/need old files around)
  readdirSync(targetPrisma).forEach(file => rmSync(join(targetPrisma, file), { recursive: true }))

  sourcePrismaFiles.forEach(file => {
    if (!sourceFileContents.has(file)) {
      sourceFileContents.set(file, readFileSync(file, "utf8"))
    }

    const content = sourceFileContents.get(file) || ""

    const newPath = file.replace(sourcePrisma, targetPrisma)
    mkdirSync(dirname(newPath), { recursive: true })

    writeFileSync(newPath, content)
  })
}

for (const target of targets) {
  duplicate(target)
  console.log("Done", target)
}