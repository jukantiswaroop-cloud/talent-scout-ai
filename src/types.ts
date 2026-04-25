/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Candidate {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  skills: string[];
  bio: string;
  education: string;
  avatarUrl?: string;
}

export interface JobDescriptionAnalysis {
  title: string;
  requiredSkills: string[];
  preferredSkills: string[];
  experienceLevel: string;
  keyResponsibilities: string[];
}

export interface MatchScore {
  technicalFit: number; // 0-100
  culturalFit: number; // 0-100
  overall: number; // 0-100
  explanation: string;
}

export interface ChatMessage {
  role: 'agent' | 'candidate';
  content: string;
  timestamp: string;
}

export interface OutreachSimulation {
  candidateId: string;
  interestScore: number; // 0-100
  summary: string;
  messages: ChatMessage[];
}

export interface ShortlistedCandidate extends Candidate {
  matchScore: MatchScore;
  outreach?: OutreachSimulation;
}
