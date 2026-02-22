import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const data = await req.json();

  const filePath = path.join(process.cwd(), "data", "events.json");

  let events: any[] = [];

  if (fs.existsSync(filePath)) {
    events = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }

  events.push(data);

  fs.writeFileSync(filePath, JSON.stringify(events, null, 2));

  return Response.json({ status: "ok" });
}