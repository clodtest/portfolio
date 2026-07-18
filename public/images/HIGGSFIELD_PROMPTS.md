# Higgsfield (Seedance 2.0) Asset Prompts

The Higgsfield MCP connector was not available when the site was scaffolded, so
every image in this folder is a labeled SVG placeholder. Regenerate each asset
with **Seedance 2.0**, save it under the target filename below, then update the
matching path in `lib/hero-slides.ts` and `lib/listings.json` (`.svg` → `.jpg`).

Global style keywords for every generation (keeps the set cohesive):
`photorealistic, natural daylight, warm color grading, real estate photography, 16:9 landscape (heroes) / 4:3 (listing shots), well-lit, welcoming`

## Hero images (1600×900, 16:9)

| Target file | Prompt |
|---|---|
| `hero-luxury.jpg` | Photorealistic exterior of an elegant modern luxury home, warm golden-hour lighting, manicured landscaping, wide front lawn, welcoming (not cold or sterile), architectural photography style |
| `hero-family-home.jpg` | Photorealistic suburban two-story family home, classic American architecture, well-kept yard, driveway, bright midday light, warm and inviting curb appeal |
| `hero-new-construction.jpg` | Photorealistic newly built affordable single-family home, modern minimal design, clean lines, small landscaped yard, bright and fresh, entry-level real estate photography |
| `hero-beach-house.jpg` | Photorealistic coastal beach house on stilts, weathered wood and light blue siding, ocean visible in background, blue sky, late afternoon light |
| `hero-starter-home.jpg` | Photorealistic cozy starter home or townhouse, tidy small front porch, friendly and approachable curb appeal, soft natural light |

## Listing photos (`listings/`, 800×600, 4:3)

Generate 4 shots per style — exterior, kitchen, living room, second exterior —
reusing the matching hero prompt above plus one of these suffixes:

- `-1` (exterior): "…, exterior curb view"
- `-2` (kitchen): "…, bright modern kitchen interior matching the home's style, natural window light"
- `-3` (living room): "…, warm inviting living room interior matching the home's style, natural window light"
- `-4` (exterior detail): "…, exterior detail of entry and porch"

Styles map to hero prompts: `luxury`, `family` (family home), `newbuild`
(new construction), `coastal` (beach house), `starter` (starter home).
