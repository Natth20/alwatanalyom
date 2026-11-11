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
} catch (e) {
  console.error("Warning during postbuild copy:", e);
}


