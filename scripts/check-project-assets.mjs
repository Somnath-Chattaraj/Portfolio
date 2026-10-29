import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
for (const name of ["ecox", "autoflow", "ai_sre", "campus-chatter", "echo"]) {
  const path = new URL(`../public/projects/${name}.png`, import.meta.url);
  const bytes = await readFile(path);
  if (bytes.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") throw new Error(`${name}: expected a real PNG file`);
  const width = bytes.readUInt32BE(16), height = bytes.readUInt32BE(20);
  if (width < 800 || height < 500) throw new Error(`${name}: capture a full-size desktop viewport`);
  console.log(`${name}.png: ${width} x ${height}, ${bytes.length} bytes, sha256 ${createHash("sha256").update(bytes).digest("hex")}`);
}
