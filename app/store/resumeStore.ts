import { create } from "zustand";

export interface ResumeAnalysis {
  id?: number;
  overall_score: number;
  summary: string;
  keyword_gaps: string[];
  formatting_suggestions: string[];
  actionable_steps: string[];
  created_at?: string;
  updated_at?: string;
}

interface ResumeStoreState {
  currentAnalysis: ResumeAnalysis | null;
  setCurrentAnalysis: (analysis: ResumeAnalysis | null) => void;
  clearCurrentAnalysis: () => void;
}

export const useResumeStore = create<ResumeStoreState>((set) => ({
  currentAnalysis: null,
  setCurrentAnalysis: (analysis) => set({ currentAnalysis: analysis }),
  clearCurrentAnalysis: () => set({ currentAnalysis: null }),
}));
