# Human–AI Trust Calibration Experiment Platform

This project is a lightweight experimental web platform for studying how humanlike interface cues influence trust in AI-assisted decision-making.

It implements a controlled A/B experiment where participants interact with an AI recommendation system and choose whether to accept or override its advice. All behavioral data is logged in structured form and visualized in a built-in analytics dashboard.

The platform is modular, reproducible, and designed for behavioral trust research.

---

## Research Objective

To measure how interface cues such as:

- assistant naming  
- conversational tone  
- confidence framing  

influence:

- reliance on AI recommendations  
- override behavior  
- response latency  

using observable behavioral data rather than self-report surveys.

---

## Experimental Design

### Two Conditions

#### Condition A — Neutral System Style  
Formal, analytical, probability-based phrasing.

#### Condition B — Humanlike Assistant Style  
Named assistant with confident conversational phrasing.

---

###  Multiple Variants per Condition

Each condition contains multiple message variants to avoid wording bias and improve experimental robustness.

Example:

Condition A  
• 5 analytical system messages  

Condition B  
• 5 conversational humanlike messages  

For each participant:

1. One condition (A or B) is randomly assigned  
2. One variant within that condition is randomly selected  

Only the condition label (A or B) is stored in logs to keep analysis clean.

---

## Behavioral Task

Each participant completes a single decision task:

1. AI presents a recommendation  
2. Participant chooses:

   - Accept Recommendation  
   - Override Recommendation  

3. Response latency is measured

---

## Logged Dataset Schema

### Each trial produces a structured event:

```json
{
  "participant_id": "p_839201",
  "condition": "B",
  "decision": "accept",
  "timestamp": "2026-02-22T12:01:33Z",
  "latency_ms": 1870
}
```
### Fields:
| Field | Description |
| :--- | :--- |
| participant_id | Unique auto-generated ID |
| condition | A or B |
| decision | accept or override |
| timestamp | ISO time |
| latency_ms | Response time in milliseconds |

Note: Data is stored in data/events.json and can be exported as CSV.

---
## Analytics Dashboard

Available at: /analytics

**The dashboard displays:**
   * Reliance rate by condition (percentage of accept decisions)
   * Mean response latency by condition

---
## Experiment Flow

1. **Initialization**
   * Unique participant ID generated
   * Condition A or B randomly assigned
   * Variant randomly selected

2. **Task Display**
   * AI recommendation shown using assigned cue style

3. **Decision**
   * Participant accepts or overrides
   * Response time captured

4. **Logging**
   * Structured event stored in JSON dataset

5. **Analysis**
   * Data visualized in analytics dashboard
   * CSV export available

---
## Run Locally

Clone the Repo and then :
```bash
npm install
npm run dev
```
Open:
```bash
http://localhost:3000
```


