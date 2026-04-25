# TalentScout AI

**TalentScout AI** is an autonomous talent acquisition agent designed to bridge the gap between complex job requirements and candidate discovery. By leveraging the Gemini API, it sifts through talent pools, ranks candidates with explainable metrics, and simulates human-like outreach to assess interest.

## 🚀 Key Features

- **JD Intelligence**: Instantly extracts core competencies and preferred experience from raw job descriptions.
- **Explainable Ranking**: Scores candidates on two primary dimensions: **Technical Fit** and **Cultural Alignment**, providing a natural language "Reasoning" for every match.
- **Simulated Engagement**: An autonomous agent conducts a simulated conversation with candidates based on their unique career history and goals to determine an **Interest Score**.
- **Brutalist UI**: A high-performance, responsive interface built for speed and density.

## 🏗️ Technical Architecture

### System Blueprint
1. **Ingestion**: The Gemini LLM parses raw Job Descriptions into a structured JSON schema, extracting explicit requirements and implicit needs.
2. **Matching**: A multi-dimensional scoring engine evaluates candidates against the schema using prompt-engineered heuristics.
3. **Synthesis**: An AI-to-AI interest simulation modeled on candidate personas calculates "Actual Interest" rather than just "Theoretical Fit".
4. **Ranking**: Results are normalized and ranked with transparent reasoning for recruiter auditing.

### Tech Stack
- **Frontend**: React 19, TypeScript, Vite.
- **Animation**: Motion (formerly Framer Motion) for staggered lifecycle transitions.
- **Styling**: Tailwind CSS 4.0 with a custom Brutalist Design System.
- **AI Engine**: Google Gemini 1.5 Flash via `@google/genai`.

### Scoring Logic
1. **Match Score (JD Analysis phase)**: 
   - The AI compares candidate skills, experience years, and bio against the JD requirements.
   - It weights 'Required' skills higher than 'Preferred' skills.
   - It generates a 0-100 score for Technical and Cultural fit.
2. **Interest Score (Outreach phase)**:
   - The agent initiates a simulated outreach based on the candidate's bio (simulating their personality and goals).
   - The AI evaluates the candidate's responses for enthusiasm, alignment with the role's mission, and potential availability.
   - Outputs a final "Genuine Interest" percentage.

## 🎥 Demo Video
Watch the full project walkthrough and logic demonstration:
**[View Demo Video on Google Drive](https://drive.google.com/file/d/14OSyeI5Pop4lL4pXDM-gq5rMCxgfs9hu/view?usp=sharing)**

## 🛠️ Setup Instructions

1. **Clone the repository.**
2. **Install dependencies**: `npm install`.
3. **Environment Setup**: Add your `GEMINI_API_KEY` to the `.env` file.
4. **Run Development Server**: `npm run dev`.
5. **Production Build**: `npm run build`.

## 📈 Sample Inputs/Outputs

- **Input**: "Senior React Engineer needed for a dynamic fintech startup. 5+ years experience, passion for UI/UX, and familiarity with decentralized finance."
- **Output**: Ranked list starting with Sarah Chen (85% Match), reasoning citing her 8 years of Full Stack experience and AI integration focus.
