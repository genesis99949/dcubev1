// Andrei Dobre · interactions. Everything works without the animation libraries;
// GSAP and Lenis only add motion, and only when the visitor has not asked for reduced motion.
(() => {
  const motionOk = matchMedia("(prefers-reduced-motion: no-preference)").matches;
  const hasGsap = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
  const animate = motionOk && hasGsap;
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);
  const $ = (id) => document.getElementById(id);

  if (animate && typeof window.Lenis !== "undefined") {
    const lenis = new Lenis({ anchors: true, lerp: 0.12 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* ---------- Panel: pick the problem, read what to do ---------- */
  const PROBLEMS = {
    siguranta: {
      urgency: "Urgent azi, dacă e circuitul frigiderului sau al centralei",
      now: "Scoate din priză aparatele de pe circuitul respectiv și ridică siguranța. Dacă sare din nou imediat, las-o jos și sună-mă.",
      me: "Caut aparatul sau firul cu defect, circuit cu circuit, cu aparatul de măsură.",
      time: "1–2 ore",
      price: "de la 150 lei",
    },
    camera: {
      urgency: "Poate aștepta până mâine, dacă restul casei are curent",
      now: "Uită-te în tablou dacă e vreo siguranță jos sau dacă a sărit diferențialul. Nu desface prize.",
      me: "Găsesc legătura slăbită; de cele mai multe ori e o doză arsă în spatele unei prize.",
      time: "1–3 ore",
      price: "de la 180 lei",
    },
    priza: {
      urgency: "Urgent azi: o priză arsă poate lua foc din nou",
      now: "Nu mai folosi priza. Dacă vezi urme negre sau simți miros de ars, oprește siguranța circuitului.",
      me: "Schimb priza și verific firele din doză; dacă sunt topite, refac legătura.",
      time: "30–60 de minute",
      price: "de la 90 lei / priză",
    },
    apa: {
      urgency: "Imediat, mai ales dacă udă la vecinul de jos",
      now: "Închide robinetul de pe coloana apartamentului, de obicei lângă apometre, și pune un prosop sub scurgere.",
      me: "Schimb garnitura, racordul sau robinetul defect. Dacă e o țeavă în perete, deschid cât mai puțin.",
      time: "1–2 ore",
      price: "de la 150 lei",
    },
    boiler: {
      urgency: "Se poate programa în 1–2 zile",
      now: "Verifică siguranța boilerului în tablou și dacă termostatul nu e dat la minimum.",
      me: "Măsor rezistența și termostatul, le schimb dacă sunt arse și curăț calcarul.",
      time: "1–2 ore",
      price: "de la 200 lei, plus piesele",
    },
    scurgere: {
      urgency: "Azi sau mâine, după cât de tare te încurcă",
      now: "Nu turna soluții cu acid: pot strica sifonul de plastic. Încearcă un desfundător cu ventuză.",
      me: "Desfund mecanic, cu spirala, de la sifon până la coloană.",
      time: "45–90 de minute",
      price: "de la 150 lei",
    },
  };

  const breakers = [...document.querySelectorAll(".breaker")];
  const pick = (b, focus) => {
    breakers.forEach((x) => {
      x.setAttribute("aria-checked", String(x === b));
      x.tabIndex = x === b ? 0 : -1;
    });
    if (focus) b.focus();
    const p = PROBLEMS[b.dataset.problem];
    $("answer-empty").hidden = true;
    $("answer-body").hidden = false;
    $("a-urgency").textContent = p.urgency;
    $("a-now").textContent = p.now;
    $("a-me").textContent = p.me;
    $("a-time").textContent = p.time;
    $("a-price").textContent = p.price;
    const problem = $("problema");
    if (problem) problem.selectedIndex = Object.keys(PROBLEMS).indexOf(b.dataset.problem);
    if (animate) gsap.fromTo("#answer-body > *", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out", stagger: 0.05 });
  };
  breakers.forEach((b, i) => {
    b.tabIndex = i === 0 ? 0 : -1;
    b.addEventListener("click", () => pick(b));
    // Radio-group keys: arrows move and pick.
    b.addEventListener("keydown", (e) => {
      const dir = ["ArrowRight", "ArrowDown"].includes(e.key) ? 1 : ["ArrowLeft", "ArrowUp"].includes(e.key) ? -1 : 0;
      if (!dir) return;
      e.preventDefault();
      pick(breakers[(i + dir + breakers.length) % breakers.length], true);
    });
  });

  /* ---------- Demo notices (fictional person: nothing is called or sent) ---------- */
  const toast = $("toast");
  let hide;
  const say = (text) => {
    toast.textContent = text;
    toast.classList.add("show");
    clearTimeout(hide);
    hide = setTimeout(() => toast.classList.remove("show"), 4200);
  };
  document.querySelectorAll("[data-demo]").forEach((b) =>
    b.addEventListener("click", () =>
      say(b.dataset.demo === "whatsapp" ? "Demo: WhatsApp-ul de pe 07xx xxx xxx e fictiv, mesajul nu pleacă nicăieri." : "Demo: numărul 07xx xxx xxx e fictiv, nu poți suna la el."),
    ),
  );
  document.querySelectorAll("[data-social]").forEach((b) =>
    b.addEventListener("click", () => {
      $("social-notice").textContent = `Contul de ${b.dataset.social} e fictiv: acesta e un demo.`;
    }),
  );
  $("contact-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    $("form-notice").textContent = "Acesta e un demo: mesajul și poza nu au fost trimise nicăieri.";
  });

  if (!animate) return;

  /* ---------- Hero: breakers drop into the rail one by one ---------- */
  gsap.from(".breaker", { y: -18, opacity: 0, duration: 0.6, ease: "expo.out", stagger: 0.06, delay: 0.2 });

  /* ---------- Zone diagram: the feed draws down, each branch closes as it is reached ---------- */
  const feed = document.querySelector(".feed");
  const branches = gsap.utils.toArray(".branch");
  gsap.set(feed, { "--draw": 0 });
  gsap.set(branches, { "--on": 0 });
  const tl = gsap.timeline({ scrollTrigger: { trigger: feed, start: "top 75%", end: "bottom 60%", scrub: 0.6 } });
  tl.to(feed, { "--draw": 1, ease: "none", duration: branches.length });
  branches.forEach((b, i) => tl.to(b, { "--on": 1, ease: "power2.out", duration: 0.5 }, i + 0.2));

  /* ---------- Tariff rows and proofs settle in ---------- */
  gsap.utils.toArray(".tariff tbody").forEach((body) =>
    gsap.from(body.children, { opacity: 0, x: -12, duration: 0.5, ease: "power3.out", stagger: 0.05, scrollTrigger: { trigger: body, start: "top 85%", once: true } }),
  );
  gsap.utils.toArray(".proof-media img, .band-media img").forEach((img) =>
    gsap.fromTo(img, { scale: 1.12 }, { scale: 1, ease: "none", scrollTrigger: { trigger: img.closest(".media"), start: "top bottom", end: "bottom top", scrub: true } }),
  );
})();
