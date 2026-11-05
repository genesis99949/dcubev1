// Bârsan Auto · interactions. Everything works without the animation libraries;
// GSAP and Lenis only add motion, and only when the visitor has not asked for reduced motion.
(() => {
  const motionOk = matchMedia("(prefers-reduced-motion: no-preference)").matches;
  const hasGsap = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
  const animate = motionOk && hasGsap;
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);
  const $ = (id) => document.getElementById(id);

  let lenis;
  if (animate && typeof window.Lenis !== "undefined") {
    lenis = new Lenis({ anchors: true, lerp: 0.12 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* ---------- Booking: next six working days, slots per day ---------- */
  const DAY = ["duminică", "luni", "marți", "miercuri", "joi", "vineri", "sâmbătă"];
  const SHORT = ["Dum", "Lun", "Mar", "Mie", "Joi", "Vin", "Sâm"];
  const MONTH = ["ian.", "feb.", "mar.", "apr.", "mai", "iun.", "iul.", "aug.", "sept.", "oct.", "nov.", "dec."];
  const WEEK_SLOTS = ["8:00", "9:30", "11:00", "13:30", "15:00", "16:30"];
  const SAT_SLOTS = ["9:00", "10:30", "12:00"];
  const form = $("programare");
  const daysEl = $("days");
  const slotsEl = $("slots");

  const days = [];
  for (let d = new Date(), n = 0; days.length < 6 && n < 14; n++) {
    d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
    if (d.getDay() !== 0) days.push(d);
  }
  // Demo occupancy: the same slots look taken on every visit for a given date.
  const taken = (date, slot) => (date.getDate() * 7 + slot.length * 13 + parseInt(slot, 10) * 3) % 4 === 0;

  daysEl.innerHTML = days
    .map(
      (d, i) =>
        `<label class="day"><input type="radio" name="day" value="${i}"${i === 0 ? " checked" : ""}><span>${SHORT[d.getDay()]}<small>${d.getDate()} ${MONTH[d.getMonth()]}</small></span></label>`,
    )
    .join("");

  const renderSlots = () => {
    const d = days[Number(form.day.value)];
    const list = d.getDay() === 6 ? SAT_SLOTS : WEEK_SLOTS;
    const first = list.findIndex((s) => !taken(d, s));
    slotsEl.innerHTML = list
      .map((s, i) => {
        const off = taken(d, s);
        return `<label class="slot"><input type="radio" name="slot" value="${s}"${off ? " disabled" : ""}${i === first ? " checked" : ""}><span>${s}${off ? '<span class="sr-only"> (ocupat)</span>' : ""}</span></label>`;
      })
      .join("");
  };

  const summarize = () => {
    const d = days[Number(form.day.value)];
    const slot = form.querySelector('input[name="slot"]:checked');
    $("summary").textContent = slot
      ? `${form.service.value}, ${DAY[d.getDay()]} ${d.getDate()} ${MONTH[d.getMonth()]}, la ${slot.value}.`
      : "Ziua asta e plină. Alege altă zi.";
    form.querySelector(".booking-submit").disabled = !slot;
  };

  renderSlots();
  summarize();
  form.addEventListener("change", (e) => {
    if (e.target.name === "day") renderSlots();
    summarize();
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    $("booking-notice").textContent = "Acesta e un demo: programarea nu a fost trimisă. La un service real primești confirmarea prin SMS.";
  });

  // Price board rows pre-select the service and bring the visitor back to the booking form.
  document.querySelectorAll("[data-book]").forEach((b) =>
    b.addEventListener("click", () => {
      const radio = form.querySelector(`input[name="service"][value="${b.dataset.book}"]`);
      if (radio) radio.checked = true;
      summarize();
      if (lenis) lenis.scrollTo(form, { offset: -24 });
      else form.scrollIntoView({ behavior: motionOk ? "smooth" : "auto" });
      setTimeout(() => radio?.focus({ preventScroll: true }), 900);
      if (animate) gsap.fromTo(form, { boxShadow: "0 0 0 0 rgba(242,183,5,0.9)" }, { boxShadow: "0 0 0 14px rgba(242,183,5,0)", duration: 1.2, delay: 0.7, ease: "power2.out", clearProps: "boxShadow" });
    }),
  );

  /* ---------- Job card: approved lines add up ---------- */
  const card = $("jobcard");
  const boxes = [...card.querySelectorAll('input[type="checkbox"]')];
  const lei = (n) => `${Math.round(n).toLocaleString("ro-RO")} lei`;
  const shown = { v: 0 };
  const total = () => {
    const sum = boxes.filter((b) => b.checked).reduce((s, b) => s + Number(b.dataset.price), 0);
    const count = boxes.filter((b) => b.checked).length;
    $("approved").textContent = `${count} din ${boxes.length} linii`;
    const write = () => ($("total").textContent = lei(shown.v));
    if (animate && shown.v) gsap.to(shown, { v: sum, duration: 0.5, ease: "power3.out", overwrite: true, onUpdate: write });
    else {
      shown.v = sum;
      write();
    }
  };
  card.addEventListener("change", total);
  total();
  card.addEventListener("submit", (e) => {
    e.preventDefault();
    $("card-notice").textContent = "Demo: aprobarea nu pleacă nicăieri. La un client real, mecanicul o primește pe WhatsApp.";
  });

  /* ---------- FAQ: animate native <details> ---------- */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const answer = item.querySelector(".faq-answer");
    item.querySelector("summary").addEventListener("click", (e) => {
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

  /* ---------- Demo notices ---------- */
  document.querySelectorAll('[data-demo="phone"]').forEach((b) =>
    b.addEventListener("click", () => ($("phone-notice").textContent = "Numărul 07xx xxx xxx e fictiv: acesta e un demo.")),
  );
  document.querySelectorAll("[data-social]").forEach((b) =>
    b.addEventListener("click", () => ($("social-notice").textContent = `Contul de ${b.dataset.social} e fictiv: acesta e un demo.`)),
  );
  $("contact-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    $("form-notice").textContent = "Acesta e un demo: mesajul nu a fost trimis nicăieri.";
  });

  if (!animate) return;

  /* ---------- Motion ---------- */
  // The workshop photo rises like a car on the lift as it scrolls in.
  gsap.fromTo(".band-media img", { yPercent: 8, scale: 1.1 }, { yPercent: -4, scale: 1.1, ease: "none", scrollTrigger: { trigger: ".band", start: "top bottom", end: "bottom top", scrub: true } });

  // Job card lines are written in one by one, like a mechanic filling the form.
  gsap.from(".line", { opacity: 0, x: 18, duration: 0.5, ease: "power3.out", stagger: 0.08, scrollTrigger: { trigger: ".card", start: "top 75%", once: true } });

  // Price board rows flip in like a departures board.
  gsap.from(".board tbody tr", { opacity: 0, rotateX: -70, transformOrigin: "50% 0%", duration: 0.6, ease: "power3.out", stagger: 0.06, scrollTrigger: { trigger: ".board", start: "top 80%", once: true } });

  // Clock times tick into place.
  gsap.utils.toArray(".clock-row").forEach((row) =>
    gsap.from(row.querySelector(".clock-time"), { yPercent: 60, opacity: 0, duration: 0.7, ease: "expo.out", scrollTrigger: { trigger: row, start: "top 85%", once: true } }),
  );
})();
