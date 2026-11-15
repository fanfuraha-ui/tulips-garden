# Tulips Garden — Website

Single-page website for **Tulips Garden**, a garden restaurant, pool and events venue opposite Shell Petrol Station, Gikambura, Kikuyu, Kenya.

- Bookings / RSVP: 0717 333 300
- TikTok: [@tulipsgarden6](https://www.tiktok.com/@tulipsgarden6)

## Stack
One self-contained `index.html` (HTML, CSS, vanilla JS). No build step.

## Editing
All business details live in the `CONFIG` object at the top of the main `<script>`:
- `phone`, `whatsapp`, `instagram` (fill in the handle to show the Instagram link)
- `videos` — TikTok video IDs per section
- `embedMode` — set to `true` on the live domain so each video card plays the TikTok video in place

Reservation time slots are in the `SLOTS` object in the reservation script.

## Deploy
Upload `index.html` to any static host (Netlify, Vercel, GitHub Pages, cPanel).

## Menu (website, full-screen page, PDF and QR code)
- **Edit prices and items in one place:** `assets/menu/menu-data.js`. The website menu section and `menu.html` both read from it.
- `menu.html` is the full-screen menu page. The QR code opens it.
- After changing the menu, rebuild the PDF and QR code:
  ```
  python3 tools/build_menu.py
  python3 tools/build_menu.py --url https://your-domain.co.ke/menu.html   # if the site moves to its own domain
  ```
  This writes `assets/menu/tulips-garden-menu.pdf`, `menu-qr.png` and `menu-qr.svg`, and checks that the QR code scans.
- Fonts (Lora, Poppins; SIL Open Font License) are bundled in `assets/fonts/` so the PDF and the website match.
