/* ══════════════════════════════════════
   Joe Langley — index.js
══════════════════════════════════════ */

// ── Hamburger menu ──────────────────────────────────────────────────────────
const hamburger        = document.getElementById("hamburger");
const topnav           = document.querySelector(".topnav");
const projectsToggle   = document.getElementById("projects-toggle");
const projectsDropdown = document.getElementById("projects-dropdown");

if (hamburger && topnav) {
  hamburger.addEventListener("click", function() {
    var isOpen = topnav.classList.toggle("mobile-open");
    var spans = hamburger.querySelectorAll("span");
    if (isOpen) {
      spans[0].style.transform = "translateY(6.5px) rotate(45deg)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "translateY(-6.5px) rotate(-45deg)";
    } else {
      spans[0].style.transform = "";
      spans[1].style.opacity = "";
      spans[2].style.transform = "";
      // Also close projects dropdown when closing menu
      if (projectsDropdown) {
        projectsDropdown.classList.remove("mobile-open");
      }
    }
  });
}

// ── Projects dropdown ───────────────────────────────────────────────────────
if (projectsToggle && projectsDropdown) {
  projectsToggle.addEventListener("click", function(e) {
    // Only intercept on mobile
    if (window.innerWidth <= 768) {
      e.preventDefault();
      projectsDropdown.classList.toggle("mobile-open");
    }
  });
}

// ── Active nav link ─────────────────────────────────────────────────────────
var path = window.location.pathname;
document.querySelectorAll(".nav-link").forEach(function(link) {
  var href = link.getAttribute("href");
  if (href && (
    path.endsWith(href) ||
    (href === "./index.html" && (path === "/" || path.endsWith("index.html")))
  )) {
    link.classList.add("active");
  }
});
