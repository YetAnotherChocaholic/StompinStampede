(function () {
  const S = window.SITE || {};
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);
  const has = (v) => v !== undefined && v !== null && String(v).trim() !== "";
  const list = (v) => (Array.isArray(v) ? v : []);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- Simple text fields ---------- */
  $$("[data-field]").forEach((el) => {
    const v = S[el.dataset.field];
    if (has(v)) el.innerHTML = v;
    else el.hidden = true;
  });
  if (!has(S.city)) $$(".hero-meta .dot").forEach((d) => (d.hidden = true));
  if (has(S.eventName)) document.title = `${S.eventName} · ${S.tagline || ""} · ${S.dateText || ""}`.replace(/ · ( · )?$/, "");

  /* ---------- Links ---------- */
  const fb = has(S.facebookUrl) ? S.facebookUrl : null;
  [$("#fb-top"), ...$$("[data-facebook]")].forEach((a) => {
    if (fb) a.href = fb; else a.hidden = true;
  });
  $$("[data-register]").forEach((a) => {
    if (has(S.registerUrl)) a.href = S.registerUrl; else a.hidden = true;
  });

  /* ---------- Helpers ---------- */
  const fill = (id, items, render, wrapId) => {
    const el = document.getElementById(id);
    const arr = list(items);
    if (!arr.length) {
      (wrapId ? document.getElementById(wrapId) : el).hidden = true;
      return;
    }
    el.innerHTML = arr.map(render).join("");
  };
  const card = (title, body) => `<div class="card"><h3>${title}</h3>${body ? `<p>${body}</p>` : ""}</div>`;

  /* ---------- Home ---------- */
  fill("highlights", S.highlights, (h) => card(h.title, h.text));
  fill("announcements", S.announcements, (n) => `<li><time>${n.date || ""}</time><span>${n.text}</span></li>`, "announcements-wrap");

  /* ---------- Details ---------- */
  fill("facts", S.details, (d) => `<div><dt>${d.label}</dt><dd>${d.value}</dd></div>`);

  /* ---------- Schedule ---------- */
  fill("days", S.schedule, (d) => `
    <div class="day">
      <h3>${d.day}</h3>
      <ul>${list(d.items).map((i) => `<li><span class="time">${i.time || ""}</span><span>${i.title}</span></li>`).join("")}</ul>
    </div>`);

  /* ---------- Competition ---------- */
  fill("divisions", S.divisions, (d) => card(d.name, d.description));
  fill("rules", S.rules, (r) => `<li>${r}</li>`);

  /* ---------- Registration ---------- */
  fill("fees", S.fees, (f) => `<tr><td>${f.item}</td><td>${f.price}</td></tr>`);
  fill("deadlines", S.deadlines, (d) => `<tr><td>${d.label}</td><td>${d.date}</td></tr>`);

  /* ---------- Venue ---------- */
  if (has(S.venueAddress)) {
    const q = encodeURIComponent(`${S.venueName || ""} ${S.venueAddress}`.trim());
    const map = $("#map");
    map.innerHTML = `<iframe title="Map to venue" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
      src="https://maps.google.com/maps?q=${q}&output=embed"></iframe>`;
    map.hidden = false;
    const addr = $(".address");
    addr.innerHTML = `${S.venueAddress} · <a href="https://www.google.com/maps/search/?api=1&query=${q}" target="_blank" rel="noopener">Get directions</a>`;
  }
  fill("hotels", S.hotels, (h) =>
    card(h.name, `${h.details || ""}${h.url ? `<br><a href="${esc(h.url)}" target="_blank" rel="noopener">Book a room →</a>` : ""}`),
    "hotels-wrap");

  /* ---------- FAQ ---------- */
  fill("faq-list", S.faq, (f) => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`);

  /* ---------- Contact ---------- */
  const contacts = [];
  if (has(S.contactEmail)) contacts.push(card("Email", `<a href="mailto:${esc(S.contactEmail)}">${S.contactEmail}</a>`));
  if (has(S.contactPhone)) contacts.push(card("Phone", `<a href="tel:${esc(S.contactPhone.replace(/[^\d+]/g, ""))}">${S.contactPhone}</a>`));
  if (fb) contacts.push(card("Facebook", `<a href="${esc(fb)}" target="_blank" rel="noopener">Follow us for the latest updates →</a>`));
  $("#contact-cards").innerHTML = contacts.join("");

  /* ---------- Countdown ---------- */
  if (has(S.startDate)) {
    const target = new Date(S.startDate + "T09:00:00");
    const el = $("#countdown");
    const tick = () => {
      const ms = target - new Date();
      if (isNaN(ms) || ms <= 0) { el.hidden = true; return; }
      const d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60;
      el.innerHTML = [[d, "Days"], [h, "Hours"], [m, "Mins"]]
        .map(([n, l]) => `<div><strong>${n}</strong><span>${l}</span></div>`).join("");
      el.hidden = false;
    };
    tick();
    setInterval(tick, 30000);
  }

  /* ---------- Tabs ---------- */
  const tabs = [...$$("[role=tab]")];
  const ids = tabs.map((t) => t.dataset.tab);

  function show(id, focus) {
    if (!ids.includes(id)) id = "home";
    tabs.forEach((t) => {
      const on = t.dataset.tab === id;
      t.setAttribute("aria-selected", on);
      t.tabIndex = on ? 0 : -1;
      if (on) {
        t.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
        if (focus) t.focus();
      }
    });
    $$("[role=tabpanel]").forEach((p) => (p.hidden = p.id !== id));
  }

  tabs.forEach((t, i) => {
    t.id = "tab-" + t.dataset.tab;
    t.setAttribute("aria-controls", t.dataset.tab);
    document.getElementById(t.dataset.tab).setAttribute("aria-labelledby", t.id);
    t.addEventListener("click", () => {
      history.replaceState(null, "", "#" + t.dataset.tab);
      show(t.dataset.tab);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    t.addEventListener("keydown", (e) => {
      const dir = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (!dir) return;
      e.preventDefault();
      const next = tabs[(i + dir + tabs.length) % tabs.length];
      history.replaceState(null, "", "#" + next.dataset.tab);
      show(next.dataset.tab, true);
    });
  });

  $$("[data-tab-link]").forEach((a) =>
    a.addEventListener("click", (e) => {
      e.preventDefault();
      history.replaceState(null, "", "#" + a.dataset.tabLink);
      show(a.dataset.tabLink);
      window.scrollTo({ top: 0, behavior: "smooth" });
    })
  );

  window.addEventListener("hashchange", () => show(location.hash.slice(1)));
  show(location.hash.slice(1));
})();
