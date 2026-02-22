"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import conditions from "../config/conditions.json";

type ConditionKey = keyof typeof conditions;

interface Variant {
  name: string;
  message: string;
}

interface InitResponse {
  participantId: string;
  condition: ConditionKey;
}

export default function Home() {
  const [participantId, setParticipantId] = useState<string>("");
  const [condition, setCondition] = useState<ConditionKey | null>(null);
  const [variant, setVariant] = useState<Variant | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const initializeTrial = async () => {
    const res = await fetch("/api/init");
    const data: InitResponse = await res.json();

    const variants = conditions[data.condition];
    const chosen =
      variants[Math.floor(Math.random() * variants.length)];

    setParticipantId(data.participantId);
    setCondition(data.condition);
    setVariant(chosen);
    setStartTime(Date.now());
    setSubmitted(false);
  };

  useEffect(() => {
    initializeTrial();
  }, []);

  if (!variant || !condition) return null;

  const handleDecision = async (decision: "accept" | "override") => {
    const latency = Date.now() - startTime;

    await fetch("/api/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        participant_id: participantId,
        condition,
        decision,
        timestamp: new Date().toISOString(),
        latency_ms: latency
      })
    });

    setSubmitted(true);
  };

  const handleExport = async () => {
    const res = await fetch("/api/export");
    const blob = await res.blob();

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "events.csv";
    link.click();
  };

  if (submitted)
  return (
    <div className="experiment-container">
      <Link href="/analytics" className="analytics-link">
    Analytics
  </Link>
      <div className="form-card thank-you">
        <h2>Thank you for participating.</h2>

        <div className="button-group">
          <button
            className="form-button primary-btn"
            onClick={initializeTrial}
          >
            Start New Trial
          </button>

          <button
            className="form-button secondary-btn"
            onClick={handleExport}
          >
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
    return (
  <div className="experiment-container">
    <Link href="/analytics" className="analytics-link">
  Analytics
</Link>
    <div className="form-card">

      <div className="form-header">
        <div className="form-title">Decision Task</div>
        <div className="form-subtitle">
          Please review the AI recommendation below and make your decision.
        </div>
      </div>

      <div className="message-box">
        <div className="agent-name">{variant.name}</div>
        <div className="agent-message">{variant.message}</div>
      </div>

      <div className="question-label">
        Do you accept this recommendation?
      </div>

      <div className="button-group">
        <button
          className="form-button primary-btn"
          onClick={() => handleDecision("accept")}
        >
          Accept Recommendation
        </button>

        <button
          className="form-button"
          onClick={() => handleDecision("override")}
        >
          Override Recommendation
        </button>
      </div>

      <div className="footer-buttons">
        <button
          className="form-button secondary-btn"
          onClick={handleExport}
        >
          Export CSV
        </button>
      </div>

    </div>
  </div>
);
}