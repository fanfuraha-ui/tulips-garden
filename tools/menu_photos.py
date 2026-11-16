#!/usr/bin/env python3
"""Make web-ready menu photos from originals.

  python3 tools/menu_photos.py SOURCE_DIR

For each entry in PHOTOS it writes, into assets/menu/photos/:
  <slug>.jpg     square thumbnail (360 px), cropped around the food, for the menu boards and PDF
  <slug>-lg.jpg  large view (max 1280 px), original framing, opened when a thumbnail is tapped
"""
import pathlib, sys
from PIL import Image, ImageOps, ImageEnhance

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "menu" / "photos"

# slug: (source file, crop centre x, centre y as fractions, square side as fraction of the short edge)
PHOTOS = {
    "tea":              ("aedb05ac-image.jpg", .48, .42, .98),
    "coffee":           ("7582c227-image.jpg", .62, .67, .95),
    "full-breakfast":   ("6c776c07-image.jpg", .50, .67, 1.0),
    "brown-ugali":      ("4455d324-image.jpg", .47, .48, .92),
    "spinach":          ("4455d324-image.jpg", .71, .62, .62),
    "chapati":          ("4f1b99a8-image.jpg", .50, .50, 1.0),
    "spaghetti":        ("b748ddc4-image.jpg", .50, .48, 1.0),
    "chips-sausages":   ("ae040a81-image.jpg", .50, .50, 1.0),
    "beef-maji-maji":   ("f8660af8-image.jpg", .50, .50, 1.0),
    "broiler-chicken":  ("0a162fce-image.jpg", .50, .52, 1.0),
    "quad-platter":     ("0a84d3f6-image.jpg", .50, .50, 1.0),
    "beef-meat":        ("482e1877-image.jpg", .50, .52, 1.0),
    "chicken-wings":    ("618c2110-image.jpg", .50, .55, 1.0),
    "choma-sausages":   ("e57b2704-image.jpg", .50, .50, 1.0),
    "special-sausages": ("05ebf02a-image.jpg", .52, .55, 1.0),
    "tilapia":          ("a45a029a-image.jpg", .50, .48, 1.0),
    "spare-ribs":       ("84d11c4b-image.jpg", .50, .45, 1.0),
}


def save(im, path, q):
    im.save(path, "JPEG", quality=q, optimize=True, progressive=True, subsampling="4:2:0")


def main(src):
    OUT.mkdir(parents=True, exist_ok=True)
    for slug, (f, cx, cy, frac) in PHOTOS.items():
        im = ImageOps.exif_transpose(Image.open(src / f)).convert("RGB")
        w, h = im.size
        s = int(min(w, h) * frac)
        x = min(max(int(cx * w - s / 2), 0), w - s)
        y = min(max(int(cy * h - s / 2), 0), h - s)
        thumb = im.crop((x, y, x + s, y + s)).resize((360, 360), Image.LANCZOS)
        thumb = ImageEnhance.Sharpness(thumb).enhance(1.15)
        save(thumb, OUT / f"{slug}.jpg", 84)
        lg = im.copy()
        lg.thumbnail((1280, 1280), Image.LANCZOS)
        save(lg, OUT / f"{slug}-lg.jpg", 82)
        print(slug, (OUT / f"{slug}.jpg").stat().st_size // 1024, "KB thumb,", (OUT / f"{slug}-lg.jpg").stat().st_size // 1024, "KB large")


if __name__ == "__main__":
    main(pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "."))
