/* =========================================================
   NEON RIDE · COCKTAIL CLUB · ARCADE EDITION
   Alpine.js component + Motion One reveal animations
   ========================================================= */

window.neonRideApp = function neonRideApp() {
  return {
    year: new Date().getFullYear(),
    init() {
      this.$nextTick(() => {
        bootMotion();
      });
    },
  };
};

function bootMotion() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  const mo = window.Motion;
  if (!mo || typeof mo.animate !== "function") return;

  const { animate, inView, stagger } = mo;

  // Reveal on scroll: titles + cards
  const reveal = (selector, options = {}) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      inView(
        el,
        () => {
          animate(
            el,
            { opacity: [0, 1], transform: ["translateY(24px)", "translateY(0)"] },
            { duration: 0.7, easing: "ease-out", ...options }
          );
        },
        { amount: 0.2 }
      );
    });
  };

  reveal(".section-head");
  reveal(".about-card");
  reveal(".press-card");
  reveal(".collab-card");
  reveal(".collab-cta");
  reveal(".contact-card");
  reveal(".contact-arcade");

  // Menu cards: staggered reveal
  const menuCards = document.querySelectorAll(".menu-card");
  if (menuCards.length) {
    menuCards.forEach((c) => {
      c.style.opacity = "0";
      c.style.transform = "translateY(20px)";
    });
    inView(
      ".menu-grid",
      () => {
        animate(
          ".menu-card",
          { opacity: [0, 1], transform: ["translateY(20px)", "translateY(0)"] },
          { duration: 0.5, delay: stagger(0.08), easing: "ease-out" }
        );
      },
      { amount: 0.15 }
    );
  }

  // Hero pulse on CTA
  const cta = document.querySelector('.hero-cta[data-motion="pulse"]');
  if (cta) {
    animate(
      cta,
      { transform: ["scale(1)", "scale(1.04)", "scale(1)"] },
      { duration: 1.8, repeat: Infinity, easing: "ease-in-out" }
    );
  }

  // Konami easter egg → flash screen pink
  const code = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
  let idx = 0;
  window.addEventListener("keydown", (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    idx = key === code[idx] ? idx + 1 : 0;
    if (idx === code.length) {
      idx = 0;
      const flash = document.createElement("div");
      flash.style.cssText = "position:fixed;inset:0;background:#ff1493;z-index:9998;mix-blend-mode:screen;pointer-events:none;";
      document.body.appendChild(flash);
      animate(flash, { opacity: [0.8, 0] }, { duration: 0.9 }).finished.then(() => flash.remove());
    }
  });
}
