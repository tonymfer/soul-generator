// ============================================================
// Export System — Shared Types
// Pure TypeScript types with ZERO framework dependencies
// ============================================================

/** Data required by all export generators */
export interface ExportData {
  title: string;
  tagline: string;
  soulMd: string;
  systemPrompt: string;
  sampleConversations: { role: string; content: string }[][];
  tags: string[];
  mbti: string;
}

/** A single file within a multi-file export package */
export interface ExportFile {
  path: string;
  content: string;
}
