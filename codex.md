# Codex-Style Plays For Fast, High-Quality UI/UX

Here’s how people quietly abuse AI/code (aka “Codex-style” workflows) to ship really good UI/UX fast. Framed as specific plays you can run.

---

## 1. Structure-first, styling-second prompts

**What they do**

They never start by asking the model for “a beautiful landing page.” They ask:

> “Give me **pure semantic HTML/JSX** for this screen. No colors, no Tailwind classes, just layout and copy in a logical structure.”

Then in a second prompt, they say:

> “Now take this markup and apply Tailwind using this design system:
> – Primary color: `#...`
> – Spacing scale: 4/8/12/16/24/32
> – Typo scale: 14/16/20/24/32/40
> – Border radius: 8/16
> – Only 2 font sizes per section.”

**Why it works**

* First pass = clean hierarchy & UX.
* Second pass = consistent visual system.
* You avoid the usual “div soup with 17 random colors.”

---

## 2. Design tokens as hard constraints

**What they do**

They treat the model like a compiler for a design system, not a “creative”:

* Define tokens once:
  * `--color-bg`, `--color-surface`, `--color-accent`
  * `--space-xs/sm/md/lg/xl`
  * `--radius-sm/md/lg`
* Then prompt:

> “You may only use these CSS variables for spacing, colors, and radii. Don’t invent new values. If you need a new level, say so instead of guessing.”

**Why it works**

* Forces consistency.
* Makes it easy to globally restyle later.
* Lets you refactor with simple search/replace instead of redesigning each component.

---

## 3. Component “state matrix” instead of one-off components

**What they do**

Instead of “build me a button,” they feed a **state table**:

| prop      | values                                    |
| --------- | ----------------------------------------- |
| `variant` | primary, secondary, subtle                |
| `size`    | sm, md, lg                                |
| `state`   | default, hover, active, loading, disabled |

Then prompt:

> “Generate a single React component that covers this state matrix and renders appropriate ARIA attributes, keyboard focus, and loading spinners. Return Storybook stories for each state too.”

**Why it works**

* You get a complete component API in one go.
* No more “oh, we forgot the loading / disabled / icon+label variant.”

---

## 4. Use AI as a ruthless design linters

**What they do**

After writing markup/CSS, they paste it back with screenshots and say:

> “Act as a senior product designer. Audit this UI for:
> – Visual hierarchy
> – Spacing rhythm
> – Alignment issues
> – Hit targets & tap areas
> – Inconsistent radii/shadows
> List concrete problems and show the exact DOM snippets to fix.”

Then they copy/paste the snippet into a follow-up:

> “Fix only the problems you listed without changing semantics.”

**Why it works**

* You get a targeted punch list rather than vague “use more whitespace.”
* It acts like a design code-review, which most teams never get.

---

## 5. “Flows, not screens” prompting

**What they do**

They almost never ask for a single screen. They describe a **mini-flow**:

> “Design a 3-step onboarding for a budgeting app:
>
> 1. Welcome + benefit framing
> 2. Basic info (income, fixed costs)
> 3. Success + next action (connect bank / skip)
>
> I want:
> – The JSX for all 3 screens
> – Dynamic progress indicator
> – Copy that reduces anxiety about money
> – Clear ‘I’m not ready’ secondary path.”

**Why it works**

* You get UX transitions, not isolated dribbble shots.
* It forces coherent copy/logic across steps.

---

## 6. UX copy engine with a style “contract”

**What they do**

They define a tiny voice guide as a contract:

* Tone: plain, warm, non-cheesy
* No emojis
* Max 2 sentences per microcopy block
* Avoid “optimize / leverage / unlock”

Then they paste all UI strings:

```json
{
  "headline": "Welcome to BudgetMaster 3000",
  "subhead": "Take control of your finances today!",
  "cta_primary": "Get started",
  "cta_secondary": "Learn more"
}
```

Prompt:

> “Rewrite this copy in the defined voice. Attach rationale for each change in comments but output just the JSON.”

**Why it works**

