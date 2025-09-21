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
toggleDropdown("species-button", "species-dropdown");
toggleDropdown("areas-button", "areas-dropdown");


/* // Get the dropdown button and the div that contains project links
const projectButton = document.getElementById("research-drop-one-button");
const projectDropdown = document.getElementById("research-drop-one");

// Hide the dropdown by default
projectDropdown.style.display = "none";

// Toggle the dropdown when the button is clicked
projectButton.addEventListener("click", () => {
    if (projectDropdown.style.display === "none") {
        projectDropdown.style.display = "block"; // Show the dropdown
    } else {
        projectDropdown.style.display = "none";  // Hide the dropdown
    }
}); */

/* // List of image file paths
const images = [
    "./photos/elephants1.png",
    "./photos/lion_cub.png"
];

// Get the <img> element
const slideshow = document.getElementById("slideshow");

// Index to track the current image
let currentIndex = 0;

// Function to change the image
function changeImage() {
    currentIndex = (currentIndex + 1) % images.length; // loop back to start
    slideshow.src = images[currentIndex];
}

// Change image every 5 seconds (5000ms)
setInterval(changeImage, 3000); */

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

// Auto-change every 5s
setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}, 5000);

// Show first image + highlight first dot
showImage(currentIndex);

