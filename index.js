/* ══════════════════════════════════════
   Joe Langley — index.js
══════════════════════════════════════ */




// ── Nav: projects dropdown ──────────────────────────────────────────────────
const projectsToggle   = document.getElementById("projects-toggle");
const projectsDropdown = document.getElementById("projects-dropdown");

if (projectsToggle && projectsDropdown) {
  projectsToggle.addEventListener("click", (e) => {
    e.preventDefault();
    projectsDropdown.classList.toggle("open");
  });
  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!projectsToggle.contains(e.target) && !projectsDropdown.contains(e.target)) {
      projectsDropdown.classList.remove("open");
    }
  });
}


// ── Nav: mobile hamburger ───────────────────────────────────────────────────
const hamburger = document.getElementById("hamburger");
const topnav    = document.querySelector(".topnav");

if (hamburger && topnav) {
  hamburger.addEventListener("click", () => {
    topnav.classList.toggle("mobile-open");
    // Animate hamburger → X
    const spans = hamburger.querySelectorAll("span");
    const isOpen = topnav.classList.contains("mobile-open");
    if (isOpen) {
      spans[0].style.transform = "translateY(6.5px) rotate(45deg)";
      spans[1].style.opacity   = "0";
      spans[2].style.transform = "translateY(-6.5px) rotate(-45deg)";
    } else {
      spans.forEach(s => { s.style.transform = ""; s.style.opacity = ""; });
    }
  });
}


// ── Highlight active nav link ───────────────────────────────────────────────
const path = window.location.pathname;
document.querySelectorAll(".nav-link").forEach(link => {
  const href = link.getAttribute("href");
  if (href && (
    path.endsWith(href) ||
    (href === "./index.html" && (path === "/" || path.endsWith("index.html")))
  )) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});
