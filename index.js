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
