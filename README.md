# Blush Café — Café Website

## Industry
Restaurant / Café

## Design
Soft baby-pink aesthetic — light pink & cream background, deep rose/plum
for contrast text and dark sections, with a flower motif (inline SVG, no
image files needed) used as logo icon and decorative accent, matching the
same interactive structure as the Kadamba Kitchen build (reused and
reskinned to save time — same reveal/tilt animation system).

## Technologies Used
- HTML5, CSS3 (Flexbox & Grid, custom properties, full responsive design)
- JavaScript (vanilla) — all interactivity below
- Inline SVG for the flower logo/decoration

## Sections
Hero, Café Favourites, About, Menu, Weekly Special, Gallery, Reviews,
Location, Reservation, Contact, Footer.

## Interactive Features
1. Sticky navbar that changes on scroll
2. Mobile hamburger menu with slide-in panel
3. Scroll-triggered reveal animations (fade + slide, staggered on cards)
4. 3D mouse-tilt effect on the hero photo stack and favourite cards
5. Reviews slider -- auto-advances, with clickable dots
6. Gallery lightbox -- click any photo to view it enlarged
7. Reservation form validation with a success message
8. Back-to-top button

## Adding Real Photos
Image blocks are currently elegant colour-block placeholders with an emoji
(since copyrighted stock photos can't be embedded directly). To add real
ones: download free photos from unsplash.com or pexels.com (search "pink
latte", "cafe pastries", etc.), drop them in this folder, and replace a
placeholder like `<div class="img-block ib1"><span>coffee emoji</span></div>` with
`<img src="your-photo.jpg" class="img-block" alt="...">`.

## How to Run
Open `index.html` in VS Code -> right-click -> "Open with Live Server".

## Developer
Swatismita Parida -- Full-Stack Developer Intern, SuuSri AI
