# Tulips Garden — Website

Single-page website for **Tulips Garden**, a garden restaurant, pool and events venue opposite Shell Petrol Station, Gikambura, Kikuyu, Kenya.

- Bookings / RSVP: 0717 333 300
- TikTok: [@tulipsgarden6](https://www.tiktok.com/@tulipsgarden6)

## Stack
One self-contained `index.html` (HTML, CSS, vanilla JS). No build step.

## Editing
All business details live in the `CONFIG` object at the top of the main `<script>`:
- `phone`, `whatsapp`, `email`, `hours`, `swimSchedule`, `swimFees`
- `videos` — TikTok video IDs per section
- `menu` — menu items and prices (currently placeholders)
- `embedMode` — set to `true` on the live domain so each video card plays the TikTok video in place

Reservation time slots are in the `SLOTS` object in the reservation script.

## Deploy
Upload `index.html` to any static host (Netlify, Vercel, GitHub Pages, cPanel).
