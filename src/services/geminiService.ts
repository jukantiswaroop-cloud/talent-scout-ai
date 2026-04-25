import { GoogleGenAI, Type } from "@google/genai";
import { Candidate, JobDescriptionAnalysis, MatchScore, OutreachSimulation } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeJD(text: string): Promise<JobDescriptionAnalysis> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the following job description and extract key details:
    "${text}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          requiredSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
          preferredSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
          experienceLevel: { type: Type.STRING },
          keyResponsibilities: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["title", "requiredSkills", "preferredSkills", "experienceLevel", "keyResponsibilities"],
      },
    },
  });

  return JSON.parse(response.text || '{}');
}

export async function scoreCandidate(candidate: Candidate, jd: JobDescriptionAnalysis): Promise<MatchScore> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Evaluate the following candidate against the job description:
    
    Candidate:
    ${JSON.stringify(candidate)}
    
    Job Description:
    ${JSON.stringify(jd)}
    
    Provide scores from 0-100 and a concise explanation.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          technicalFit: { type: Type.NUMBER },
          culturalFit: { type: Type.NUMBER },
          overall: { type: Type.NUMBER },
          explanation: { type: Type.STRING },
        },
        required: ["technicalFit", "culturalFit", "overall", "explanation"],
      },
    },
  });

  return JSON.parse(response.text || '{}');
}

export async function simulateOutreachConvo(candidate: Candidate, jd: JobDescriptionAnalysis): Promise<OutreachSimulation> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Simulate a brief 4-6 message conversation between an AI Recruiter and the candidate "${candidate.name}".
    The AI Recruiter is reaching out about the role "${jd.title}".
    The candidate should respond based on their profile: ${candidate.bio}.
    Assess the candidate's genuine interest based on their responses.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          interestScore: { type: Type.NUMBER },
          summary: { type: Type.STRING },
          messages: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                role: { type: Type.STRING, enum: ['agent', 'candidate'] },
                content: { type: Type.STRING },
                timestamp: { type: Type.STRING },
              },
              required: ["role", "content", "timestamp"],
            }
          },
        },
        required: ["interestScore", "summary", "messages"],
      },
    },
  });

  return {
    ...JSON.parse(response.text || '{}'),
    candidateId: candidate.id
  };
}
