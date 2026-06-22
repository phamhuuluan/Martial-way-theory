#!/usr/bin/env python3
"""Crop belt icons from assets/IMG_1422.JPG into high-resolution transparent PNGs."""

from __future__ import annotations

import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "assets" / "IMG_1422.JPG"
OUT_DIR = ROOT / "assets" / "belts"

UPSCALE = 6

NAMES = [
    "lam-1",
    "lam-2",
    "lam-3",
    "lam-4",
    "luc-1",
    "luc-2",
    "luc-3",
    "luc-4",
    "hong-1",
    "hong-2",
    "hong-3",
    "hong-4",
    "hoang-1",
    "hoang-2",
    "hoang-3",
    "hoang-4",
    "chuan-bach",
    "bach",
    "bach-de-1",
    "bach-de-2",
    "bach-de-3",
    "bach-de-4",
    "bach-de-5",
]

MANUAL_CROPS: list[tuple[str, int, int, int, int]] = [
    ("nau", 74, 298, 236, 318),
    ("chuan-hong", 74, 828, 236, 858),
    ("chuan-hoang", 74, 1068, 236, 1098),
    ("ngu-sac", 78, 1828, 239, 1852),
]


def sat(r: int, g: int, b: int) -> float:
    mx, mn = max(r, g, b), min(r, g, b)
    return (mx - mn) / mx if mx else 0.0


def is_bg(r: int, g: int, b: int) -> bool:
    return r > 205 and g > 195 and b > 155 and abs(r - g) < 50


def is_red_text(r: int, g: int, b: int) -> bool:
    return r > 100 and g < 70 and b < 50 and (r - g) > 40


def is_brown_body(r: int, g: int, b: int) -> bool:
    return r > 60 and g < 100 and b < 90 and r > g and (r - g) > 10


def is_belt_ui(r: int, g: int, b: int) -> bool:
    if is_bg(r, g, b) or is_red_text(r, g, b):
        return False
    if r < 35 and g < 35 and b < 35:
        return False
    if is_brown_body(r, g, b):
        return True
    if r > 60 and g < 60 and b < 60:
        return True
    if sat(r, g, b) > 0.22:
        return True
    if r > 165 and g > 150 and b > 120:
        return True
    return False


def is_belt_bottom_ui(r: int, g: int, b: int) -> bool:
    if is_bg(r, g, b) and sat(r, g, b) < 0.12:
        return False
    if is_red_text(r, g, b):
        return False
    if r < 35 and g < 35 and b < 35:
        return False
    if is_brown_body(r, g, b):
        return True
    if r > 170 and g > 165 and b > 155:
        return True
    if sat(r, g, b) > 0.2:
        return True
    if r > 150 and g > 120 and b < 100:
        return True
    return False


def get_runs(
    pixels,
    y: int,
    x0: int,
    x1: int,
    *,
    bottom: bool = False,
) -> list[tuple[int, int]]:
    is_pixel = is_belt_bottom_ui if bottom else is_belt_ui
    runs: list[tuple[int, int]] = []
    in_run = False
    start = 0
    for x in range(x0, x1):
        if is_pixel(*pixels[x, y]):
            if not in_run:
                start = x
                in_run = True
        elif in_run:
            runs.append((start, x - 1))
            in_run = False
    if in_run:
        runs.append((start, x1 - 1))
    return runs


def merge_adjacent_runs(runs: list[tuple[int, int]], max_gap: int = 15) -> list[tuple[int, int]]:
    if not runs:
        return runs
    merged = [runs[0]]
    for a, b in runs[1:]:
        pa, pb = merged[-1]
        if a - pb <= max_gap:
            merged[-1] = (pa, max(pb, b))
        else:
            merged.append((a, b))
    return merged


