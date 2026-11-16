/* Renders the Tulips Garden menu boards (black & gold, with food photos) into any element with [data-tulips-menu].
   Used by the website's full-screen menu, menu.html and the printable PDF. Data: assets/menu/menu-data.js */
(function () {
  const M = window.TULIPS_MENU;
  if (!M) return;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const DIR = "assets/menu/photos/";
  const SP = M.sectionPhotos || {};
  const POS = M.photoPos || {};

  /* A framed food photo; tapping it opens the large photo */
  const tile = (k, name, o = {}) => {
    return `<button type="button" class="tm-tile${o.cls ? " " + o.cls : ""}" data-lg="${DIR}${k}-lg.jpg" data-cap="${esc(name)}" aria-label="See a larger photo of ${esc(name)}">
      <img src="${DIR}${k}${o.big ? "-lg" : o.small ? "" : "-md"}.jpg" alt="${esc(name)}" decoding="async"${POS[k] ? ` style="object-position:${POS[k]}"` : ""}>
    </button>`;
  };
  const photos = (list, cls = "") => list && list.length
    ? `<div class="tm-photos n${list.length} ${cls}">${list.map(([k, n]) => tile(k, n, { small: list.length > 2 })).join("")}</div>` : "";

  /* Price list with dotted gold leaders */
  const list = r => `<ul class="tm-list">${r.map(([n, p, d]) =>
    `<li><span class="n">${esc(n)}</span><i aria-hidden="true"></i><span class="p">${esc(p)}</span>${d ? `<span class="d">${esc(d)}</span>` : ""}</li>`).join("")}</ul>`;

  const orn = `<span class="tm-orn" aria-hidden="true"><i></i><svg viewBox="0 0 10 10"><path d="M5 0l5 5-5 5-5-5z"/></svg><i></i></span>`;
  const head = (small, big) => `<h3 class="tm-h">${small ? `<small>${small}</small>` : ""}<b>${big}</b></h3>${orn}`;
  const corner = c => `<svg class="tm-corner ${c}" viewBox="0 0 60 60" aria-hidden="true"><path d="M3 44V3h41" /><path d="M10 32V10h22" class="thin"/><path d="M8 3.5l4.5 4.5L8 12.5 3.5 8z" class="dia"/></svg>`;
  const frame = ["tl", "tr", "bl", "br"].map(corner).join("");

  const pin = `<svg viewBox="0 0 24 24"><path d="M12 22s7-6.3 7-12a7 7 0 0 0-14 0c0 5.7 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>`;
  const music = `<svg viewBox="0 0 24 24"><path d="M14 3v11.5a3.5 3.5 0 1 1-3-3.46"/><path d="M14 3c.5 2.5 2.5 4.5 5 5"/></svg>`;
  const phone = `<svg viewBox="0 0 24 24"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg>`;

  /* ---------- Page 1: platters + breakfast ---------- */
  const [quad, fam] = M.platters;
  /* "Beef portion, mbuzi portion & greens. Any 3 sides." -> list of contents + the sides line */
  const platterBody = p => {
    const [what, ...rest] = p.d.split(/\.\s*/).filter(Boolean);
    const items = what.split(/,\s*|\s+&\s+/).map(i => i.charAt(0).toUpperCase() + i.slice(1));
    return `<div class="tm-pbody"><h4>${esc(p.n)}${p.sub ? `<span>${esc(p.sub)}</span>` : ""}</h4>
    <span class="tm-price"><small>KSh</small> ${esc(p.p)}</span>
    <ul class="tm-inc">${items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
    <p class="tm-pside">${esc(rest.join(". "))}${rest.length ? "." : ""}</p>${p.tag ? `<span class="tag">${esc(p.tag)}</span>` : ""}</div>`;
  };

  const board1 = `<article class="tm-board b1" aria-label="Tulips Garden menu, page 1: platters and breakfast">${frame}
    <div class="tm-col">
      ${head("Share the feast", "Platters")}
      <div class="tm-platter"><span class="tm-ribbon">Signature</span>${platterBody(quad)}</div>
      <div class="tm-platter">${platterBody(fam)}</div>
      <p class="tm-note">${esc(M.platterNote)}</p>
    </div>
    <div class="tm-col">
      <div class="tm-brand"><img src="assets/tulips-logo.png" alt="Tulips Garden" width="480" height="179"><span class="menu-word">Menu</span><span class="tag">Dine · Relax · Celebrate</span></div>
      ${head("Morning", "Breakfast")}
      ${photos(SP.breakfast, "wide")}
      ${list(M.breakfast)}
      <div class="tm-callbar">${phone}<span><small>Orders, reservations &amp; events</small><b>${esc(M.phone)}</b></span></div>
    </div>
  </article>`;

  /* ---------- Page 2: grills & main meals ---------- */
  const mains = `<table class="tm-table"><thead><tr><th>Item</th><th>Full / 1 kg</th><th>Half / ½ kg</th></tr></thead><tbody>${
    M.mains.map(([n, f, h, d]) => `<tr><td><span class="n">${esc(n)}</span>${d ? `<span class="d">${esc(d)}</span>` : ""}</td><td class="p">${esc(f)}</td><td class="p${h ? "" : " e"}">${h ? esc(h) : "–"}</td></tr>`).join("")
  }</tbody></table>`;

  const board2 = `<article class="tm-board b2" aria-label="Tulips Garden menu, page 2: grills and main meals">${frame}
    <div class="tm-mosaic">${(SP.mains || []).map(([k, n]) => tile(k, n)).join("")}</div>
    <div class="tm-col">
      ${head("Grill &amp;", "Main Meals")}
      <span class="tm-cur">All prices in Kenya Shillings</span>
      ${mains}
      <div class="tm-box"><b>Make it a meal</b><span>Served with your choice of chips, sauté, wedges, ugali, rice or chapati. See sides on the next page.</span></div>
    </div>
  </article>`;

  /* ---------- Page 3: drinks, snacks, kids, sides ---------- */
  const board3 = `<article class="tm-board b3" aria-label="Tulips Garden menu, page 3: drinks, snacks, kids and sides">${frame}
    <div class="tm-col">${head("Hot", "Drinks")}${photos(SP.drinks)}${list(M.hotDrinks)}</div>
    <div class="tm-col">${head("Light", "Snacks")}${photos(SP.snacks)}${list(M.snacks)}</div>
    <div class="tm-col">${head("Little", "Kiddies")}${photos(SP.kids)}${list(M.kids)}</div>
    <div class="tm-col">${head("Side", "Dishes")}${photos(SP.sides)}<p class="tm-sub">Starches</p>${list(M.starches)}<p class="tm-sub">Greens</p>${list(M.greens)}</div>
    <div class="tm-strip">
      <img src="assets/tulips-logo.png" alt="" width="480" height="179">
      <div class="txt"><b>Celebrate with us</b><span>Baby showers, birthdays &amp; family gatherings, fully hosted. Garden dining · Swimming pool · Kids' play area</span>
        <span class="ln">${pin}${esc(M.location)}</span><span class="ln">${music}TikTok ${esc(M.tiktok)}</span></div>
      <div class="call"><small>Bookings &amp; events</small><b>${esc(M.phone)}</b></div>
      <div class="tm-qr"><img src="assets/menu/menu-qr.png" alt="QR code linking to the online menu" width="330" height="330"><div><b>Scan for our menu</b><span>Open it on your phone anytime</span></div></div>
    </div>
    <p class="tm-foot">Prices in Kenya Shillings. Menu and prices may change, ask our team for today's specials. Photos are for illustration.</p>
  </article>`;

  /* Photo viewer: one shared overlay, built the first time a photo is tapped */
  let viewer;
  const openPhoto = btn => {
    if (!viewer) {
      viewer = document.createElement("div");
      viewer.className = "tm-viewer";
      viewer.setAttribute("role", "dialog");
      viewer.setAttribute("aria-modal", "true");
      viewer.innerHTML = `<figure><img alt=""><figcaption></figcaption></figure><button type="button" class="tm-viewer-x" aria-label="Close photo">&times;</button>`;
      viewer.addEventListener("click", e => { if (e.target === viewer || e.target.closest(".tm-viewer-x")) closePhoto(); });
      document.body.appendChild(viewer);
    }
    const img = viewer.querySelector("img"), name = btn.dataset.cap || (btn.querySelector("img") || {}).alt || "";
    img.src = btn.dataset.lg; img.alt = name;
    viewer.querySelector("figcaption").textContent = name;
    viewer.setAttribute("aria-label", name);
    viewer.classList.add("open");
    viewer._from = btn;
    viewer.querySelector(".tm-viewer-x").focus();
  };
  const closePhoto = () => { if (!viewer) return; viewer.classList.remove("open"); viewer._from && viewer._from.focus(); };
  document.addEventListener("click", e => { const b = e.target.closest("[data-lg]"); if (b) { e.preventDefault(); e.stopPropagation(); openPhoto(b); } }, true);
  document.addEventListener("keydown", e => { if (e.key === "Escape" && viewer && viewer.classList.contains("open")) { e.stopImmediatePropagation(); closePhoto(); } }, true);

  window.renderTulipsMenu = el => { el.classList.add("tm"); el.innerHTML = board1 + board2 + board3; };
  document.querySelectorAll("[data-tulips-menu]").forEach(window.renderTulipsMenu);

  /* Food gallery: any element with [data-food-gallery] (website menu section) */
  document.querySelectorAll("[data-food-gallery]").forEach(el => {
    el.innerHTML = (M.gallery || []).map(([k, c]) =>
      `<button type="button" class="fg-tile" data-lg="${DIR}${k}-lg.jpg" data-cap="${esc(c)}" aria-label="See a larger photo: ${esc(c)}"><img src="${DIR}${k}-md.jpg" alt="${esc(c)}" loading="lazy" decoding="async"><span>${esc(c)}</span></button>`).join("");
  });
})();
