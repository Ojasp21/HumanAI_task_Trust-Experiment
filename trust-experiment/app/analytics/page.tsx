"use client";

import { useEffect, useState } from "react";

interface EventLog {
  participant_id: string;
  condition: "A" | "B";
  decision: "accept" | "override";
  latency_ms: number;
}

export default function Analytics() {
  const [data, setData] = useState<EventLog[]>([]);

  useEffect(() => {
    fetch("/api/data")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data.length)
    return <p style={{ padding: 40 }}>No data yet.</p>;

  const byCondition = (cond: "A" | "B") =>
    data.filter(d => d.condition === cond);

  const relianceRate = (cond: "A" | "B") => {
    const group = byCondition(cond);
    return group.length
      ? (group.filter(d => d.decision === "accept").length / group.length) * 100
      : 0;
  };

  const meanLatency = (cond: "A" | "B") => {
    const group = byCondition(cond);
    return group.length
      ? group.reduce((s, d) => s + d.latency_ms, 0) / group.length
      : 0;
  };

  const relianceA = relianceRate("A");
  const relianceB = relianceRate("B");

  return (
    <div className="analytics-container">
      <div className="analytics-title">Experiment Analytics</div>


      <table className="analytics-table">
        <thead>
          <tr>
            <th>Condition</th>
            <th>Reliance (%)</th>
            <th>Mean Latency (ms)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A</td>
            <td>{relianceA.toFixed(1)}</td>
            <td>{meanLatency("A").toFixed(0)}</td>
          </tr>
          <tr>
            <td>B</td>
            <td>{relianceB.toFixed(1)}</td>
            <td>{meanLatency("B").toFixed(0)}</td>
          </tr>
        </tbody>
      </table>


      <div className="graph-container">
        <div className="graph-title">
          Reliance Rate by Condition
        </div>

        <div className="bar-wrapper">
          <div className="bar-group">
            <div
              className="bar"
              style={{ height: `${relianceA * 2}px` }}
            />
            <div className="bar-label">Condition A</div>
            <div className="bar-value">
              {relianceA.toFixed(1)}%
            </div>
          </div>

          <div className="bar-group">
            <div
              className="bar secondary"
              style={{ height: `${relianceB * 2}px` }}
            />
            <div className="bar-label">Condition B</div>
            <div className="bar-value">
              {relianceB.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}