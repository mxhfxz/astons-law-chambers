#!/usr/bin/env python3
"""
Site-wide WCAG AA contrast auditor for preview/index.html.

Parses the HTML tree, walks ancestors to determine the effective background
for every text node, resolves Tailwind color tokens + opacity classes, and
reports any text element whose computed contrast falls below WCAG AA.

AA thresholds:
  - Normal text: 4.5:1
  - Large text (>=18px or >=14px bold): 3:1
  - Non-text UI components (3.1.11): 3:1
"""
import math
import re
import sys
from bs4 import BeautifulSoup, NavigableString, Comment

PATH = "/Users/mahfuzpholby/Documents/Agency-Work/astons-law-chambers/preview/index.html"

# ---------------------------------------------------------------------------
# Token map — sourced from the Tailwind config block + CSS custom properties.
# ---------------------------------------------------------------------------
TOKENS = {
    # navy
    'navy-950':   '#0E1628',
    'navy-900':   '#16223C',
    'navy-800':   '#1F2E50',
    'navy-700':   '#283A64',
    'navy-100':   '#E8EDF5',
    # neutrals
    'offwhite':   '#F8F9FB',
    'white':      '#FFFFFF',
    'black':      '#000000',
    'footer':     '#232536',
    # greys
    'grey-900':   '#111827',
    'grey-600':   '#4B5563',
    'grey-300':   '#D1D5DB',
    'grey-100':   '#F3F4F6',
    # emergency
    'emergency-500': '#C23616',
    'emergency-600': '#A12B10',
    # whatsapp
    'whatsapp':      '#075E54',
    'whatsapp-dark': '#054B43',
}

# CSS class registry — maps classes defined in <style> to their effective
# bg / text color so the auditor sees them like Tailwind classes.
# Each entry: {'bg': (hex, alpha), 'text': (hex, alpha)} — both optional.
CSS_CLASSES = {
    'hero-image-panel':  {'bg': ('#0E1628', 1.0)},  # gradient bottoms out at navy-950
    'nav-link':          {'text': ('#0E1628', 0.75)},  # navy-950 @ 75%
    'btn-primary':       {'bg': ('#16223C', 1.0), 'text': ('#FFFFFF', 1.0)},
    'btn-secondary':     {'text': ('#16223C', 1.0)},  # transparent bg inherits
    'btn-inverse':       {'bg': ('#FFFFFF', 1.0), 'text': ('#16223C', 1.0)},
    'btn-inverse-emergency': {'bg': ('#FFFFFF', 1.0), 'text': ('#A12B10', 1.0)},
    'btn-whatsapp':      {'bg': ('#075E54', 1.0), 'text': ('#FFFFFF', 1.0)},
    'btn-emergency':     {'bg': ('#C23616', 1.0), 'text': ('#FFFFFF', 1.0)},
    'btn-on-dark':       {'text': ('#FFFFFF', 1.0)},  # transparent bg inherits dark
    'btn-quick-exit':    {'bg': ('#000000', 1.0), 'text': ('#FFFFFF', 1.0)},
    'alert-emergency':   {'bg': ('#FBF1EE', 1.0), 'text': ('#0E1628', 1.0)},  # 4% red on white ≈ #FBF1EE
    'placeholder-tag':   {'bg': ('#FFFBEB', 1.0), 'text': ('#B45309', 1.0)},
    'cal-inline':        {'bg': ('#FFFFFF', 1.0)},
    'avail-dot':         {'bg': ('#25D366', 1.0)},
    # NB: .step-card has no background in CSS — the card bg comes from the
    # Tailwind utility on the <li> itself (bg-navy-900). No registry entry, so
    # resolve_bg reads the real utility class rather than a hardcoded colour.
    # Sticky pill chips
    # The phone chip inside the sticky pill is bg-white text-navy-950 — handled by Tailwind classes already.
}

def hex_to_rgb(h):
    h = h.lstrip('#')
    if len(h) == 3:
        h = ''.join(c*2 for c in h)
    return int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)

def composite(fg_hex, alpha, bg_hex):
    """Composite fg at alpha (0..1) over bg, return hex."""
    fr, fg, fb = hex_to_rgb(fg_hex)
    br, bg_, bb = hex_to_rgb(bg_hex)
    r = round(alpha*fr + (1-alpha)*br)
    g = round(alpha*fg + (1-alpha)*bg_)
    b = round(alpha*fb + (1-alpha)*bb)
    return '#{:02X}{:02X}{:02X}'.format(r, g, b)

def relative_luminance(hex_color):
    r, g, b = hex_to_rgb(hex_color)
    def chan(v):
        v = v / 255
        return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4
    return 0.2126*chan(r) + 0.7152*chan(g) + 0.0722*chan(b)

