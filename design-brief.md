# Design Brief — kusana-porto

**Owner:** agusirawan (kusanaligirl-lgtm) — IT Student, AI & Cloud Enthusiast, Vibe Coder
**Type:** website (standalone brand, no Higgsfield integration) · **Subdomain target:** kusana-porto

## Design read
A portfolio for a curious IT student who codes by vibe and builds small, useful,
AI-adjacent tools. Emotional register: *curious, crafted, playful-but-precise* —
the feeling of opening someone's field journal in a well-lit lab.

## Concept spine
**"The Lab Notebook"** — the site is a bound experiment journal. Every project is
a dated entry, every skill a tool hanging on the bench, the guestbook a page of
margin notes from visitors. Chapters read as notebook spreads over a single
continuous film of the workbench.

## Delivery tier
`cinema` (default for the animated website): Lenis + GSAP bridge, Tier-1 hero =
scroll-scrubbed film, scroll-chapter reveals.

## Animation mode
**`animated-website`** — user picked Animated at intake.

### Journey — single-shot
- **Journey shape:** `single-shot` — ONE continuous ~15s film of the workbench,
  scrubbed end to end, no seams. Chapters are HTML that read over it.
- **Journey (5 chapters mapped to moments of the one film):**
  1. **The Bench** — establishing: a wooden lab bench at night, notebook, tools,
     warm low light. Hero / intro.
  2. **The Code** — push toward a glowing terminal, code shimmering. About.
  3. **The Cloud** — macro drift across a server rack / circuit traces. Skills.
  4. **The Builds** — row of prototype gadgets on the bench. Projects.
  5. **The Guestbook** — settle on an open notebook page, pen resting on the fold.
     Guestbook + Contact.
- **World grammar (lock across the film):** one workbench world; dark, low-detail
  background (charcoal-to-forest gradient, subjects emerging from shadow);
  warm edge light from a single desk lamp; brass-and-wood surfaces; palette
  `#16281F` / `#1A2B22` / `#F2ECDD` / `#C8F135` / `#E8482F`; no on-screen text.
- **Camera architecture:** A — continuous forward push-in through the bench;
  single unbroken move, slow steady velocity, settles on the notebook at the end.
  START state (wide bench) ≠ END state (notebook close-up).
- **Seam direction:** n/a (single shot — no seams).
- **Mobile framing:** all focal subjects kept center-safe for `cover` crop on
  portrait screens.
- **Cost shape:** 1 storyboard image (6-panel grid) + ONE film (16:9, ~15s,
  audio off, highest res) + posters (desktop/mobile).
- **Delivery budget:** desktop clip ≤ 32 MiB, mobile clip ≤ 16 MiB.

## Locked palette
- `--paper #F2ECDD` warm ivory (page/base) · `--ink #1A2B22` forest ink
  (text/dark) · `--ink-2 #24382C` raised ink · `--bone #FBF7EC` bright surface ·
  `--chartreuse #C8F135` brand/circuit glow · `--red #E8482F` signal/CTA ·
  `--cloud #D8E0D2` cool grey-green.
- Defense: forest-ink + acid chartreuse reads "lab instrument + code editor",
  distinct from all banned families (no graphite+orange, no near-black+neon
  cyan/green, no beige+brass/oxblood, no AI purple glow).

## Locked type
- Display/UI: **Space Grotesk** (grotesk with a techno-organic edge). Mono:
  **JetBrains Mono** for eyebrows, data, tags, and code-like details. No serif.
- Scale: display 55/1.1/700, h2 34/1.2/600, h3 21/1.3/600, lead 18/1.5,
  body 14/1.5, caption 13/1.4. 4/8pt spacing grid throughout.

## Section plan (ordered; layout families, no consecutive repeats)
1. **Hero / The Bench** — full-bleed video stage + eyebrow + display headline +
   scroll cue. *(full-bleed)*
2. **About / The Coder** — split: portrait frame (user photo) + bio + stat list.
   *(split)*
3. **Projects / The Builds** — bento grid of project entries (GitHub-sourced).
   *(bento grid)*
4. **Skills / The Tools** — 3-column capability blocks + mono tag cloud.
   *(3-col)*
5. **Guestbook / Margin Notes** — stacked list of visitor notes + leave-a-note
   form. *(stacked list + form)*
6. **Contact / The Call** — centered card with email + social links.
   *(centered card)*
7. **Footer** — monogram, tiny nav, visitor counter, admin link.

## Asset plan (Higgsfield-generated; see refs/)
- 1 storyboard (6-panel grid of the single continuous move).
- 1 film (single-shot, 16:9, ~15s, audio off) + desktop/mobile posters.
- 3 section boards (about, projects, skills) — same world grammar.
- 1 logo tile → monogram "ag" mark + favicon.
- 1 cover/OG (3:2 branded cover; capsule-masked OG) + favicon.
- 6 project plate images (stylized specimen plates for featured repos).
- Supplied asset: user portrait photo → About frame (`public/assets/about/portrait.jpg`).
- Icon set: hand-built inline SVG set matching the brand (stroke 2px, round caps,
  chartreuse-on-ink) — no raster icons.

## CTA inventory (each its own interaction identity, no shared button class)
1. **Scroll cue "open the notebook"** — sticky stamped arrow, scrolls to About.
2. **Nav links** — underline-slide links, mono, ink-on-paper.
3. **Project "open repo"** — arrow-slide link cards; whole card clickable.
4. **Guestbook "leave a note"** — chartreuse stamp button with press-down offset.
5. **Contact "send message"** — ink button with paper send-glyph; success swap.
6. **Footer admin link** — discreet mono micro-link.