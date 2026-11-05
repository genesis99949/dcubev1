// Calcar Finisaje · interactions. Everything works without the animation libraries;
// GSAP and Lenis only add motion, and only when the visitor has not asked for reduced motion.
(() => {
  const motionOk = matchMedia("(prefers-reduced-motion: no-preference)").matches;
  const hasGsap = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
  const animate = motionOk && hasGsap;
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  /* ---------- Smooth scroll (Lenis on GSAP's ticker so ScrollTrigger stays in sync) ---------- */
  if (animate && typeof window.Lenis !== "undefined") {
    const lenis = new Lenis({ anchors: true, lerp: 0.12 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* ---------- Before / after comparators ---------- */
  document.querySelectorAll("[data-compare]").forEach((el) => {
    const range = el.querySelector(".compare-range");
    const set = (v) => {
      el.style.setProperty("--pos", `${v}%`);
      range.value = String(Math.round(v));
      range.setAttribute("aria-valuetext", `${Math.round(100 - v)}% după, ${Math.round(v)}% înainte`);
    };
    range.addEventListener("input", () => set(Number(range.value)));
    set(Number(range.value));

    // The hero sweeps once when it is first seen, to show the divider can be dragged.
    if (animate && el.hasAttribute("data-intro")) {
      const state = { v: 50 };
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 80%", once: true }, onUpdate: () => set(state.v) });
      tl.to(state, { v: 78, duration: 0.9, ease: "power2.inOut", delay: 0.5 }).to(state, { v: 50, duration: 1.1, ease: "expo.out" });
      const stop = () => tl.kill();
      range.addEventListener("pointerdown", stop, { once: true });
      range.addEventListener("keydown", stop, { once: true });
    }
  });

  /* ---------- Project tabs ---------- */
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const select = (tab, focus) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
    if (focus) tab.focus();
    const panel = document.getElementById(tab.getAttribute("aria-controls"));
    if (animate) gsap.fromTo(panel.children, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.06 });
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => tab.getAttribute("aria-selected") !== "true" && select(tab));
    tab.addEventListener("keydown", (e) => {
      const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!dir) return;
      e.preventDefault();
      select(tabs[(i + dir + tabs.length) % tabs.length], true);
    });
  });

  /* ---------- Estimate ---------- */
  // Example labour rates (lei), fictional like every price on the page.
  const RATES = {
    walls: [115, 140], // glet + vopsea, per mp of floor (walls and ceilings)
    floors: [45, 60], // per mp of flooring (85% of the floor area)
    ceilings: [110, 140], // rigips, per mp (a quarter of the floor area)
    kitchen: [3500, 5000],
    bath: [9000, 12000],
  };
  const LABELS = {
    walls: "glet și vopsea",
    floors: "parchet sau SPC",
    ceilings: "tavane de rigips",
    kitchen: "faianță și instalații în bucătărie",
  };
  const form = document.getElementById("estimate");
  const $ = (id) => document.getElementById(id);
  const lei = (n) => `${n.toLocaleString("ro-RO")} lei`;
  const round = (n) => Math.round(n / 500) * 500;
  let baths = 1;
  const shown = { min: 0, max: 0 };
  let summary = "";

  const calc = () => {
    const area = Number(form.area.value);
    const reno = form.kind.value === "renovare";
    let min = 0;
    let max = 0;
    const add = ([a, b], q) => {
      min += a * q;
      max += b * q;
    };
    if (form.walls.checked) add(RATES.walls, area);
    if (form.floors.checked) add(RATES.floors, area * 0.85);
    if (form.ceilings.checked) add(RATES.ceilings, area * 0.25);
    if (form.kitchen.checked) add(RATES.kitchen, 1);
    add(RATES.bath, baths);
    if (reno) {
      min *= 1.2; // demolition, rubble and levelling old walls
      max *= 1.2;
    }
    min = round(min);
    max = round(max);
    const w = Math.max(1, Math.round(1.5 + area / 22 + baths * 0.6 + (reno ? 0.5 : 0)));

    $("area-out").textContent = `${area} mp`;
    form.area.style.setProperty("--fill", `${((area - 20) / 140) * 100}%`);
    $("baths-out").textContent = String(baths);
    form.querySelector('[data-baths="-1"]').disabled = baths === 0;
    form.querySelector('[data-baths="1"]').disabled = baths === 3;

    const empty = max === 0;
    $("result-range").hidden = empty;
    $("result-weeks").hidden = empty;
    $("result-empty").hidden = !empty;
    $("result-send").setAttribute("aria-disabled", String(empty));
    $("result-weeks").textContent = `Durată: ${w}–${w + 1} săptămâni`;

    // The figures tick to their new value instead of jumping.
    const write = () => {
      $("result-min").textContent = lei(round(shown.min));
      $("result-max").textContent = lei(round(shown.max));
    };
    if (animate && shown.max) gsap.to(shown, { min, max, duration: 0.6, ease: "power3.out", overwrite: true, onUpdate: write });
    else {
      shown.min = min;
      shown.max = max;
      write();
    }

    const picked = Object.keys(LABELS).filter((k) => form[k].checked).map((k) => LABELS[k]);
    if (baths) picked.push(baths === 1 ? "o baie" : `${baths} băi`);
    summary = `Estimare de pe site: ${area} mp, ${reno ? "apartament de renovat" : "apartament nou, la gri"}; ${picked.join(", ")}. Interval: ${lei(min)} – ${lei(max)}, ${w}–${w + 1} săptămâni.`;
  };

  if (form) {
    form.addEventListener("input", calc);
    form.querySelectorAll("[data-baths]").forEach((b) =>
      b.addEventListener("click", () => {
        baths = Math.min(3, Math.max(0, baths + Number(b.dataset.baths)));
        calc();
      }),
    );
    calc();
    // Carry the estimate into the contact form's message.
    $("result-send").addEventListener("click", () => {
      const msg = $("mesaj");
      msg.value = summary;
      $("suprafata").value = form.area.value;
      setTimeout(() => $("nume").focus({ preventScroll: true }), 900);
    });
  }

  /* ---------- FAQ: animate native <details> open/close ---------- */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const summaryEl = item.querySelector("summary");
    const answer = item.querySelector(".faq-answer");
    summaryEl.addEventListener("click", (e) => {
      if (!animate) return;
      e.preventDefault();
      gsap.killTweensOf(answer);
      if (item.open && !item.dataset.closing) {
        item.dataset.closing = "1";
        gsap.to(answer, { height: 0, opacity: 0, duration: 0.35, ease: "power2.inOut", onComplete: () => { item.open = false; delete item.dataset.closing; gsap.set(answer, { clearProps: "all" }); } });
      } else {
        delete item.dataset.closing;
        item.open = true;
        gsap.fromTo(answer, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.45, ease: "power3.out", clearProps: "all" });
      }
    });
  });

  /* ---------- Demo notices (fictional business: nothing is called or sent) ---------- */
  document.querySelectorAll('[data-demo="phone"]').forEach((b) =>
    b.addEventListener("click", () => {
      $("phone-notice").textContent = "Numărul 07xx xxx xxx e fictiv: acesta e un demo, nu poți suna sau scrie la el.";
    }),
  );
  document.querySelectorAll("[data-social]").forEach((b) =>
    b.addEventListener("click", () => {
      $("social-notice").textContent = `Contul de ${b.dataset.social} e fictiv: acesta e un demo.`;
    }),
  );
  $("contact-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    $("form-notice").textContent = "Acesta e un demo: cererea nu a fost trimisă nicăieri.";
  });

  /* ---------- Sample board: focusable only while it scrolls sideways ---------- */
  const board = document.querySelector(".board");
  const boardFocus = () => {
    if (board.scrollWidth > board.clientWidth + 1) board.setAttribute("tabindex", "0");
    else board.removeAttribute("tabindex");
  };
  boardFocus();
  addEventListener("resize", boardFocus);

  /* ---------- Scroll motion ---------- */
  if (!animate) return;

  // Slabs rise from the floor line one after another, like samples being set out.
  gsap.fromTo(
    ".slab",
    { clipPath: "inset(100% 0% 0% 0%)" },
    { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "expo.out", stagger: 0.09, clearProps: "clipPath", scrollTrigger: { trigger: ".board", start: "top 80%", once: true } },
  );


  // The six weeks play out as the chart scrolls through the viewport.
  gsap.from(".gantt-bar", {
    scaleX: 0,
    ease: "none",
    stagger: 0.35,
    scrollTrigger: { trigger: ".gantt", start: "top 75%", end: "bottom 55%", scrub: 0.6 },
  });

  // The team photo settles slightly slower than the page.
  gsap.fromTo(".process-photo img", { yPercent: -4, scale: 1.08 }, { yPercent: 4, scale: 1.08, ease: "none", scrollTrigger: { trigger: ".process", start: "top bottom", end: "bottom top", scrub: true } });
})();