def pick_belt_run(
    runs: list[tuple[int, int]],
    seed_x1: int,
    seed_x2: int,
    *,
    bottom: bool = False,
) -> tuple[int, int] | None:
    if not runs:
        return None

    merged = merge_adjacent_runs(runs, max_gap=15)
    overlap_pad_left = 25 if bottom else 20
    overlap_pad_right = 50 if bottom else 45
    overlapping = [
        (a, b)
        for a, b in merged
        if b >= seed_x1 - overlap_pad_left and a <= seed_x2 + overlap_pad_right
    ]
    if not overlapping:
        return max(merged, key=lambda r: r[1] - r[0])

    if bottom:
        belt_runs = [(a, b) for a, b in overlapping if a >= 78 or b - a >= 120]
        if belt_runs:
            overlapping = belt_runs

    anchor = max(overlapping, key=lambda r: r[1] - r[0])
    if not bottom:
        return anchor

    left = anchor[0]
    for a, b in merged:
        if a >= 78 and b <= anchor[0] + 8 and anchor[0] - b <= 18:
            left = min(left, a)
    return left, anchor[1]


def cluster_rows(
    candidates: list[tuple[int, int, int]],
    *,
    min_h: int = 5,
    gap: int = 5,
) -> list[tuple[int, int, int, int]]:
    groups: list[tuple[int, int, int, int]] = []
    if not candidates:
        return groups

    y1, x1, x2 = candidates[0]
    y2 = y1
    bx1, bx2 = x1, x2

    for y, xa, xb in candidates[1:]:
        if y - y2 <= gap:
            y2 = y
            bx1 = min(bx1, xa)
            bx2 = max(bx2, xb)
        else:
            if y2 - y1 + 1 >= min_h:
                groups.append((y1, y2, bx1, bx2))
            y1, y2, bx1, bx2 = y, y, xa, xb

    if y2 - y1 + 1 >= min_h:
        groups.append((y1, y2, bx1, bx2))
    return groups


def extract_main(img: Image.Image) -> list[tuple[int, int, int, int]]:
    pixels = img.load()
    row_data: list[tuple[int, int, int]] = []

    for y in range(295, 1330):
        runs: list[tuple[int, int]] = []
        in_run = False
        start = 0
        for x in range(100, 195):
            if is_brown_body(*pixels[x, y]):
                if not in_run:
                    start = x
                    in_run = True
            elif in_run:
                width = x - start
                if 30 <= width <= 110:
                    runs.append((start, x - 1))
                in_run = False
        if in_run:
            width = 195 - start
            if 30 <= width <= 110:
                runs.append((start, 194))
        if runs:
            best = max(runs, key=lambda r: r[1] - r[0])
            row_data.append((y, best[0], best[1]))

    return cluster_rows(row_data)


def extract_bottom(img: Image.Image) -> list[tuple[int, int, int, int]]:
    pixels = img.load()
    _, h = img.size
    candidates: list[tuple[int, int, int]] = []

    for y in range(1370, h - 10):
        xs = [x for x in range(100, 286) if is_brown_body(*pixels[x, y])]
        if len(xs) >= 80:
            candidates.append((y, min(xs), max(xs)))

    return cluster_rows(candidates, min_h=10, gap=5)


def refine_bbox(
    img: Image.Image,
    seed_y1: int,
    seed_y2: int,
    seed_x1: int,
    seed_x2: int,
    *,
    bottom: bool = False,
) -> tuple[int, int, int, int]:
    pixels = img.load()
    _, img_h = img.size

    if bottom:
        belt_rows = [
            y
            for y in range(seed_y1 - 2, seed_y2 + 3)
            if sum(1 for x in range(78, 236) if is_belt_bottom_ui(*pixels[x, y])) >= 130
        ]
    else:
        belt_rows = [
            y
            for y in range(seed_y1 - 2, seed_y2 + 3)
            if sum(
                1 for x in range(seed_x1, seed_x2 + 1) if is_brown_body(*pixels[x, y])
            )
            >= 40
        ]
    if not belt_rows:
        belt_rows = list(range(seed_y1, seed_y2 + 1))

    min_y, max_y = min(belt_rows), max(belt_rows)
    y_radius = 2 if bottom else 6
    x_left = 78 if bottom else 74
    x_right = 235

    min_x, max_x = 9999, 0
    for y in range(min_y - y_radius, max_y + y_radius + 1):
        if y < 0 or y >= img_h:
            continue
        if not bottom:
            brown_count = sum(
                1 for x in range(seed_x1, seed_x2 + 1) if is_brown_body(*pixels[x, y])
            )
            if brown_count < 8:
                continue

        runs = get_runs(pixels, y, x_left, x_right, bottom=bottom)
        best = pick_belt_run(runs, seed_x1, seed_x2, bottom=bottom)
        if best:
            min_x = min(min_x, best[0])
            max_x = max(max_x, best[1])
            min_y = min(min_y, y)
            max_y = max(max_y, y)

    if min_x > 9000:
        return seed_x1 - 55, seed_y1 - 4, seed_x2 + 35, seed_y2 + 4

    if bottom:
        min_x = max(min_x, 82)

    return min_x - 2, min_y - 2, max_x + 2, max_y + 2


