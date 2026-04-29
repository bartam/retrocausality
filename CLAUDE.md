# Presentation — "Time Does Not Exist"

A pure HTML/CSS/JS slideshow on retrocausality — the idea that the future can influence the past.

## Topic & Tone

- Retrocausality presented as esoteric, almost occult knowledge
- Tone: mysterious, reverent, building from scholarly to arcane
- Visually stunning — use JS animations, glowing effects, anything that feels otherworldly

## Design System

- **Palette**: Deep black (#0a0a0f), aged gold (#c9a84c), mystic purple (#4a3f6b), parchment text (#d4c5a9)
- **Fonts**: Cinzel (display/headings — carved, ancient feel), Cormorant Garamond (body — elegant serif)
- **Transitions**: Slow vertical fade between slides
- **Decorative motifs**: Rotating sigils, gradient dividers with diamond centers, pulsing glow effects
- **Imagery**: Should feel like forbidden diagrams, occult manuscripts, physics rendered as ritual

## Structure

- `index.html` — shell that loads styles, scripts, and slides
- `styles.css` — all styling
- `slides.js` — slide loader and navigation logic
- `slides/` — individual slide files (HTML fragments)
- `slides/manifest.json` — controls slide order
- `assets/` — images and media

## Adding Slides

1. Create an HTML file in `slides/` with just the inner content (no `<section>` wrapper)
2. Add the filename to `slides/manifest.json` in the desired position

## Available CSS Classes

- `.accent` — gold accent text
- `.mystic` — purple accent text
- `.glow` — pulsing gold glow animation on text
- `.divider` — gradient line with diamond center
- `.sigil` — rotating circle decoration
- `.subtitle` — italic serif subtitle
- `.invocation` — left-bordered quote/proclamation block
- `.bullets` — styled list with diamond markers
- `.columns` — two-column side-by-side layout
- `.img-caption` — italic caption below images
- `.small` (on `img`) — smaller image
- `.full-width` (on `img`) — edge-to-edge image
- Syntax highlighting: `.keyword`, `.string`, `.comment`, `.func`

## Hosting

Hosted via GitHub Pages from the main branch.

For local development:

```
python3 -m http.server 8000
```
