
from pathlib import Path
import json

# Find the website's images folder.
website = Path(__file__).resolve().parent
images_folder = website / "images"

# Your four photography albums.
albums = ["events", "infrared", "scenery", "others"]

# Supported photograph formats.
extensions = {".jpg", ".jpeg", ".png", ".webp", ".gif"}

gallery = {}

for album in albums:
    folder = images_folder / album

    if folder.exists():
        photos = sorted(
            photo.name
            for photo in folder.iterdir()
            if photo.is_file() and photo.suffix.lower() in extensions
        )

        gallery[album] = [
            f"images/{album}/{photo}" for photo in photos
        ]
    else:
        gallery[album] = []

# Save the list for the website.
output = website / "gallery.json"

with open(output, "w", encoding="utf-8") as file:
    json.dump(gallery, file, indent=2)

for album, photos in gallery.items():
    print(f"{album}: {len(photos)} photographs")

print("Gallery list generated successfully!")
