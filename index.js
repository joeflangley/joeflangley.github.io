const nameEl = document.getElementById("typewriter-name");
const subEl = document.getElementById("typewriter-subtitle");

if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
  // Typing effect only on index.html (or root "/")
  const nameText = "Joe F. Langley";
  const subtitleText = "Conservation Scientist";
  const speed = 90;

  function typeText(el, text, speed, done) {
    el.textContent = "";
    let i = 0;
    const t = setInterval(() => {
      el.textContent += text.charAt(i++);
      if (i >= text.length) {
        clearInterval(t);
        if (done) setTimeout(done, 300);
      }
    }, speed);
  }

  typeText(nameEl, nameText, speed, () => {
    typeText(subEl, subtitleText, speed);
  });
}



function toggleDropdown(buttonId, dropdownId) {
  const button = document.getElementById(buttonId);
  const dropdown = document.getElementById(dropdownId);

  button.addEventListener("click", (e) => {
    e.preventDefault(); // stop page jumping
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  });
}

// Main Projects dropdown
toggleDropdown("projects-button", "projects-dropdown");

// // Sub-dropdowns
// toggleDropdown("places-button", "places-dropdown");

const images = [
    "./photos/leopard.png",
    "./photos/elephants1.png",
    "./photos/lion_cub.png",
    "./photos/giraffe.png",
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

