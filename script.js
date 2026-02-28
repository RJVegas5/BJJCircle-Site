document.addEventListener("submit", (e) => {
  const form = e.target;
  if (!form.matches("[data-waitlist]")) return;

  e.preventDefault();

  const msg = form.querySelector("[data-success]");
  if (msg) {
    msg.style.display = "block";
    msg.textContent = "Thanks! We’ll notify you.";
  }

  form.reset();
});

/* =========================
   ENTER OVERLAY LOGIC (Index)
   - Enter button closes
   - Enter key closes
   - Locks scroll while open
   - Restores focus + scroll when closed
   ========================= */
(function () {
  const overlay = document.querySelector("[data-enter-overlay]");
  const enterBtn = document.querySelector("[data-enter-btn]");
  if (!overlay) return; // only runs on pages that have the overlay

  const HIDDEN_CLASS = "is-hidden";
  const FADE_MS = 520;

  const prevOverflow = document.documentElement.style.overflow;
  const prevBodyOverflow = document.body.style.overflow;

  // Lock scroll while overlay is visible
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";

  // Focus the Enter button for nice keyboard UX
  if (enterBtn) {
    // slight delay so it can focus after initial paint
    requestAnimationFrame(() => enterBtn.focus());
  }

  function closeOverlay() {
    if (overlay.classList.contains(HIDDEN_CLASS)) return;

    overlay.classList.add(HIDDEN_CLASS);

    // Restore scrolling immediately so it feels responsive
    document.documentElement.style.overflow = prevOverflow;
    document.body.style.overflow = prevBodyOverflow;

    // After fade, remove from layout so page is clickable
    window.setTimeout(() => {
      overlay.style.display = "none";
    }, FADE_MS);
  }

  if (enterBtn) enterBtn.addEventListener("click", closeOverlay);

  window.addEventListener("keydown", (e) => {
    if (overlay.classList.contains(HIDDEN_CLASS)) return;
    if (e.key === "Enter") {
      e.preventDefault();
      closeOverlay();
    }
  });
})();