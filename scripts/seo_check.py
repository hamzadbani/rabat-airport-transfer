#!/usr/bin/env python3
"""
On-page SEO checker for EM Taxi Touristique.
Run from project root: python scripts/seo_check.py [--url https://yoursite.com]
Uses only Python standard library (no pip install required).
"""

import argparse
import os
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.request import urlopen, Request
from urllib.error import URLError, HTTPError

# Default project root (parent of scripts/)
SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent

# Optimal ranges (SEO best practices)
TITLE_MIN, TITLE_MAX = 50, 60
DESC_MIN, DESC_MAX = 150, 160
CANONICAL_BASE = "http://em-taxi.com"


def get_content(path: Path) -> str:
    with open(path, "r", encoding="utf-8", errors="replace") as f:
        return f.read()


def extract_meta(html: str) -> dict:
    """Extract title and meta tags from HTML."""
    out = {}
    # Title
    m = re.search(r"<title[^>]*>([^<]+)</title>", html, re.I | re.DOTALL)
    out["title"] = m.group(1).strip() if m else None
    # Meta by name
    for name in ("description", "keywords", "robots", "author"):
        m = re.search(
            rf'<meta\s+name=["\']?{name}["\']?\s+content=["\']([^"\']+)["\']',
            html,
            re.I,
        )
        out[name] = m.group(1).strip() if m else None
    # Meta property (og, twitter)
    for prop in ("og:title", "og:description", "og:image", "og:url", "twitter:image", "twitter:card"):
        m = re.search(
            rf'<meta\s+property=["\']?{re.escape(prop)}["\']?\s+content=["\']([^"\']+)["\']',
            html,
            re.I,
        )
        key = prop.replace(":", "_")
        out[key] = m.group(1).strip() if m else None
    # Canonical
    m = re.search(r'<link\s+rel=["\']?canonical["\']?\s+href=["\']([^"\']+)["\']', html, re.I)
    out["canonical"] = m.group(1).strip() if m else None
    return out


def check_index_html(root: Path):
    """Check index.html. Returns (errors, warnings, meta_dict)."""
    errors, warnings = [], []
    path = root / "index.html"
    if not path.exists():
        return (["index.html not found"], [], {})
    html = get_content(path)
    meta = extract_meta(html)
    # Title
    if not meta.get("title"):
        errors.append("Missing <title>")
    else:
        L = len(meta["title"])
        if L < 30:
            warnings.append(f"Title too short ({L} chars). Aim 50–60.")
        elif L > TITLE_MAX:
            warnings.append(f"Title too long ({L} chars). Keep under {TITLE_MAX}.")
        elif L < TITLE_MIN:
            warnings.append(f"Title a bit short ({L} chars). Optimal 50–60.")
    # Description
    if not meta.get("description"):
        errors.append("Missing meta description")
    else:
        L = len(meta["description"])
        if L < 120:
            warnings.append(f"Meta description too short ({L} chars). Aim 150–160.")
        elif L > 165:
            warnings.append(f"Meta description too long ({L} chars). Keep 150–160.")
        elif L < DESC_MIN or L > DESC_MAX:
            warnings.append(f"Meta description length {L}. Optimal 150–160.")
    # Canonical
    if not meta.get("canonical"):
        errors.append("Missing canonical URL")
    elif not meta["canonical"].startswith("http"):
        warnings.append("Canonical should be absolute URL (e.g. http://em-taxi.com/)")
    # Robots
    if not meta.get("robots"):
        warnings.append("Consider adding meta robots (e.g. index, follow)")
    # og:image / twitter:image — must be absolute
    for key, label in (("og_image", "og:image"), ("twitter_image", "twitter:image")):
        val = meta.get(key)
        if not val:
            warnings.append(f"Missing {label} for social sharing")
        elif val.startswith("/") or not val.startswith("http"):
            errors.append(f"{label} must be absolute URL (e.g. http://em-taxi.com/logo.png), got: {val[:50]}")
    # og:url
    if not meta.get("og_url") or not meta["og_url"].startswith("http"):
        warnings.append("og:url should be absolute (e.g. http://em-taxi.com/)")
    return errors, warnings, meta


