# Technical Architecture - TalentScout AI

## System Overview
TalentScout AI is built on a principle of **Actual Interest Scoring**. Unlike traditional ATS systems that focus on keyword matching, TalentScout simulates the human recruiter's internal dialogue using the Gemini 1.5 Flash model.

## Core Flow (The Protocol)

### 1. Requirements Extraction
- **Input**: Raw text (text/markdown).
- **Processing**: The `analyzeJD` service uses a structured prompt to convert the string into a `JobDescriptionAnalysis` interface.
- **Output**: JSON containing `keyCompetencies`, `preferredExperience`, and `culturalTraits`.

### 2. Multi-Dimensional Ranking
- **Logic**: Each candidate is processed through a Scoring Engine.
- **Metrics**: 
  - **Technical Fit**: Alignment of skills/years with JD requirements.
  - **Cultural Alignment**: Mapping of candidate's career trajectory to company mission.
- **Explainability**: The system generates a natural language `reasoning` string for each candidate to allow for recruiter over-ride.

### 3. Synthesis (The Outreach Simulator)
- **Concept**: To determine if a candidate *actually* wants the role.
- **Mechanics**: 
  - The Gemini model is given two personas: the Recruiter and the Candidate.
  - It simulates a 3-turn exchange based on the candidate's real bio and the JD.
  - **Scoring**: Analysis of the simulation determines "Genuineness" of interest.

## Tech Stack
- **Library**: `React 19`
- **Compiler**: `Vite`
- **Language**: `TypeScript`
- **AI Backend**: `@google/genai` (Gemini 1.5 Flash)
- **Styling**: `Tailwind CSS 4.0`
- **Motion**: `motion/react`

## Scalability & Performance
- **Latency**: Optimization via Gemini 1.5 Flash ensures match operations occur in < 1s.
- **Density**: The Brutalist UI is designed to minimize whitespace, allowing recruiters to scan 2x more information than traditional interfaces.
