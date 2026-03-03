---
active: true
iteration: 1
max_iterations: 50
completion_promise: "PRODUCTION READY"
started_at: "2026-02-28T12:00:00Z"
---

TASK: Execute remaining implementation plan (Tasks 2-9) and push the ABTI soul-generator to production-ready state.

CONTEXT:
- Stack: Next.js 16, TypeScript, Tailwind, Supabase (auth + DB), OpenAI gpt-4o-mini
- Project: /Users/tomo/Projects/soul-generator
- Plan: docs/plans/2026-02-28-trait-fixes-e2e-plan.md
- Task 1 (vitest setup) is DONE. Tests run with `pnpm test`.
- Env keys configured: SUPABASE_URL, SUPABASE_ANON_KEY, OPENAI_API_KEY

REQUIREMENTS (in order):
1. Fix logic slider — implement logicDelta effects in applySliders() with +-0.25 threshold string overrides (decision_mode, communication_style, response_structure) + numeric tangent reduction. Write tests first.
2. Fix playfulness slider — add emoji_density (+playDelta*0.2), enthusiasm_baseline (+playDelta*0.15) effects + humor_type adjacent shifts at +-0.25 threshold. Write tests first.
3. ADHD subtype types — change `adhd: boolean` to `adhd: "none" | "inattentive" | "hyperactive" | "combined"` in types.ts (TraitVector + Phase1Input) and use-quiz-state.ts (Phase1Data + default).
4. ADHD subtype mapper — rewrite applyADHD() with subtype-aware modifiers (inattentive=ambient+high tangent, hyperactive=burst+high enthusiasm, combined=both). Write tests.
5. ADHD subtype generators — update soul-template.ts (subtype-aware section), system-prompt.ts (subtype-aware prompt), ai-enhancer.ts (ADHD display).
6. ADHD subtype avatar+display — update avatar/composer.ts, avatar route validation, trait-display.tsx for string union type.
7. ADHD subtype UI — replace toggle in phase-1/page.tsx with 4-option pixel-styled selector (None/Inattentive/Hyperactive/Combined). English labels.
8. E2E verification — start dev server, test full Phase 1->2->3->generation flow with live Supabase+OpenAI.
9. Production polish — ensure `pnpm build` succeeds, all UI text in English, loading states on generation, proper error handling in API routes, TypeScript zero errors.

CONSTRAINTS:
- All UI text must be in English (replace Korean labels where needed)
- Use pixel-art styling, never emoji characters in UI
- Follow TDD: write failing test -> implement -> verify green
- Atomic commits per logical change
- Do NOT modify Supabase migrations or schema
- Do NOT modify the quiz questions content (quiz-scorer.ts)

PROCESS:
For each requirement:
1. Write failing test (if applicable)
2. Run `pnpm test` — confirm it fails
3. Implement the minimal code
4. Run `pnpm test` — confirm all pass
5. Run `pnpm exec tsc --noEmit` — confirm zero TS errors
6. Commit with descriptive message

VERIFICATION:
After each change, run:
  pnpm test
  pnpm exec tsc --noEmit
After all changes:
  pnpm build
ALL must pass before marking complete.

SUCCESS CRITERIA:
- All vitest tests pass (including new ones for logic, playfulness, ADHD subtypes)
- TypeScript compiles with zero errors
- `pnpm build` succeeds
- Logic slider at extreme positions changes decision_mode and communication_style
- Playfulness slider affects emoji_density, enthusiasm, and humor_type
- ADHD selector shows 4 options; inattentive gets ambient energy, hyperactive gets burst
- Full soul generation works end-to-end with live APIs
- All UI-facing text is in English

STUCK HANDLING:
After 3 consecutive failures on the same issue, try an alternative approach.
After 2 failed alternatives, document the blocker and skip to the next requirement.

When ALL success criteria are met, output:
  <promise>PRODUCTION READY</promise>
