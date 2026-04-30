(function () {
  "use strict";

  // Year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu toggle
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("open");
      navToggle.classList.toggle("is-open", isOpen);
      navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });
    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (navLinks.classList.contains("open")) {
          navLinks.classList.remove("open");
          navToggle.classList.remove("is-open");
          navToggle.setAttribute("aria-label", "Open menu");
        }
      });
    });
  }

  // Toast helper
  var toastEl = document.getElementById("toast");
  var toastTimer;
  function showToast(message, isError) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.remove("error");
    if (isError) toastEl.classList.add("error");
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("show");
    }, 3500);
  }

  // Contact form (client-side only)
  var form = document.getElementById("contactForm");
  if (form) {
    var nameInput = form.querySelector("#name");
    var emailInput = form.querySelector("#email");
    var messageInput = form.querySelector("#message");
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function clearInvalid(el) {
      if (el) el.classList.remove("invalid");
    }
    [nameInput, emailInput, messageInput].forEach(function (el) {
      if (el)
        el.addEventListener("input", function () {
          clearInvalid(el);
        });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      if (!nameInput.value.trim()) {
        nameInput.classList.add("invalid");
        ok = false;
      }
      if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add("invalid");
        ok = false;
      }
      if (!messageInput.value.trim()) {
        messageInput.classList.add("invalid");
        ok = false;
      }

      if (!ok) {
        showToast(
          "Please fill out your name, a valid email, and a message.",
          true,
        );
        return;
      }
      showToast("Thanks for reaching out — we'll get back to you soon.");
      form.reset();
    });
  }

  // Reveal-on-scroll
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    // Fallback: just show everything
    revealEls.forEach(function (el) {
      el.classList.add("in");
    });
  }
})();
