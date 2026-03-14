/* ══════════════════════════════════════
   Joe Langley — index.js
══════════════════════════════════════ */

// ── Hero slideshow ──────────────────────────────────────────────────────────
const heroImages = [
  "./photos/elephants1.png",
  "./photos/BES_leopard.jpg",
  "./photos/lion_cub.png",
  "./photos/giraffe.jpg",
  "./photos/cheetahs.png",
];

const heroImg      = document.getElementById("hero-img");
const dotsWrap     = document.getElementById("hero-dots");
let   currentSlide = 0;
let   slideTimer;

// Build dots
heroImages.forEach((_, i) => {
  const btn = document.createElement("button");
  btn.classList.add("hero-dot");
  btn.setAttribute("aria-label", `Show image ${i + 1}`);
  btn.addEventListener("click", () => goTo(i));
  dotsWrap.appendChild(btn);
});
const dots = dotsWrap.querySelectorAll(".hero-dot");

function goTo(index) {
  clearInterval(slideTimer);
  currentSlide = index;
  heroImg.style.opacity = "0";
  setTimeout(() => {
    heroImg.src = heroImages[currentSlide];
    heroImg.style.opacity = "1";
  }, 300);
  dots.forEach((d, i) => d.classList.toggle("active", i === currentSlide));
  slideTimer = setInterval(advance, 7500);
}

function advance() {
  goTo((currentSlide + 1) % heroImages.length);
}

// Fade transition on the img element
if (heroImg) {
  heroImg.style.transition = "opacity 0.5s ease";
}

// Start
goTo(0);
slideTimer = setInterval(advance, 7500);


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
});}

// Main Projects dropdown
toggleDropdown("projects-button", "projects-dropdown");

// // Sub-dropdowns
// toggleDropdown("places-button", "places-dropdown");

const images = [
    "./photos/BES_leopard.jpg",
    "./photos/elephants1.png",
    "./photos/lion_cub.png",
    "./photos/giraffe.jpg",
    "./photos/cheetahs.png"
];

const slideshow = document.getElementById("slideshow");
const dotsContainer = document.getElementById("dots");

let currentIndex = 0;

// Create a dot for each image
images.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.addEventListener("click", () => showImage(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

// Function to show specific image
function showImage(index) {
    currentIndex = index;
    slideshow.src = images[currentIndex];
    updateDots();
}

// Function to update dot highlighting
function updateDots() {
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
    });
}

// Auto-change every 7.5s
setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}, 7500);

// Show first image + highlight first dot
showImage(currentIndex);

