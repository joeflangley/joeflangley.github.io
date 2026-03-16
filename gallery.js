/* ══════════════════════════════════════
   gallery.js — masonry lightbox
══════════════════════════════════════ */

var items     = Array.from(document.querySelectorAll(".masonry-item"));
var lightbox  = document.getElementById("lightbox");
var lbImg     = document.getElementById("lightbox-img");
var lbCaption = document.getElementById("lightbox-caption");
var lbClose   = document.getElementById("lightbox-close");
var lbPrev    = document.getElementById("lightbox-prev");
var lbNext    = document.getElementById("lightbox-next");
var current   = 0;

function openLightbox(index) {
  current = index;
  var item    = items[current];
  var src     = item.getAttribute("data-src") || item.querySelector("img").src;
  var caption = item.querySelector("figcaption")
                ? item.querySelector("figcaption").textContent : "";
  lbImg.src         = src;
  lbImg.alt         = caption;
  lbCaption.textContent = caption;
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lbImg.src = "";
  document.body.style.overflow = "";
}

function showPrev() {
  current = (current - 1 + items.length) % items.length;
  openLightbox(current);
}

function showNext() {
  current = (current + 1) % items.length;
  openLightbox(current);
}

// Open on click
items.forEach(function(item, i) {
  item.addEventListener("click", function() { openLightbox(i); });
});

// Controls
lbClose.addEventListener("click", closeLightbox);
lbPrev.addEventListener("click", function(e) { e.stopPropagation(); showPrev(); });
lbNext.addEventListener("click", function(e) { e.stopPropagation(); showNext(); });

// Click backdrop to close
lightbox.addEventListener("click", function(e) {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener("keydown", function(e) {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape")     closeLightbox();
  if (e.key === "ArrowLeft")  showPrev();
  if (e.key === "ArrowRight") showNext();
});

// Touch swipe support
var touchStartX = 0;
lightbox.addEventListener("touchstart", function(e) {
  touchStartX = e.touches[0].clientX;
}, { passive: true });
lightbox.addEventListener("touchend", function(e) {
  var diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) showNext(); else showPrev();
  }
}, { passive: true });
