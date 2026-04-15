#!/usr/bin/env python3
"""
Generate a hero loop video with Seedance 2.0 via MUAPI.
Called by the forja-landing skill during /forja build.

Usage:
    python generate_hero.py --image <path|url> --prompt "..." [options]
"""

from __future__ import annotations

import argparse
import json
import mimetypes
import os
import sys
import time
import urllib.request
import urllib.error
from pathlib import Path


API_BASE = "https://api.muapi.ai/api/v1"
SUBMIT_PATH = "/seedance-2-image-to-video-fast"
UPLOAD_PATH = "/upload_file"
STATUS_PATH = "/predictions/{request_id}/result"
POLL_INTERVAL = 5
POLL_MAX = 15
TIMEOUT_SECONDS = 900  # 15 min — seedance-fast can queue


def load_api_key() -> str:
    key = os.environ.get("MUAPI_API_KEY", "")
    if not key:
        for env_file in (".env.local", ".env"):
            path = Path.cwd() / env_file
            if path.exists():
                for line in path.read_text(encoding="utf-8").splitlines():
                    line = line.strip()
                    if line.startswith("MUAPI_API_KEY="):
                        key = line.split("=", 1)[1].strip().strip('"').strip("'")
                        break
                if key:
                    break
    if not key:
        sys.exit("ERROR: MUAPI_API_KEY not found. Set it in .env.local or environment.")
    return key


def api_request(method: str, url: str, *, headers: dict, body: bytes | None = None) -> dict:
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body_text = e.read().decode("utf-8", errors="replace")
        sys.exit(f"HTTP {e.code} from {url}:\n{body_text}")
    except urllib.error.URLError as e:
        sys.exit(f"Network error: {e.reason}")


def upload_image(image_path: str, api_key: str) -> str:
    path = Path(image_path)
    if not path.exists():
        sys.exit(f"Image not found: {image_path}")

    mime_type, _ = mimetypes.guess_type(str(path)) or ("image/jpeg", None)
    boundary = "----FormBoundary7MA4YWxkTrZu0gW"
    file_bytes = path.read_bytes()

    parts = [
        f"--{boundary}\r\n".encode(),
        f'Content-Disposition: form-data; name="file"; filename="{path.name}"\r\n'.encode(),
        f"Content-Type: {mime_type}\r\n\r\n".encode(),
        file_bytes,
        f"\r\n--{boundary}--\r\n".encode(),
    ]
    body = b"".join(parts)
    headers = {
        "x-api-key": api_key,
        "Content-Type": f"multipart/form-data; boundary={boundary}",
    }

    print(f"  Uploading {path.name} ({len(file_bytes):,} bytes)...")
    resp = api_request("POST", f"{API_BASE}{UPLOAD_PATH}", headers=headers, body=body)
    url = resp.get("url") or resp.get("file_url") or resp.get("data", {}).get("url")
    if not url:
        sys.exit(f"Upload response missing URL: {resp}")
    return url


def resolve_image(image_input: str, api_key: str) -> str:
    if image_input.startswith(("http://", "https://")):
        return image_input
    return upload_image(image_input, api_key)


def create_task(prompt: str, image_url: str, aspect_ratio: str, duration: int,
                quality: str, api_key: str) -> str:
    payload = {
        "prompt": prompt,
        "images_list": [image_url],
        "aspect_ratio": aspect_ratio,
        "duration": duration,
        "quality": quality,
        "remove_watermark": False,
    }
    headers = {"x-api-key": api_key, "Content-Type": "application/json"}
    body = json.dumps(payload).encode("utf-8")

    print("  Submitting task to MUAPI seedance-2-image-to-video-fast...")
    resp = api_request("POST", f"{API_BASE}{SUBMIT_PATH}", headers=headers, body=body)
    request_id = resp.get("request_id") or resp.get("id") or resp.get("data", {}).get("request_id")
    if not request_id:
        sys.exit(f"No request_id in response: {resp}")
    print(f"  Task: {request_id}")
    return request_id


def poll(request_id: str, api_key: str) -> dict:
    url = f"{API_BASE}{STATUS_PATH.format(request_id=request_id)}"
    headers = {"x-api-key": api_key}
    interval = POLL_INTERVAL
    deadline = time.time() + TIMEOUT_SECONDS
    last_state = None

    print("  Polling...")
    while time.time() < deadline:
        time.sleep(interval)
        resp = api_request("GET", url, headers=headers)
        status = resp.get("status", "unknown")
        if status != last_state:
            print(f"  Status: {status}")
            last_state = status
        if status == "completed":
            return resp
        if status == "failed":
            err = resp.get("error") or "unknown"
            sys.exit(f"Generation failed: {err}")
        interval = min(interval + 2, POLL_MAX)

    sys.exit(f"Timed out after {TIMEOUT_SECONDS}s — poll manually with request_id {request_id}")


def download(result: dict, output_dir: str, request_id: str) -> str:
    outputs = result.get("outputs") or []
    if isinstance(outputs, str):
        outputs = [outputs]
    if not outputs:
        sys.exit(f"No outputs: {result}")

    video_url = outputs[0]
    if isinstance(video_url, dict):
        video_url = video_url.get("url") or video_url.get("video_url")

    out_dir = Path(output_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    out_file = out_dir / "forge-loop.mp4"

    print(f"  Downloading → {out_file}")
    req = urllib.request.Request(
        video_url,
        headers={
            "User-Agent": "Mozilla/5.0",
            "Referer": "https://muapi.ai/",
        },
    )
    with urllib.request.urlopen(req, timeout=180) as resp:
        out_file.write_bytes(resp.read())

    return str(out_file)


def main():
    parser = argparse.ArgumentParser(description="Generate hero loop video via MUAPI Seedance 2.0")
    parser.add_argument("--image", required=True, help="Reference image: local path or https:// URL")
    parser.add_argument("--prompt", required=True, help="Animation prompt")
    parser.add_argument("--aspect-ratio", default="16:9", choices=["16:9", "9:16", "4:3", "3:4", "1:1"])
    parser.add_argument("--duration", type=int, default=5, choices=[5, 10, 15])
    parser.add_argument("--quality", default="basic", choices=["basic", "high"])
    parser.add_argument("--output-dir", default="public/hero")
    args = parser.parse_args()

    print("\n🔨 forja-landing · hero video generator\n")

    api_key = load_api_key()
    print("[1/4] Resolving image...")
    image_url = resolve_image(args.image, api_key)

    print("[2/4] Creating task...")
    request_id = create_task(args.prompt, image_url, args.aspect_ratio, args.duration, args.quality, api_key)

    print("[3/4] Waiting for completion (up to 15 min for seedance-fast)...")
    result = poll(request_id, api_key)

    print("[4/4] Downloading...")
    out = download(result, args.output_dir, request_id)

    print(f"\n✓ Hero video saved: {out}")
    print(f"  Size: {Path(out).stat().st_size / 1024:.0f} KB")
    print("\nDrop-in the landing — your <Hero> component already references /hero/forge-loop.mp4")


if __name__ == "__main__":
    main()
