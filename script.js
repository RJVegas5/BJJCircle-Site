// Waitlist success message (all pages)
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

// Enter overlay logic (index page only)
(function () {
  const overlay = document.querySelector("[data-enter-overlay]");
  const enterBtn = document.querySelector("[data-enter-btn]");
  if (!overlay) return;

  const KEY = "bjjcircle_entered_session";

  // Lock scroll while overlay is visible
  function lockScroll() {
    document.body.style.overflow = "hidden";
  }
  function unlockScroll() {
    document.body.style.overflow = "";
  }

  // Show once per tab session
  const alreadyEntered = sessionStorage.getItem(KEY) === "1";
  if (alreadyEntered) {
    overlay.style.display = "none";
    unlockScroll();
    return;
  }

  lockScroll();

  function closeOverlay() {
    sessionStorage.setItem(KEY, "1");
    overlay.classList.add("is-hidden");

    // After fade, fully remove and unlock scroll
    window.setTimeout(() => {
      overlay.style.display = "none";
      unlockScroll();
    }, 650);
  }

  if (enterBtn) enterBtn.addEventListener("click", closeOverlay);

  window.addEventListener("keydown", (e) => {
    if (overlay.classList.contains("is-hidden")) return;
    if (e.key === "Enter") closeOverlay();
  });
})();