def is_background(r: int, g: int, b: int) -> bool:
    if r > 248 and g > 245 and b > 235:
        return True
    if r > 230 and g > 215 and b > 165 and abs(r - g) < 35:
        return True
    if g > 95 and b > 95 and r < 130 and (g - r) > 15:
        return True
    if r > 210 and g > 200 and b > 140 and (r - b) < 90:
        return True
    if r < 45 and g < 45 and b < 45:
        return True
    return False


def trim_transparent(image: Image.Image) -> Image.Image:
    alpha = image.split()[3]
    bbox = alpha.getbbox()
    if not bbox:
        return image
    return image.crop(bbox)


def remove_background(image: Image.Image) -> Image.Image:
    rgba = image.convert("RGBA")
    pixels = rgba.load()
    width, height = rgba.size

    for y in range(height):
        for x in range(width):
            r, g, b, _ = pixels[x, y]
            if is_background(r, g, b):
                pixels[x, y] = (r, g, b, 0)

    return trim_transparent(rgba)


def save_crop(img: Image.Image, name: str, x1: int, y1: int, x2: int, y2: int) -> dict:
    width, height = img.size
    crop = img.crop(
        (
            max(0, x1),
            max(0, y1),
            min(width, x2 + 1),
            min(height, y2 + 1),
        )
    )
    crop = remove_background(crop)

    if UPSCALE > 1:
        crop = crop.resize(
            (crop.width * UPSCALE, crop.height * UPSCALE),
            Image.Resampling.LANCZOS,
        )

    path = OUT_DIR / f"{name}.png"
    crop.save(path, optimize=True)

    return {
        "id": name,
        "file": str(path.relative_to(ROOT)),
        "bbox": [x1, y1, x2, y2],
        "size": list(crop.size),
        "scale": UPSCALE,
    }


def main() -> None:
    if not SOURCE.exists():
        raise SystemExit(f"Source image not found: {SOURCE}")

    img = Image.open(SOURCE).convert("RGB")
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    for old in OUT_DIR.glob("*.png"):
        if old.parent == OUT_DIR:
            old.unlink()

    manifest: list[dict] = []

    for name, x1, y1, x2, y2 in MANUAL_CROPS:
        entry = save_crop(img, name, x1, y1, x2, y2)
        manifest.append(entry)
        print(f"  {entry['file']} ({entry['size'][0]}x{entry['size'][1]})")

    main_seeds = extract_main(img)
    bottom_seeds = extract_bottom(img)
    all_seeds = [(seed, False) for seed in main_seeds] + [(seed, True) for seed in bottom_seeds]

    if len(main_seeds) != 16:
        print(f"warning: expected 16 main-table belts, found {len(main_seeds)}")

    for i, (seed, bottom) in enumerate(all_seeds):
        y1, y2, x1, x2 = seed
        name = NAMES[i] if i < len(NAMES) else f"belt-{i:02d}"
        bbox = refine_bbox(img, y1, y2, x1, x2, bottom=bottom)
        entry = save_crop(img, name, *bbox)
        manifest.append(entry)
        print(f"  {entry['file']} ({entry['size'][0]}x{entry['size'][1]})")

    manifest_path = OUT_DIR / "manifest.json"
    manifest_path.write_text(
        json.dumps(
            {
                "source": str(SOURCE.relative_to(ROOT)),
                "scale": UPSCALE,
                "total": len(manifest),
                "belts": manifest,
            },
            indent=2,
            ensure_ascii=False,
        ),
        encoding="utf-8",
    )
    print(f"\nExtracted {len(manifest)} belts → {OUT_DIR.relative_to(ROOT)}/")


if __name__ == "__main__":
    main()
