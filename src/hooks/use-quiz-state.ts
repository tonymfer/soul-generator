"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { Phase1Input } from "@/lib/generators/types";

// ============================================================
// Quiz State Management
// Persists to sessionStorage so back/forward navigation works.
// Uses useSyncExternalStore for React 18+ safe external state.
// ============================================================

/** Phase 1 data: MBTI selection + ADHD toggle + trait sliders */
export interface Phase1Data {
  mbti: string;
  adhd: boolean;
  traits: {
    introversion: number;
    playfulness: number;
    logic: number;
    empathy: number;
    chaos: number;
    formality: number;
  };
}

/** Phase 2 data: quiz question answers */
export type Phase2Data = Record<string, string>; // { questionId: selectedOptionId }

/** Phase 3 data: free text + soul name */
export interface Phase3Data {
  freeText: string;
  soulName: string;
}

/** Complete quiz state */
export interface QuizState {
  phase1: Phase1Data;
  phase2: Phase2Data;
  phase3: Phase3Data;
  currentPhase: 1 | 2 | 3;
}

/** The full input needed for soul generation API */
export interface QuizFullInput {
  phase1Input: Phase1Input;
  quizAnswers: Record<string, string>;
  freeText: string;
  soulName: string;
}

// ---------------------------------------------------------------------------
// Default values
// ---------------------------------------------------------------------------

const DEFAULT_PHASE1: Phase1Data = {
  mbti: "",
  adhd: false,
  traits: {
    introversion: 0.5,
    playfulness: 0.5,
    logic: 0.5,
    empathy: 0.5,
    chaos: 0.5,
    formality: 0.5,
  },
};

const DEFAULT_PHASE3: Phase3Data = {
  freeText: "",
  soulName: "",
};

const DEFAULT_STATE: QuizState = {
  phase1: DEFAULT_PHASE1,
  phase2: {},
  phase3: DEFAULT_PHASE3,
  currentPhase: 1,
};

const STORAGE_KEY = "abti-quiz-state";

// ---------------------------------------------------------------------------
// External store (singleton)
// ---------------------------------------------------------------------------

let currentState: QuizState = DEFAULT_STATE;
const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function getSnapshot(): QuizState {
  return currentState;
}

function getServerSnapshot(): QuizState {
  return DEFAULT_STATE;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function setState(updater: (prev: QuizState) => QuizState) {
  currentState = updater(currentState);
  // Persist to sessionStorage
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(currentState));
  } catch {
    // sessionStorage might be unavailable
  }
  emitChange();
}

// Hydrate from sessionStorage on first load (client-side only)
let hydrated = false;
function hydrateOnce() {
  if (hydrated) return;
  hydrated = true;
  try {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as QuizState;
        currentState = {
          ...DEFAULT_STATE,
          ...parsed,
          phase1: { ...DEFAULT_PHASE1, ...parsed.phase1, traits: { ...DEFAULT_PHASE1.traits, ...parsed.phase1?.traits } },
          phase3: { ...DEFAULT_PHASE3, ...parsed.phase3 },
        };
      }
    }
  } catch {
    // Ignore parse errors
  }
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useQuizState() {
  // Hydrate from sessionStorage on first render
  hydrateOnce();

  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setPhase1 = useCallback((data: Partial<Phase1Data>) => {
    setState((prev) => ({
      ...prev,
      phase1: {
        ...prev.phase1,
        ...data,
        traits: {
          ...prev.phase1.traits,
          ...(data.traits ?? {}),
        },
      },
    }));
  }, []);

  const setPhase2Answer = useCallback((questionId: string, optionId: string) => {
    setState((prev) => ({
      ...prev,
      phase2: {
        ...prev.phase2,
        [questionId]: optionId,
      },
    }));
  }, []);

  const setPhase3 = useCallback((data: Partial<Phase3Data>) => {
    setState((prev) => ({
      ...prev,
      phase3: {
        ...prev.phase3,
        ...data,
      },
    }));
  }, []);

  const setCurrentPhase = useCallback((phase: 1 | 2 | 3) => {
    setState((prev) => ({
      ...prev,
      currentPhase: phase,
    }));
  }, []);

  const reset = useCallback(() => {
    currentState = DEFAULT_STATE;
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    emitChange();
  }, []);

  const getFullInput = useCallback((): QuizFullInput => {
    const { phase1, phase2, phase3 } = currentState;
    return {
      phase1Input: {
        mbti: phase1.mbti || "INFP", // default fallback if skipped
        adhd: phase1.adhd,
        traits: phase1.traits,
      },
      quizAnswers: phase2,
      freeText: phase3.freeText,
      soulName: phase3.soulName,
    };
  }, []);

  return {
    state,
    setPhase1,
    setPhase2Answer,
    setPhase3,
    setCurrentPhase,
    reset,
    getFullInput,
  };
}
