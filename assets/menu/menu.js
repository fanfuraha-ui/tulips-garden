/* Renders the Tulips Garden menu boards into any element with [data-tulips-menu] */
(function () {
  const M = window.TULIPS_MENU;
  if (!M) return;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

  const PH = M.photos || {};
  const DIR = "assets/menu/photos/";
  /* Food photo thumbnail; tapping it opens the large photo */
  const ph = (n, key = PH[n]) => key
    ? `<button type="button" class="tm-ph" data-lg="${DIR}${key}-lg.jpg" aria-label="See a photo of ${esc(n)}"><img src="${DIR}${key}.jpg" alt="${esc(n)}" width="360" height="360" loading="lazy" decoding="async"></button>`
    : `<span class="tm-ph none" aria-hidden="true"></span>`;

  const list = (rows, cls = "") => {
    const pics = rows.some(([n]) => PH[n]);
    return `<ul class="tm-list ${cls}${pics ? " has-ph" : ""}">${rows.map(([n, p, d]) =>
      `<li>${pics ? ph(n) : ""}<span class="n">${esc(n)}</span><span class="p">${esc(p)}</span>${d ? `<span class="d">${esc(d)}</span>` : ""}</li>`).join("")}</ul>`;
  };

  const head = (small, big, cls = "") => `<h3 class="tm-h ${cls}">${small ? `<small>${small}</small>` : ""}<b>${big}</b></h3>`;

  const swoosh1 = `<svg class="tm-swoosh" viewBox="0 0 297 210" preserveAspectRatio="none" aria-hidden="true">
    <defs><linearGradient id="tmr1" x1="0" x2="1"><stop offset="0" stop-color="#3a080b"/><stop offset=".45" stop-color="#7a1418"/><stop offset="1" stop-color="#4a0b0e"/></linearGradient></defs>
    <path d="M0 0H297V58C250 40 214 92 168 86 120 80 96 30 56 44 30 53 14 70 0 80Z" fill="url(#tmr1)" opacity=".9"/>
    <path d="M0 210V170C60 150 110 196 170 182 220 170 260 150 297 160V210Z" fill="#2a0607" opacity=".85"/>
  </svg>`;
  const swoosh2 = `<svg class="tm-swoosh" viewBox="0 0 297 210" preserveAspectRatio="none" aria-hidden="true">
    <defs><linearGradient id="tmr2" x1="0" x2="1"><stop offset="0" stop-color="#4a0b0e"/><stop offset=".5" stop-color="#7a1418"/><stop offset="1" stop-color="#3a080b"/></linearGradient></defs>
    <path d="M0 22C40 6 80 30 130 26 190 21 230 2 297 14V58C240 44 200 70 140 70 80 70 44 46 0 60Z" fill="url(#tmr2)" opacity=".85"/>
    <path d="M0 150C50 128 100 160 160 148 220 136 250 118 297 126V172C250 160 210 184 150 188 90 192 50 166 0 176Z" fill="url(#tmr2)" opacity=".55"/>
  </svg>`;

  const flame = `<svg class="tm-icon" viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="tmf" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#a8841f"/><stop offset="1" stop-color="#fff3c4"/></linearGradient></defs>
    <path d="M32 4c4 10 14 14 14 28a14 14 0 0 1-28 0c0-7 4-11 6-14 1 5 3 7 5 8-1-8 1-15 3-22z" fill="url(#tmf)"/>
    <path d="M32 30c3 4 6 6 6 11a6 6 0 0 1-12 0c0-3 2-5 3-6 0 2 1 3 2 3 0-3 0-5 1-8z" fill="#7a1418"/>
    <path d="M10 54h44M16 60h32" stroke="#d4af37" stroke-width="2.4" stroke-linecap="round"/></svg>`;
  const cup = `<svg class="tm-icon" viewBox="0 0 64 64" aria-hidden="true" fill="none" stroke="#d4af37" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M24 6c-3 4 3 6 0 10M32 4c-3 4 3 6 0 10M40 6c-3 4 3 6 0 10"/>
    <path d="M12 24h36v10a16 16 0 0 1-16 16h-4A16 16 0 0 1 12 34z" fill="rgba(122,20,24,.6)"/>
    <path d="M48 28h4a6 6 0 0 1 0 12h-5"/><path d="M8 56h48"/></svg>`;
  const pin = `<svg viewBox="0 0 24 24"><path d="M12 22s7-6.3 7-12a7 7 0 0 0-14 0c0 5.7 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>`;
  const music = `<svg viewBox="0 0 24 24"><path d="M14 3v11.5a3.5 3.5 0 1 1-3-3.46"/><path d="M14 3c.5 2.5 2.5 4.5 5 5"/></svg>`;

  const mains = `<table class="tm-table"><thead><tr><th>Item</th><th>Full / 1 kg</th><th>Half / ½ kg</th></tr></thead><tbody>${
    M.mains.map(([n, f, h, d]) => `<tr><td><div class="tm-cell">${ph(n)}<div><span class="n">${esc(n)}</span>${d ? `<span class="d">${esc(d)}</span>` : ""}</div></div></td><td class="p">${esc(f)}</td><td class="p${h ? "" : " e"}">${h ? esc(h) : "–"}</td></tr>`).join("")
  }</tbody></table>`;

  const platters = M.platters.map(p => `<div class="tm-platter${p.img ? " has-ph" : ""}">${p.img ? ph(p.n, p.img) : ""}<h4>${esc(p.n)}${p.sub ? `<span>${esc(p.sub)}</span>` : ""}</h4>
    <span class="price"><small>KSh</small> ${esc(p.p)}</span><p>${esc(p.d)}</p>${p.tag ? `<span class="tag">${esc(p.tag)}</span>` : ""}</div>`).join("");

  const board1 = `<article class="tm-board b1" aria-label="Tulips Garden menu, page 1">${swoosh1}
    <div class="tm-col">
      ${head("Grill &amp;", "Main Meals", "it")}
      <span class="tm-cur">All prices in KSh</span>
      ${mains}
      <p class="tm-foot">Served with your choice of accompaniment, see sides on the next page.</p>
    </div>
    <div class="tm-col">
      <div>${head("", "Plat<br>ters", "huge white")}</div>
      ${platters}
      <p class="tm-note">(${esc(M.platterNote)})</p>
      <div class="tm-contact">
        <div class="call"><small>Reservations, orders<br>&amp; events call</small><b>${esc(M.phone)}</b></div>
        <span class="ln">${pin}${esc(M.location)}</span>
        <span class="ln">${music}TikTok ${esc(M.tiktok)}</span>
      </div>
    </div>
    <div class="tm-col c-brand">
      <div class="tm-brand"><img src="assets/tulips-logo.png" alt="Tulips Garden" width="480" height="179"><span class="rule"></span><span class="menu-word">MENU</span></div>
      <div>${head("Morning", "Breakfast", "it")}${list(M.breakfast, "lead")}</div>
      <span class="tm-band">Dine · Relax · Celebrate</span>
    </div>
  </article>`;

  const board2 = `<article class="tm-board b2" aria-label="Tulips Garden menu, page 2">${swoosh2}
    <div class="tm-col">
      <div>${head("Hot", "Drinks", "it")}${list(M.hotDrinks)}</div>
      ${cup}
    </div>
    <div class="tm-col">
      <div>${head("Light", "Snacks", "it")}${list(M.snacks)}</div>
      <div>${head("Little", "Kiddies", "it")}${list(M.kids)}</div>
    </div>
    <div class="tm-col">
      <div>${head("Side", "Dishes", "it")}<p class="tm-sub">Starches</p>${list(M.starches)}</div>
    </div>
    <div class="tm-col">
      <div><p class="tm-sub tm-greens">Greens</p>${list(M.greens)}</div>
      ${flame}
      <p class="tm-foot">Prices in Kenya Shillings. Menu and prices may change, ask our team for today's specials.</p>
    </div>
    <div class="tm-strip">
      <img src="assets/tulips-logo.png" alt="" width="480" height="179">
      <div class="txt"><b>Celebrate with us</b><span>Baby showers, birthdays &amp; family gatherings, fully hosted. Garden dining · Swimming pool · Kids' play area</span></div>
      <div class="call"><small>Bookings &amp; events</small><b>${esc(M.phone)}</b></div>
      <div class="tm-qr"><img src="assets/menu/menu-qr.png" alt="QR code linking to the online menu" width="330" height="330"><div><b>Scan for our menu</b><span>Open it on your phone anytime</span></div></div>
    </div>
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
    const img = viewer.querySelector("img"), name = btn.dataset.cap || btn.querySelector("img").alt;
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

  window.renderTulipsMenu = el => { el.classList.add("tm"); el.innerHTML = board1 + board2; };
  document.querySelectorAll("[data-tulips-menu]").forEach(window.renderTulipsMenu);

  /* Food gallery: any element with [data-food-gallery] */
  document.querySelectorAll("[data-food-gallery]").forEach(el => {
    el.innerHTML = (M.gallery || []).map(([k, c]) =>
      `<button type="button" class="fg-tile" data-lg="${DIR}${k}-lg.jpg" data-cap="${esc(c)}" aria-label="See a larger photo: ${esc(c)}"><img src="${DIR}${k}-md.jpg" alt="${esc(c)}" loading="lazy" decoding="async"><span>${esc(c)}</span></button>`).join("");
  });
})();
