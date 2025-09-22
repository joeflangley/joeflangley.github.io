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

// Sub-dropdowns
toggleDropdown("places-button", "places-dropdown");

const images = [
    "./photos/elephants1.png",
    "./photos/lion_cub.png"
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

