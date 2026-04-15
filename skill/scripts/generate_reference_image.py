#!/usr/bin/env python3
"""
Generate a reference image for the hero video using a simple HTML/Canvas fallback
OR via Pixa (Anthropic's image tool) if available in the environment.

This is called by /forja build when the user doesn't have a reference image
but wants to generate the Seedance hero video.

Usage:
    python generate_reference_image.py --vibe artesano --subject "forge workshop" --output public/hero/reference.jpg

Strategies:
1. If OPENROUTER_API_KEY is set: use Gemini via OpenRouter (image gen)
2. Otherwise: fail gracefully, instruct user to provide image

Since this skill ships standalone (no Pixa MCP access), the script generates
a vibe-appropriate prompt and calls OpenRouter's Gemini Flash Image endpoint.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.request
import urllib.error
from pathlib import Path


VIBE_PROMPTS = {
    "artesano": (
        "Dark blacksmith forge workshop at night, cinematic photorealistic. "
        "Glowing orange embers drifting upward from a central hammered iron anvil. "
        "Deep black shadows with warm amber highlights from molten metal. "
        "Volumetric light rays cutting through smoke. No people visible. "
        "4K composition suitable as first frame for a looping video."
    ),
    "minimal": (
        "Minimal cinematic shot of a single subject on matte dark background. "
        "Soft diffused light from upper left. Clean composition with generous negative space. "
        "Muted desaturated palette with one subtle accent color. "
        "Editorial documentary style. 4K photorealistic."
    ),
    "bold": (
        "Vibrant cinematic composition with high contrast color blocks. "
        "Dynamic lighting with neon accents against deep shadows. "
        "Centered main subject with floating particles around. "
        "Bold saturated palette. Energetic and cinematic. 4K."
    ),
    "tech": (
        "Abstract cinematic scene with flowing circuit-like light streams. "
        "Dark blue-black background with cyan and amber particle highlights. "
        "Futuristic sci-fi aesthetic, volumetric fog. "
        "Centered composition with generous depth. 4K photorealistic."
    ),
    "premium": (
        "Premium editorial shot with soft studio lighting on dark charcoal backdrop. "
        "Single subject centered with subtle golden rim light. "
        "Minimal composition, deep shadows, cinematic depth of field. "
        "Muted luxury palette. 4K fashion photography style."
    ),
}


def load_openrouter_key() -> str | None:
    key = os.environ.get("OPENROUTER_API_KEY", "")
    if not key:
        for env_file in (".env.local", ".env"):
            path = Path.cwd() / env_file
            if path.exists():
                for line in path.read_text(encoding="utf-8").splitlines():
                    line = line.strip()
                    if line.startswith("OPENROUTER_API_KEY="):
                        key = line.split("=", 1)[1].strip().strip('"').strip("'")
                        break
                if key:
                    break
    return key or None


def build_prompt(vibe: str, subject: str) -> str:
    base = VIBE_PROMPTS.get(vibe, VIBE_PROMPTS["artesano"])
    return f"{base} Subject focus: {subject}."


def generate_via_openrouter(prompt: str, output_path: Path, api_key: str) -> bool:
    """Call OpenRouter's Gemini Flash Image endpoint."""
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://github.com/Carlos-Dominguez-faber/forja-landing",
        "X-Title": "forja-landing",
    }
    payload = {
        "model": "google/gemini-2.5-flash-image",
        "messages": [{"role": "user", "content": prompt}],
        "modalities": ["image", "text"],
    }

    print("  Calling OpenRouter (Gemini Flash Image)...")
    req = urllib.request.Request(url, data=json.dumps(payload).encode("utf-8"), headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        print(f"  HTTP {e.code}: {body[:200]}")
        return False

    # Extract image from response (format varies by provider)
    try:
        message = data["choices"][0]["message"]
        images = message.get("images") or []
        if not images:
            # Fallback: check if content has base64 image
            content = message.get("content", "")
            print(f"  No images in response. Content: {content[:200]}")
            return False
        image_data_url = images[0].get("image_url", {}).get("url", "")
        if not image_data_url.startswith("data:image"):
            print(f"  Unexpected image format: {image_data_url[:80]}")
            return False
        # data:image/png;base64,<base64>
        import base64
        b64 = image_data_url.split(",", 1)[1]
        output_path.write_bytes(base64.b64decode(b64))
        return True
    except Exception as e:
        print(f"  Parse error: {e}")
        return False


def main():
    parser = argparse.ArgumentParser(description="Generate reference image for hero video")
    parser.add_argument("--vibe", default="artesano", choices=list(VIBE_PROMPTS.keys()))
    parser.add_argument("--subject", default="forge workshop", help="Main subject of the image")
    parser.add_argument("--output", default="public/hero/reference.jpg")
    args = parser.parse_args()

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    prompt = build_prompt(args.vibe, args.subject)
    print(f"\n🔨 forja-landing · reference image generator")
    print(f"  Vibe: {args.vibe}")
    print(f"  Subject: {args.subject}\n")

    api_key = load_openrouter_key()
    if not api_key:
        print("✗ OPENROUTER_API_KEY not found in environment or .env.local")
        print("\nTo generate a reference image automatically:")
        print("  1. Get key at https://openrouter.ai")
        print("  2. Add to .env.local:  OPENROUTER_API_KEY=your_key")
        print("\nOr provide your own image:")
        print("  python generate_hero.py --image <path_or_url> --prompt '...'")
        sys.exit(1)

    ok = generate_via_openrouter(prompt, output_path, api_key)
    if not ok:
        sys.exit("✗ Image generation failed. Check API credits or provide own image.")

    print(f"\n✓ Reference image saved: {output_path}")
    print(f"  Size: {output_path.stat().st_size / 1024:.0f} KB")
    print(f"\nNext: generate hero video with")
    print(f"  python generate_hero.py --image {output_path} --prompt '...'")


if __name__ == "__main__":
    main()