def contrast_ratio(c1, c2):
    L1 = relative_luminance(c1)
    L2 = relative_luminance(c2)
    if L1 < L2:
        L1, L2 = L2, L1
    return (L1 + 0.05) / (L2 + 0.05)

# ---------------------------------------------------------------------------
# Class parsing
# ---------------------------------------------------------------------------
TEXT_RE = re.compile(r'^text-([a-z0-9-]+?)(?:/(\d{1,3}))?$')
BG_RE = re.compile(r'^bg-([a-z0-9-]+?)(?:/(\d{1,3}))?$')
ARB_BG_RE = re.compile(r'^bg-\[(#[0-9A-Fa-f]{3,8}|rgba?\([^)]+\))\]$')
ARB_TEXT_RE = re.compile(r'^text-\[(#[0-9A-Fa-f]{3,8})\]$')
SIZE_RE = re.compile(r'^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)$')
FLUID_RE = re.compile(r'^fluid-(eyebrow|cta|body|lead|h1|h2|h3)$')

# Approximate pixel sizes for the Tailwind text-* utilities (matches default).
SIZE_PX = {
    'xs': 12, 'sm': 14, 'base': 16, 'lg': 18, 'xl': 20,
    '2xl': 24, '3xl': 30, '4xl': 36, '5xl': 48, '6xl': 60,
    # fluid-* approximations
    'eyebrow': 13, 'cta': 16, 'body': 16, 'lead': 18,
    'h1': 48, 'h2': 32, 'h3': 22,
}

def resolve_text_color(classes):
    """Return (hex_color, alpha) or None if no text color class found.
    Custom CSS classes (e.g. .nav-link, .btn-*) win over Tailwind text-* utilities
    since CSS specificity in the project's stylesheet beats utility text-* classes."""
    # Custom CSS class wins
    for c in classes:
        if c in CSS_CLASSES and 'text' in CSS_CLASSES[c]:
            return CSS_CLASSES[c]['text']
    for c in classes:
        m = ARB_TEXT_RE.match(c)
        if m:
            return (m.group(1).upper(), 1.0)
        m = TEXT_RE.match(c)
        if m:
            token = m.group(1)
            if token == 'transparent':
                return None
            if token in TOKENS:
                alpha = int(m.group(2)) / 100 if m.group(2) else 1.0
                return (TOKENS[token], alpha)
    return None

def resolve_bg(classes):
    """Return (hex_color, alpha) or None."""
    # Custom CSS class wins
    for c in classes:
        if c in CSS_CLASSES and 'bg' in CSS_CLASSES[c]:
            return CSS_CLASSES[c]['bg']
    for c in classes:
        m = ARB_BG_RE.match(c)
        if m:
            raw = m.group(1)
            if raw.startswith('#'):
                return (raw.upper(), 1.0)
            # rgba(...) — extract
            rgba = re.match(r'rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\)', raw)
            if rgba:
                r, g, b = int(rgba.group(1)), int(rgba.group(2)), int(rgba.group(3))
                a = float(rgba.group(4)) if rgba.group(4) else 1.0
                return ('#{:02X}{:02X}{:02X}'.format(r, g, b), a)
        m = BG_RE.match(c)
        if m:
            token = m.group(1)
            if token == 'transparent':
                continue
            if token in TOKENS:
                alpha = int(m.group(2)) / 100 if m.group(2) else 1.0
                return (TOKENS[token], alpha)
    return None

def get_font_size_and_weight(classes):
    """Walk classes to find the most specific text size + bold-ness."""
    size = 16  # default body
    bold = False
    for c in classes:
        m = SIZE_RE.match(c)
        if m:
            size = SIZE_PX[m.group(1)]
        m = FLUID_RE.match(c)
        if m:
            size = SIZE_PX[m.group(1)]
        if c in ('font-bold', 'font-semibold'):
            bold = True
    return size, bold

def is_large_text(size_px, bold):
    if size_px >= 18:
        return True
    if size_px >= 14 and bold:
        return True
    return False

def effective_bg_for_element(el):
    """Walk up ancestors to find the effective bg color stack."""
    stack = []  # list of (hex, alpha)
    cur = el
    while cur is not None and not isinstance(cur, str):
        classes = (cur.get('class') or []) if hasattr(cur, 'get') else []
        bg = resolve_bg(classes)
        if bg:
            stack.append(bg)
        cur = cur.parent
    # base html bg is white
    base = '#FFFFFF'
    # apply bg layers from outermost to innermost
    result = base
    for color, alpha in reversed(stack):
        result = composite(color, alpha, result)
    return result

def effective_text_color(text_color, text_alpha, bg_hex):
    if text_alpha < 1.0:
        return composite(text_color, text_alpha, bg_hex)
    return text_color

def has_visible_text(el):
    """Check if element has direct text content (not just nested)."""
    for child in el.children:
        if isinstance(child, Comment):
            continue
        if isinstance(child, NavigableString) and not isinstance(child, Comment):
            text = str(child).strip()
            if text:
                return True
    return False

