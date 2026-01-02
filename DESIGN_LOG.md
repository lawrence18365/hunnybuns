# Iteration 1
- Problems addressed: hero text/CTA overpowering on laptops, inconsistent spacing at 1200–1366px, single-column hero pushing imagery offscreen on mid devices, oversized cards/form fields, and uneven section grids.
- Changes (HTML/CSS): added hero container grid and tuned type/spacing tokens; refined header background; tightened hero media sizing and floating card; introduced laptop-friendly gap/padding; shifted packages/events/features to auto-fit grids with calmer padding; reduced form field sizes; eased feature min-height.
- Viewports targeted: 375, 600, 900, 1366, 1920.

# Iteration 2
- Problems addressed: full-bleed hero image left the above-the-fold story thin; CTA prominence and proof points lacked structure; readability over photography needed reinforcement across devices.
- Changes (HTML/CSS): replaced the collage block with a glassy hero panel featuring a badge, supporting copy, highlight chips, and dual CTAs; added a three-card meta grid for services/coverage/experience; layered gradients on the hero background for legibility; updated hero grid/padding to respect header height and flex between stacked (mobile) and split (desktop) layouts.
- Viewports targeted: intent for all bands, with emphasis on ≤480, 769–1024, and 1025–1440 for above-the-fold clarity.

# Current snapshot
- Hero now spans the viewport with a structured card overlay, clear CTA plus secondary link, and immediate proof points.
- Meta cards sit beside the headline on desktop and stack cleanly on tablets/phones.
- Background image remains full-bleed while gradients keep text contrast high.

# Future ideas
- Add a subtle scroll cue and micro-interaction on the hero CTA.
- Test a slim mobile sticky CTA for quick booking.

# Iteration 3
- Problems addressed: Primary CTA lacked the premium tactile treatment; sticky CTA felt generic and small on mobile; DM Sans lacked the heavier weight needed for the new sub-label.
- Changes (HTML/CSS): Added a reusable luxe `cta-pill` component with text stack and gold-pocket arrow; replaced the hero and sticky CTAs with the new pill (including compact variant); imported DM Sans 700; tuned sticky CTA stacking on small screens.
- Viewports targeted: Re-verified across 375, 600, 900, 1366, and 1920 with cache-busted loads to confirm the new CTA styling holds at each breakpoint.

# Iteration 4
- Problems addressed: Hero typography felt too aggressive in all-caps; header CTA lacked prominence; button shadows were overly heavy for a premium brand; contact section interest grid was unstable on small mobile devices.
- Changes (HTML/CSS): 
    - Switched Hero H1 to title case and refined weight/letter-spacing for an editorial feel.
    - Updated Header CTA with solid background and tactile hover state.
    - Softened shadows across all button variants for a more "enterprise-grade" aesthetic.
    - Replaced horizontal scroll in mobile contact grid with a stable 2-column layout.
    - Improved accessibility with refined focus-visible states.
- Viewports targeted: 375, 600, 900, 1366, 1920.

# Iteration 5
- Problems addressed: Standard CSS shapes (dots/borders) felt generic; lack of scroll-driven engagement in list-heavy sections; cards felt static.
- Changes (HTML/CSS/JS):
    - Replaced CSS dots with animated SVG "Olive Leaf" icons that draw on scroll.
    - Added an elegant SVG curve divider to soften the transition from Hero to Tagline.
    - Wrapped Process step numbers in SVG rings that fill when scrolled into view.
    - Enhanced `.package-card` and `.process-card` with premium hover lifts (transform/box-shadow).
    - Updated IntersectionObserver to trigger the new `.draw-on-scroll` class.
- Viewports targeted: All.

# Iteration 6
- Problems addressed: Flat/opaque sticky header felt rigid; reveal animations were too snappy/default; Tagline section lacked depth; Events section felt flat.
- Changes (HTML/CSS):
    - Implemented **Frosted Glass** header (backdrop-filter) for a modern, premium feel on scroll.
    - Slowed down image and text reveals to a **Cinematic 1.5s - 1.8s** duration for luxury timing.
    - Added a large **Decorative SVG** behind the Tagline text for editorial depth.
    - Applied a **Radial Gradient Mesh** to the Events section background for atmosphere.
- Viewports targeted: All.

# Current snapshot
- The site feels significantly more "expensive" with slower, deliberate animations.
- The sticky header integrates seamlessly with content.
- Visual hierarchy is supported by subtle background elements.

# Current snapshot
- Hero CTA now uses the high-end pill with embossed gold button and uppercase service line; sticky CTA matches in a compact form.
- DM Sans bold weight present to keep the sub-label crisp.
- CTA remains legible and tappable from small phone through large desktop.

# Iteration 7
- Problems addressed: Above-the-fold felt flat on wide screens, long copy lacked structure on mobile, header/nav crowded on smaller viewports, hero contrast depended too much on background image.
- Changes (HTML/CSS): added a hero kicker, highlight chips, secondary CTA, and service meta cards; introduced a glassy hero panel with layered gradients for contrast; tightened hero type scale and spacing; added responsive hero behavior for 600/900/1024/1200 widths; hid desktop nav and CTA on small screens to reduce clutter.
- Viewports targeted: 375, 600, 900, 1024, 1366, 1920.

# Iteration 8
- Problems addressed: Above-the-fold felt too busy with extra chips and a third service card.
- Changes (HTML): removed the hero highlight chips and the “Weekly meals” meta card to simplify the story.
- Viewports targeted: All.

# Iteration 9
- Problems addressed: Hero content felt constrained on 1920px screens; kicker line was no longer needed.
- Changes (HTML/CSS): removed the hero kicker line; expanded the hero container and panel max-widths for large and ultra-wide screens.
- Viewports targeted: 1920+.
