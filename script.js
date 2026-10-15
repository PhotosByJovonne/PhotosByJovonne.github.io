document.addEventListener("DOMContentLoaded", () => {
  // Automatically update the copyright year.
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Report missing images so we can troubleshoot them.
  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
      console.error("Image could not be loaded:", image.src);
    });
  });

  // Create the photo lightbox.
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.hidden = true;
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-label", "Enlarged photograph");

  const enlargedImage = document.createElement("img");
  enlargedImage.alt = "";

  lightbox.appendChild(enlargedImage);
  document.body.appendChild(lightbox);

  // Open a photo when it is clicked.
  document.querySelectorAll(".photo-grid img").forEach((photo) => {
    photo.addEventListener("click", () => {
      enlargedImage.src = photo.src;
      enlargedImage.alt = photo.alt;
      lightbox.hidden = false;
    });
  });

  // Close the enlarged photo when the dark background is clicked.
  lightbox.addEventListener("click", () => {
    lightbox.hidden = true;
    enlargedImage.src = "";
  });

  // Also allow the Escape key to close it.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      lightbox.hidden = true;
      enlargedImage.src = "";
    }
  });

  console.log("Photos By Jovonne website loaded.");
});