def get_direct_text(el):
    parts = []
    for child in el.children:
        if isinstance(child, Comment):
            continue
        if isinstance(child, NavigableString) and not isinstance(child, Comment):
            t = str(child).strip()
            if t:
                parts.append(t)
    return ' '.join(parts)

def is_decorative(el):
    """Heuristic: aria-hidden / role=presentation / role=img elements + svg + visually-hidden."""
    if not hasattr(el, 'get'):
        return False
    if el.get('aria-hidden') == 'true':
        return True
    if el.get('role') in ('presentation', 'none'):
        return True
    if el.name == 'svg':
        return True
    classes = el.get('class') or []
    if 'sr-only' in classes or 'placeholder-tag' in classes:
        return True
    # Watermark / decorative panel children
    if 'hero-wordmark' in classes or 'hero-mark' in classes or 'final-strip-mark' in classes or 'step-numeral' in classes:
        return True
    # Hidden by default banner (only shown when populated)
    if el.get('hidden') is not None:
        return True
    # parent has hidden attr
    p = el.parent
    while p is not None and hasattr(p, 'get'):
        if p.get('hidden') is not None:
            return True
        if 'sr-only' in (p.get('class') or []):
            return True
        p = p.parent
    return False

def is_inside_aria_hidden(el):
    p = el
    while p is not None and hasattr(p, 'get'):
        if p.get('aria-hidden') == 'true':
            return True
        p = p.parent
    return False

# ---------------------------------------------------------------------------
# Find effective text color at any element by walking ancestors.
# ---------------------------------------------------------------------------
def effective_text_color_for_element(el):
    """Return (hex, alpha) — walks up to find nearest text-* class."""
    cur = el
    while cur is not None and hasattr(cur, 'get'):
        classes = cur.get('class') or []
        tc = resolve_text_color(classes)
        if tc:
            return tc
        cur = cur.parent
    return ('#0E1628', 1.0)  # body default = navy-950 per body CSS

# ---------------------------------------------------------------------------
# Audit
# ---------------------------------------------------------------------------
with open(PATH) as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

# All text-bearing leaves: elements with direct text content.
TEXT_TAGS = ('p', 'span', 'a', 'li', 'dt', 'dd', 'h1', 'h2', 'h3', 'h4', 'h5',
             'h6', 'button', 'label', 'div', 'address', 'small', 'strong')

failures = []
checked = 0

for el in soup.find_all(TEXT_TAGS):
    if not has_visible_text(el):
        continue
    if is_inside_aria_hidden(el) or is_decorative(el):
        continue
    # Skip noscript fallback
    p = el
    skip = False
    while p is not None and hasattr(p, 'name'):
        if p.name in ('noscript', 'script', 'style', 'head', 'svg'):
            skip = True
            break
        p = p.parent
    if skip:
        continue

    text = get_direct_text(el)
    if not text:
        continue

    bg = effective_bg_for_element(el)
    fg_hex, fg_alpha = effective_text_color_for_element(el)
    composed = effective_text_color(fg_hex, fg_alpha, bg)
    cr = contrast_ratio(composed, bg)
    size_px, bold = get_font_size_and_weight(el.get('class') or [])
    # walk up for size if not set on this el
    if size_px == 16:
        # try parent classes
        p = el.parent
        depth = 0
        while p is not None and hasattr(p, 'get') and depth < 4:
            psize, pbold = get_font_size_and_weight(p.get('class') or [])
            if psize != 16:
                size_px = psize
                if pbold and not bold:
                    bold = True
                break
            p = p.parent
            depth += 1
    threshold = 3.0 if is_large_text(size_px, bold) else 4.5
    checked += 1
    if cr < threshold:
        # Position
        line_no = '?'
        try:
            line_no = el.sourceline
        except Exception:
            pass
        failures.append({
            'line': line_no,
            'tag': el.name,
            'text': text[:60],
            'fg': fg_hex,
            'alpha': fg_alpha,
            'composed': composed,
            'bg': bg,
            'ratio': cr,
            'size': size_px,
            'bold': bold,
            'threshold': threshold,
            'classes': ' '.join(el.get('class') or []),
        })

print(f"Checked {checked} text elements")
print(f"Failures: {len(failures)}\n")

for f in failures:
    print(f"L{f['line']:>5}  {f['tag']:>5}  "
          f"fg={f['fg']}{'@'+str(int(f['alpha']*100))+'%' if f['alpha']<1 else '':<8}  "
          f"bg={f['bg']}  ratio={f['ratio']:.2f}  need>={f['threshold']}  "
          f"size={f['size']}px{' bold' if f['bold'] else ''}")
    print(f"        text: {f['text']!r}")
    print(f"        classes: {f['classes'][:100]}")
    print()

sys.exit(1 if failures else 0)
