const fs = require("fs");
const path = require("path");

try {
  const sourceNext = path.join(__dirname, ".next");
  const targetDir = path.join(__dirname, "apps", "web");
  const targetNext = path.join(targetDir, ".next");

  if (fs.existsSync(sourceNext)) {
    fs.mkdirSync(targetDir, { recursive: true });
    fs.cpSync(sourceNext, targetNext, { recursive: true });
    console.log("✅ Successfully mirrored .next into apps/web/.next for Vercel deployment.");
  }
} catch (e) {
  console.error("Warning during postbuild copy:", e);
}
