const fs = require("fs");
const path = require("path");

try {
  const sourceNext = path.join(__dirname, ".next");

  if (fs.existsSync(sourceNext)) {
    // 1. Mirror into apps/web/.next (in case Vercel has Output Directory set to apps/web/.next while Root is apps/web)
    const nestedAppsWeb = path.join(__dirname, "apps", "web");
    const nestedTargetNext = path.join(nestedAppsWeb, ".next");
    if (!fs.existsSync(nestedTargetNext)) {
      fs.mkdirSync(nestedAppsWeb, { recursive: true });
      fs.cpSync(sourceNext, nestedTargetNext, { recursive: true });
      console.log("✅ Successfully mirrored .next into apps/web/.next");
    }

    // 2. Also ensure root-level .next exists if Vercel checks parent directory
    const parentNext = path.join(__dirname, "..", "..", ".next");
    if (!fs.existsSync(parentNext)) {
      try {
        fs.cpSync(sourceNext, parentNext, { recursive: true });
        console.log("✅ Successfully mirrored .next into workspace root");
      } catch {}
    }
  }

  // 3. Locate all Prisma query engines and ensure they are present in server bundle & .prisma/client
  const findEngines = (dir, depth = 0) => {
    if (depth > 6) return [];
    let files = [];
    try {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      for (const item of items) {
        const full = path.join(dir, item.name);
        if (item.isDirectory()) {
          if (item.name === "node_modules" || item.name.includes("prisma") || item.name === ".pnpm") {
            files = files.concat(findEngines(full, depth + 1));
          }
        } else if (item.isFile() && item.name.includes("query_engine")) {
          files.push(full);
        }
      }
    } catch {}
    return files;
  };

  const targetDirs = [
    path.join(__dirname, ".next", "server"),
    path.join(__dirname, ".prisma", "client"),
    path.join(__dirname, "apps", "web", ".next", "server"),
    path.join(__dirname, "apps", "web", ".prisma", "client"),
    path.join(__dirname, "..", "..", ".next", "server"),
  ];

  for (const tDir of targetDirs) {
    if (!fs.existsSync(tDir)) {
      try { fs.mkdirSync(tDir, { recursive: true }); } catch {}
    }
  }

  const rootNodeModules = path.join(__dirname, "..", "..", "node_modules");
  const localNodeModules = path.join(__dirname, "node_modules");
  const engines = Array.from(new Set([...findEngines(rootNodeModules), ...findEngines(localNodeModules)]));

  console.log(`Found ${engines.length} engine candidates to distribute.`);
  for (const enginePath of engines) {
    const filename = path.basename(enginePath);
    for (const tDir of targetDirs) {
      if (fs.existsSync(tDir)) {
        const targetPath = path.join(tDir, filename);
        try {
          fs.copyFileSync(enginePath, targetPath);
          console.log(`✅ Placed ${filename} -> ${tDir}`);
        } catch {}
      }
    }
  }
} catch (e) {
  console.error("Warning during postbuild:", e);
}
