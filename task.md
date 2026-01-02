# Task: Design Improvement Loop for Static Enterprise Landing Page

## Goal

Improve the visual design and responsiveness of the static landing page (`index.html`) so that:

- It looks like a polished enterprise-level website.
- It works cleanly and consistently across all key viewport ranges:
  - ≤ 480px – phones
  - 481–768px – large phones / small tablets
  - 769–1024px – tablets / small laptops
  - 1025–1440px – normal laptops
  - > 1440px – big desktop / ultra-wide

Use the principles and working style in `codex.md`.

---

## 1. Ensure the site is being served locally

1. Check whether the local dev URL is reachable (for example `http://localhost:4173/`).
2. If you cannot reach it:
   - Assume the static server is not running.
   - Instruct the user to run a simple HTTP server from the project root, such as:

     ```bash
     npx serve . -l 4173
     ```

   - Once the server is running, proceed with `http://localhost:4173/` (or the actual local URL).

---

## 2. Baseline inspection across all viewports

Using the `playwright` MCP server:

1. Open the local URL at representative sizes for each viewport band:

   - **Phone (≤ 480px):**
     - Example: 375×667.
   - **Large phone / small tablet (481–768px):**
     - Example: 600×900.
   - **Tablet / small laptop (769–1024px):**
     - Example: 900×1024.
   - **Normal laptop (1025–1440px):**
     - Example: 1366×768 or 1440×900.
   - **Big desktop / ultra-wide (> 1440px):**
     - Example: 1920×1080.

2. For each viewport size, observe and note:

   - Layout:
     - Does the layout break?
     - Is there horizontal scrolling?
     - Are sections clearly separated?
   - Typography:
     - Is text readable without zoom?
     - Is hierarchy (headings vs body) obvious?
   - CTAs:
     - Is the primary CTA visible and obvious?
     - Are buttons tappable/clickable comfortably on smaller screens?
   - Visual balance:
     - Is there enough white space?
     - Does anything feel cramped or misaligned?

3. Summarize your findings as:

   - A short list of key issues per viewport band.
   - A global list of the highest-impact issues across the whole experience.

---

## 3. Plan the first round of changes

Based on the baseline inspection:

1. Identify the **top 5–10 issues** that most hurt:

   - Professional / enterprise feel.
   - Clarity of the main message.
   - Usability on small screens.

2. Decide which files and selectors you’ll touch (e.g. `index.html`, `styles.css`).

3. Write a short plan, for example:

   - “Iteration 1 plan”
     - Adjust hero section layout for phones and laptops.
     - Fix overly wide text on large desktops.
     - Improve CTA visibility on small screens.
     - Normalize font sizes for headings and body text.

Present this plan in your response before editing.

---

## 4. Apply design improvements (HTML/CSS focused)

Implement the planned changes:

1. In HTML:
   - Add or adjust containers/wrappers if needed for better layout control.
   - Ensure semantic structure is preserved (headings, sections, lists, buttons/links).

2. In CSS:
   - Add or refine media queries to target the viewport bands listed above.
   - Adjust:
     - Spacing (margin, padding).
     - Layout (flex, grid, alignment).
     - Typography (font-size, line-height, font-weight).
     - Colors (backgrounds, text, CTA buttons).
   - Ensure that any changes work gracefully across all ranges, not just one.

3. Keep JavaScript changes minimal:
   - Only change JS if necessary for responsive behavior (e.g. simple mobile menu).
   - Avoid breaking existing interactions.

---

## 5. Re-check visually across all viewports

After updating the code:

1. Use `playwright` again to open the page at the same viewport sizes:

   - 375×667
   - 600×900
   - 900×1024
   - 1366×768 or 1440×900
   - 1920×1080

2. Confirm for each size:

   - The issues you targeted are improved or resolved.
   - No new major layout breaks or overflow issues have appeared.
   - The main message and CTA remain visible and clear.

3. Note any remaining or newly discovered issues, grouped by viewport band.

---

## 6. Iterate (2–4 improvement cycles)

Run several improvement cycles:

1. Before each cycle:
   - Review the current state of the page.
   - Update the list of remaining issues, again per viewport band.

2. For each cycle:
   - Choose a small set of high-impact improvements (e.g. refine hero, fix tablet layout, polish typography).
   - Make focused HTML/CSS changes.
   - Re-validate with `playwright` across all viewport sizes.

3. Work order guideline:
   - First: Fix broken layouts and remove horizontal scrolling, especially on smaller screens.
   - Second: Clarify hierarchy (headings, sections, CTA).
   - Third: Refine typography and spacing.
   - Finally: Polish colors and subtle details.

Stop when:

- The layout is solid and consistent across all five viewport bands.
- The site looks like a clean, enterprise-grade marketing page.
- The primary CTA and main story are obvious and compelling.

---

## 7. Document changes

Maintain or create a `DESIGN_LOG.md` with:

- One section per iteration (`Iteration 1`, `Iteration 2`, etc.).
- For each iteration:
  - Short description of:
    - Problems addressed.
    - Concrete changes made (HTML/CSS).
    - Which viewport bands were specifically improved.
- At the end, include:
  - A short summary of the final design state.
  - Optional suggestions for future enhancements (e.g. subtle animation, improved imagery, microcopy edits).

---

## Constraints and Reminders

- Do not introduce new heavy frameworks or build systems.
- Do not break existing functional JavaScript features.
- Keep styles maintainable and understandable (avoid overly complex selectors or hacks).
- Always validate changes with the `playwright` MCP server at the defined viewport sizes.
- Always think in terms of an **enterprise-level user experience**: clear, calm, trustworthy, and professional.