* You get coherent microcopy across the whole app.
* Easy to pipe into your code because it stays structured.

---

## 7. AI as accessibility officer

**What they do**

They regularly paste entire components and ask:

> “Check this for accessibility:
> – Color contrast (assume on white background)
> – Semantic tags
> – Focus order
> – ARIA usage
> – Keyboard interactions
>
> Output: list of issues + fixed code for each.”

**Hidden trick**

They also ask:

> “Generate a test plan: 5 manual checks a QA tester can perform in 10 minutes to verify this component is accessible in the UI.”

**Why it works**

* You catch issues usually discovered late (or never).
* You get concrete, repeatable QA steps.

---

## 8. “Empty states + errors + skeletons” factory

**What they do**

They never ship “nothing here yet” and call it a day.

Prompt pattern:

> “For this screen, design:
> – Initial empty state (never used feature)
> – Logical empty state (filters return nothing)
> – Error state (backend fails)
> – Loading skeleton
> Each must include:
> – Short title
> – One-line explanation
> – One primary action
> – Optional secondary action.
> Keep JSX structured and reuse the same EmptyState component.”

**Why it works**

* UX feels intentional in all the weird edge moments.
* Easy to maintain: one EmptyState component, multiple content configs.

---

## 9. Using AI for real IA (information architecture)

**What they do**

Given a feature list, they ask:

> “Group these features into:
> – Global nav items (max 5)
> – Secondary nav / settings
> – Things that should *not* be navigation at all (embedded actions).
>
> Explain the mental model behind your grouping, then give specific nav labels and URLs.”

Then they iterate until the structure makes sense before designing a single pixel.

**Why it works**

* You avoid the “junk drawer” nav every SaaS ends up with.
* It forces you to articulate the mental model explicitly.

---

## 10. “Design diffs” for refactors

**What they do**

When refactoring components, they feed old & new code:

> “Here is the old Card component. Here is the new one.
> Describe **only** the visual & UX changes that a user would notice. If any change might break consistency with the rest of the system, flag it.”

**Why it works**

* Great for code review: you see if a “small refactor” actually changed padding, typography, or behavior.
* Lets non-designers understand the UX impact of PRs.

---

## 11. Pattern libraries generated from live product

**What they do**

Instead of hand-writing a “design codex,” they:

1. Run through the app and copy all repeating UI chunks (cards, forms, modals, tables).
2. Paste them into the model with screenshots.
3. Ask:

> “Group these into component patterns. Name each pattern, describe when to use it, and list layout rules (max width, padding, etc). Suggest which ones should be merged or deleted.”

**Why it works**

* You get a bottom-up design system based on reality, not aspiration.
* It reveals duplication (“we have 4 slightly different list items”).

---

## 12. Quick & dirty task-based UX tests

**What they do**

Before building a full usability lab, they use AI to script tests:

> “Given this UI (HTML + screenshot), write 5 realistic tasks a user would try to complete, including expected success path. Make them short, concrete, and measurable.”

Then they run lo-fi tests with 2–3 friends/users and feed transcripts back:

> “Here are anonymized notes from 3 users. Summarize the top 5 UX issues and map each to the specific part of the UI to change.”

**Why it works**

* You skip month-long research cycles.
* The feedback is turned directly into design-change suggestions.

---

## 13. Opinionated layout recipes

**What they do**

They create a small set of layout “recipes” upfront:

* `Hero split`: left text, right image
* `Feature grid`: 3 cards, equal width
* `List + detail`: sidebar list, main content panel
* `Wizard`: 3-step vertical stack with progress bar

Prompt:

> “You may only use these layout recipes. For each section you propose, name the recipe you’re using and how you’re instantiating it.”

**Why it works**

* The app feels cohesive because everything is variations of a few patterns.
* It constrains AI from making random layouts.

---

If you want, next step could be: you tell me **one specific screen or flow** you’re working on (e.g. “SaaS dashboard overview” or “booking checkout”), and I’ll show you how to apply 4–5 of these plays to that exact case with concrete code.
