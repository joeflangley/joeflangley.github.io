// Get the dropdown button and the div that contains project links
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
});

// List of image file paths
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
setInterval(changeImage, 3000);
