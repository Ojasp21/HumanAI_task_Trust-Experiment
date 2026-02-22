import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "events.json");

  if (!fs.existsSync(filePath)) {
    return new Response("No data available", { status: 404 });
  }

  const rawData = fs.readFileSync(filePath, "utf-8");
  const events = JSON.parse(rawData);

  if (!events.length) {
    return new Response("No events recorded yet", { status: 404 });
  }


  const headers = Object.keys(events[0]);

  const csvRows = [
    headers.join(","), 
    ...events.map((event: Record<string, any>) =>
      headers.map(header => `"${event[header]}"`).join(",")
    )
  ];

  const csvContent = csvRows.join("\n");

  return new Response(csvContent, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=events.csv"
    }
  });
}