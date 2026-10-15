
document.addEventListener("DOMContentLoaded", async () => {
  // Automatically update the copyright year.
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Find the gallery on the current page.
  const gallery = document.getElementById("photo-gallery");

  // Only automatically load albums with data-album.
  // Your completed Events album remains unchanged.
  if (gallery && gallery.dataset.album) {
    const album = gallery.dataset.album;

    try {
      const response = await fetch("gallery.json");

      if (!response.ok) {
        throw new Error("Could not load gallery.json");
      }

      const galleries = await response.json();
      const photos = galleries[album] || [];

      // Create an image for every photograph.
      photos.forEach((path, index) => {
        const img = document.createElement("img");

        img.src = encodeURI(path);
        img.alt = `${album} photography by PhotosByJovonne`;
        img.loading = index < 3 ? "eager" : "lazy";
        img.decoding = "async";

        gallery.appendChild(img);
      });

      console.log(`Loaded ${photos.length} ${album} photos.`);
    } catch (error) {
      console.error("Gallery loading error:", error);
    }
  }

  // Report missing photographs.
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

  // Open photographs from existing and automatic galleries.
  document.addEventListener("click", (event) => {
    const photo = event.target.closest(
      ".portfolio-grid img, .photo-grid img"
    );

    if (!photo) return;

    enlargedImage.src = photo.src;
    enlargedImage.alt = photo.alt;
    lightbox.hidden = false;
  });

  // Close the lightbox when clicked.
  lightbox.addEventListener("click", () => {
    lightbox.hidden = true;
    enlargedImage.src = "";
  });

  // Close the lightbox with Escape.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      lightbox.hidden = true;
      enlargedImage.src = "";
    }
  });

  console.log("PhotosByJovonne website loaded.");
});