def check_source_images(root: Path):
    """Scan src for <img> missing or empty alt. Returns (errors, warnings)."""
    errors, warnings = [], []
    src = root / "src"
    if not src.exists():
        return [], []
    for ext in ("*.tsx", "*.jsx", "*.ts", "*.js"):
        for path in src.rglob(ext):
            text = get_content(path)
            # Find <img ...> blocks (simplified: same line or multiline)
            for m in re.finditer(r"<img\s([^>]+)>", text, re.I | re.DOTALL):
                attrs = m.group(1)
                if "alt=" not in attrs:
                    errors.append(f"{path.relative_to(root)}: <img> without alt attribute")
                else:
                    alt_m = re.search(r'alt=["\']([^"\']*)["\']', attrs)
                    alt_val = alt_m.group(1) if alt_m else ""
                    # JSX dynamic alt: alt={expression} has no quoted value to extract
                    if not alt_m and "alt={" in attrs:
                        continue  # assume descriptive alt from expression
                    if not alt_val.strip():
                        warnings.append(f"{path.relative_to(root)}: <img> has empty alt")
                    elif len(alt_val) < 10:
                        warnings.append(f"{path.relative_to(root)}: alt text very short (aim descriptive)")
    return errors, warnings


def check_heading_hierarchy(root: Path):
    """Ensure one H1 and logical order. Returns (errors, warnings)."""
    errors, warnings = [], []
    src = root / "src"
    if not src.exists():
        return [], []
    h1_count = 0
    for path in src.rglob("*.tsx"):
        text = get_content(path)
        h1_count += len(re.findall(r"<h1\s", text, re.I)) + len(re.findall(r"<h1>", text, re.I))
    if h1_count == 0:
        errors.append("No H1 found in src. Page should have exactly one H1 (e.g. in Hero).")
    elif h1_count > 1:
        warnings.append(f"Multiple H1s found ({h1_count}). Use a single H1 per page.")
    return errors, warnings


def check_robots(root: Path):
    """Check public/robots.txt."""
    errors, warnings = [], []
    path = root / "public" / "robots.txt"
    if not path.exists():
        errors.append("public/robots.txt missing")
        return errors, warnings
    text = get_content(path)
    if "Sitemap:" not in text and "sitemap" not in text.lower():
        warnings.append("robots.txt should reference Sitemap (e.g. Sitemap: http://em-taxi.com/sitemap.xml)")
    if "Allow: /" not in text and "Disallow:" in text:
        warnings.append("Ensure main content is allowed (Allow: /)")
    return errors, warnings


def check_sitemap(root: Path):
    """Check public/sitemap.xml."""
    errors, warnings = [], []
    path = root / "public" / "sitemap.xml"
    if not path.exists():
        errors.append("public/sitemap.xml missing")
        return errors, warnings
    try:
        tree = ET.parse(path)
        root_el = tree.getroot()
        ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        urls = root_el.findall(".//sm:url", ns) or root_el.findall(".//{http://www.sitemaps.org/schemas/sitemap/0.9}url")
        if not urls:
            urls = root_el.findall(".//url")
        if not urls:
            warnings.append("sitemap.xml has no <url> entries")
        else:
            for u in urls:
                loc = u.find("loc") if u.find("loc") is not None else u.find("{http://www.sitemaps.org/schemas/sitemap/0.9}loc")
                if loc is not None and loc.text and not loc.text.startswith("http"):
                    errors.append(f"Sitemap <loc> must be absolute: {loc.text[:60]}")
    except ET.ParseError as e:
        errors.append(f"sitemap.xml invalid XML: {e}")
    return errors, warnings


def fetch_url(url: str):
    """Fetch HTML from URL. Returns None on failure."""
    try:
        req = Request(url, headers={"User-Agent": "SEO-Checker/1.0"})
        with urlopen(req, timeout=15) as r:
            return r.read().decode("utf-8", errors="replace")
    except (URLError, HTTPError, OSError) as e:
        return None


