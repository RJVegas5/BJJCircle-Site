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