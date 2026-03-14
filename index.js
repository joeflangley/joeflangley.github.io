/* ══════════════════════════════════════
   Joe Langley — index.js
══════════════════════════════════════ */

var hamburger           = document.getElementById("hamburger");
var mobileMenu          = document.getElementById("mobile-menu");
var mobileProjectsBtn   = document.getElementById("mobile-projects-toggle");
var mobileProjectsList  = document.getElementById("mobile-projects-list");

// ── Hamburger: open/close mobile menu ──────────────────────────────────────
if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", function () {
    var isOpen = mobileMenu.classList.toggle("open");
    var spans  = hamburger.querySelectorAll("span");
    if (isOpen) {
      spans[0].style.transform = "translateY(7px) rotate(45deg)";
      spans[1].style.opacity   = "0";
      spans[2].style.transform = "translateY(-7px) rotate(-45deg)";
    } else {
      spans[0].style.transform = "";
      spans[1].style.opacity   = "";
      spans[2].style.transform = "";
      if (mobileProjectsList) mobileProjectsList.classList.remove("open");
    }
  });
}

// ── Projects sub-menu toggle ────────────────────────────────────────────────
if (mobileProjectsBtn && mobileProjectsList) {
  mobileProjectsBtn.addEventListener("click", function () {
    mobileProjectsList.classList.toggle("open");
  });
}

// ── Active nav link (desktop nav) ───────────────────────────────────────────
var path = window.location.pathname;
document.querySelectorAll(".nav-link").forEach(function (link) {
  var href = link.getAttribute("href");
  if (href && (
    path.endsWith(href) ||
    (href === "./index.html" && (path === "/" || path.endsWith("index.html")))
  )) {
    link.classList.add("active");
  }
});
