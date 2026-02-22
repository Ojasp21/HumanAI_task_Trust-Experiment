import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "events.json");

  if (!fs.existsSync(filePath)) {
    return Response.json([]);
  }

  const events = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return Response.json(events);
}