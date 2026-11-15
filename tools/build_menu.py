#!/usr/bin/env python3
"""Build the printable menu assets for Tulips Garden.

  python3 tools/build_menu.py                 # QR code + PDF
  python3 tools/build_menu.py --url URL       # point the QR code somewhere else (e.g. a custom domain)

Outputs (in assets/menu/):
  menu-qr.png   QR code for screens and the menu board (black on white, 4-module quiet zone)
  menu-qr.svg   Vector QR code for large prints, banners and table stickers
  tulips-garden-menu.pdf   Two A4 landscape pages, generated from menu.html

Needs: reportlab, pillow, opencv-python (QR check), playwright + Chrome (PDF).
"""
import argparse, pathlib, re, subprocess, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "menu"
DATA = (OUT / "menu-data.js").read_text()
DEFAULT_URL = re.search(r'url:\s*"([^"]+)"', DATA).group(1)


def qr_matrix(url):
    from reportlab.graphics.barcode.qrencoder import QRCode, QRErrorCorrectLevel
    q = QRCode(None, QRErrorCorrectLevel.Q)  # Q: survives ~25% damage (stains, creases)
    q.addData(url)
    q.make()
    n = q.getModuleCount()
    return [[bool(q.isDark(r, c)) for c in range(n)] for r in range(n)]


def write_png(m, path, box=12, quiet=4):
    from PIL import Image, ImageDraw
    n = len(m); size = (n + 2 * quiet) * box
    img = Image.new("RGB", (size, size), "white"); d = ImageDraw.Draw(img)
    for r, row in enumerate(m):
        for c, dark in enumerate(row):
            if dark:
                x, y = (c + quiet) * box, (r + quiet) * box
                d.rectangle([x, y, x + box - 1, y + box - 1], fill="black")
    img.save(path, optimize=True)


def write_svg(m, path, quiet=4):
    n = len(m); s = n + 2 * quiet
    rects = "".join(f'<rect x="{c+quiet}" y="{r+quiet}" width="1" height="1"/>'
                    for r, row in enumerate(m) for c, dark in enumerate(row) if dark)
    path.write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {s} {s}" shape-rendering="crispEdges">'
                    f'<rect width="{s}" height="{s}" fill="#fff"/><g fill="#000">{rects}</g></svg>')


def check_scans(path, url):
    import cv2
    img = cv2.imread(str(path)); det = cv2.QRCodeDetector()
    for scale in (1.0, 0.35, 0.18):  # full size down to a small table-sticker size
        im = cv2.resize(img, None, fx=scale, fy=scale, interpolation=cv2.INTER_AREA)
        val, _, _ = det.detectAndDecode(im)
        if val != url:
            sys.exit(f"QR check failed at scale {scale}: decoded {val!r}")
    print(f"QR scans OK -> {url}")


def build_pdf():
    from playwright.sync_api import sync_playwright
    exe = next((p for p in ("/usr/bin/google-chrome", "/usr/bin/chromium") if pathlib.Path(p).exists()), None)
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path=exe) if exe else p.chromium.launch()
        pg = b.new_page()
        pg.goto((ROOT / "menu.html").as_uri())
        pg.wait_for_function("document.fonts.status==='loaded' && [...document.images].every(i=>i.complete)")
        pg.emulate_media(media="print")
        pg.pdf(path=str(OUT / "tulips-garden-menu.pdf"), prefer_css_page_size=True, print_background=True)
        b.close()
    print("PDF written: assets/menu/tulips-garden-menu.pdf")


if __name__ == "__main__":
    ap = argparse.ArgumentParser(); ap.add_argument("--url", default=DEFAULT_URL); a = ap.parse_args()
    m = qr_matrix(a.url)
    write_png(m, OUT / "menu-qr.png"); write_svg(m, OUT / "menu-qr.svg")
    check_scans(OUT / "menu-qr.png", a.url)
    build_pdf()
