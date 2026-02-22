import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "events.json");

  let events: { participant_id: string }[] = [];

  if (fs.existsSync(filePath)) {
    events = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }

  const usedIds = new Set(events.map(e => e.participant_id));

  let participantId: string;

  do {
    participantId = "p_" + Math.floor(Math.random() * 1000000);
  } while (usedIds.has(participantId));

  const condition = Math.random() < 0.5 ? "A" : "B";

  return Response.json({ participantId, condition });
}