# HANDOFF: Design Loop UI/UX Enhancement

## Status
- Phase 1 (i18n): ✅ Complete
- Phase 2 (Design Polish): ✅ Complete
- Phase 3 (Viral Mechanics): ✅ Complete
- Phase 4 (Pixel Art Assets): ✅ Complete
- **Design Loop: ⬅️ START HERE**

## What To Do
Run the `frontend-design` skill and `design-loop:design-loop` skill to enhance UI/UX across the ABTI app.

### Recommended Approach
1. Start dev server: `pnpm dev`
2. Use **Creative Unleash** mode (this is a personality quiz app with kawaii pixel terminal theme — bold moves welcome)
3. Target pages in order:
   - `/` (landing page — hero, trending, features, gallery preview)
   - `/create` (quiz entry page)
   - `/soul/[any-slug]` (soul detail with share card, trait display)
   - `/gallery` (soul gallery with filters)

### Design System Context
- **Theme**: Dark terminal aesthetic (#0a0a0f bg, #12121e cards)
- **Fonts**: Press Start 2P (brand/headings), JetBrains Mono (body/code)
- **Colors**: Purple #7c6ef6, Pink #f472b6, Yellow #fbbf24, Green #4ade80
- **Framework**: Next.js 16 + Tailwind v4 with @theme inline tokens
- **Components**: Terminal-style (TerminalButton, TerminalCard, TerminalBadge) + legacy pixel-style (PixelButton, PixelCard, PixelBadge)
- **CSS**: `src/app/globals.css` has all tokens, animations, utilities

### Key Files
- `src/app/page.tsx` — landing page
- `src/app/create/layout.tsx` — create flow layout
- `src/app/create/phase-1/page.tsx` — MBTI + sliders
- `src/app/create/phase-2/page.tsx` — quiz questions
- `src/app/create/phase-3/page.tsx` — final touch + name
- `src/app/soul/[slug]/page.tsx` — soul detail
- `src/app/gallery/page.tsx` — gallery
- `src/app/globals.css` — design tokens
- `src/components/ui/` — all UI primitives
- `src/components/soul/` — soul-specific components

### Focus Areas for Enhancement
- Landing page hero impact and visual hierarchy
- Quiz flow micro-interactions and transitions
- Soul detail page layout and share card presentation
- Gallery card visual richness
- Overall animation choreography and page transitions
- Mobile responsiveness refinement

## Prompt for Next Session
```
Use frontend-design and design-loop skills to enhance UI/UX.
Read .claude/HANDOFF.md for context. Start dev server with pnpm dev first.
```