def check_live_url(url: str):
    """Check a live URL (fetched HTML). Returns (errors, warnings, meta)."""
    errors, warnings = [], []
    html = fetch_url(url)
    if not html:
        return (["Could not fetch URL (check network or URL)"], [], {})
    meta = extract_meta(html)
    # Same rules as index.html
    if not meta.get("title"):
        errors.append("[Live] Missing <title>")
    else:
        L = len(meta["title"])
        if L > TITLE_MAX:
            warnings.append(f"[Live] Title too long ({L} chars)")
        elif L < TITLE_MIN and L >= 30:
            warnings.append(f"[Live] Title short ({L} chars). Optimal 50–60.")
    if not meta.get("description"):
        errors.append("[Live] Missing meta description")
    else:
        L = len(meta["description"])
        if L < 120 or L > 165:
            warnings.append(f"[Live] Meta description length {L}. Optimal 150–160.")
    if not meta.get("canonical"):
        warnings.append("[Live] No canonical URL")
    for key, label in (("og_image", "og:image"), ("twitter_image", "twitter:image")):
        val = meta.get(key)
        if val and (val.startswith("/") or not val.startswith("http")):
            errors.append(f"[Live] {label} should be absolute URL")
    # H1 count (from fetched HTML — may be empty if SPA not rendered)
    h1_count = len(re.findall(r"<h1\s", html, re.I)) + len(re.findall(r"<h1>", html, re.I))
    if h1_count == 0:
        warnings.append("[Live] No H1 in HTML (SPA may need JS to render; ensure crawlers or prerender see H1)")
    elif h1_count > 1:
        warnings.append(f"[Live] Multiple H1s ({h1_count}). Prefer one H1 per page.")
    return errors, warnings, meta


def score(errors: list, warnings: list) -> int:
    """Compute 0–100 score. Each error -15, each warning -5, floor 0."""
    s = 100 - len(errors) * 15 - len(warnings) * 5
    return max(0, min(100, s))


def main():
    parser = argparse.ArgumentParser(description="On-page SEO checker")
    parser.add_argument("--url", type=str, help="Also check this live URL")
    parser.add_argument("--no-project", action="store_true", help="Only check --url, skip project files")
    args = parser.parse_args()
    root = PROJECT_ROOT
    all_errors, all_warnings = [], []

    if not args.no_project:
        # Index.html
        e, w, _ = check_index_html(root)
        all_errors.extend(e)
        all_warnings.extend(w)
        # Images
        e, w = check_source_images(root)
        all_errors.extend(e)
        all_warnings.extend(w)
        # Headings
        e, w = check_heading_hierarchy(root)
        all_errors.extend(e)
        all_warnings.extend(w)
        # robots.txt
        e, w = check_robots(root)
        all_errors.extend(e)
        all_warnings.extend(w)
        # sitemap
        e, w = check_sitemap(root)
        all_errors.extend(e)
        all_warnings.extend(w)

    if args.url:
        e, w, _ = check_live_url(args.url)
        all_errors.extend(e)
        all_warnings.extend(w)

    s = score(all_errors, all_warnings)
    print("=" * 60)
    print("  ON-PAGE SEO CHECK — EM Taxi Touristique")
    print("=" * 60)
    print(f"\n  Score: {s}/100")
    if s < 50:
        print("  Status: Needs improvement (fix errors first, then warnings)")
    elif s < 80:
        print("  Status: Good — address warnings to reach 80+")
    else:
        print("  Status: Strong")
    if all_errors:
        print("\n  ERRORS (fix these first):")
        for x in all_errors:
            print(f"    • {x}")
    if all_warnings:
        print("\n  WARNINGS:")
        for x in all_warnings:
            print(f"    • {x}")
    if not all_errors and not all_warnings:
        print("\n  No issues found. Keep meta and content up to date.")
    print("\n" + "=" * 60)
    # Suggest quick wins
    err_str = " ".join(all_errors)
    if "og:image" in err_str and "absolute" in err_str:
        print("\n  QUICK FIX: In index.html set og:image and twitter:image to full URL:")
        print('    content="http://em-taxi.com/logo.png"')
    sys.exit(0 if s >= 70 else 1)


if __name__ == "__main__":
    main()
