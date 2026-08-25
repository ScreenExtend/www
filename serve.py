#!/usr/bin/env python3
"""
Static file server for dist/ that mirrors how GitHub Pages actually serves this
site: gzip compression + long-lived immutable caching for the content-hashed
assets, no-cache for index.html, correct MIME types, and SPA fallback so deep
links (e.g. /privacy) work.

Plain `python -m http.server` does NONE of this — it ships every byte
uncompressed with a tiny cache, which is why PageSpeed on the raw server looks
far worse than the real deployment. Run this instead:

    python serve.py            # serves ./dist on port 8000
    PORT=5000 python serve.py  # custom port

Then point your ngrok tunnel at the same port.
"""
import gzip
import io
import mimetypes
import os
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "dist")
PORT = int(os.environ.get("PORT", "8000"))

mimetypes.add_type("text/javascript", ".js")
mimetypes.add_type("text/javascript", ".mjs")
mimetypes.add_type("image/webp", ".webp")
mimetypes.add_type("image/svg+xml", ".svg")
mimetypes.add_type("application/manifest+json", ".webmanifest")

COMPRESSIBLE = {
    ".html", ".js", ".mjs", ".css", ".svg", ".json", ".txt", ".xml",
    ".webmanifest", ".map",
}


# Cache gzipped bytes per file so we compress once, not on every request
# (compressing on the hot path otherwise dominates TTFB under load).
_GZIP_CACHE = {}


class Handler(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def do_GET(self):
        self._serve(write_body=True)

    def do_HEAD(self):
        self._serve(write_body=False)

    def _serve(self, write_body):
        path = self.path.split("?", 1)[0].split("#", 1)[0]
        rel = path.lstrip("/")
        fs = os.path.join(ROOT, rel)
        is_fallback = False

        if not rel or path.endswith("/"):
            fs = os.path.join(ROOT, "index.html")
        elif not os.path.isfile(fs):
            # SPA deep-link fallback
            fs = os.path.join(ROOT, "index.html")
            is_fallback = True

        try:
            with open(fs, "rb") as f:
                data = f.read()
        except OSError:
            self.send_error(404)
            return

        ext = os.path.splitext(fs)[1].lower()
        ctype = mimetypes.guess_type(fs)[0] or "application/octet-stream"
        if ctype.startswith("text/") or ctype in (
            "application/javascript", "text/javascript", "image/svg+xml",
            "application/json", "application/manifest+json",
        ):
            ctype += "; charset=utf-8"

        headers = {"Content-Type": ctype}
        if rel.startswith("assets/") and not is_fallback:
            headers["Cache-Control"] = "public, max-age=31536000, immutable"
        else:
            headers["Cache-Control"] = "no-cache"

        if ext in COMPRESSIBLE and "gzip" in self.headers.get("Accept-Encoding", ""):
            cached = _GZIP_CACHE.get(fs)
            if cached is None or cached[0] != len(data):
                buf = io.BytesIO()
                with gzip.GzipFile(fileobj=buf, mode="wb", compresslevel=6) as gz:
                    gz.write(data)
                cached = (len(data), buf.getvalue())
                _GZIP_CACHE[fs] = cached
            data = cached[1]
            headers["Content-Encoding"] = "gzip"
            headers["Vary"] = "Accept-Encoding"

        self.send_response(200)
        for k, v in headers.items():
            self.send_header(k, v)
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        if write_body:
            self.wfile.write(data)

    def log_message(self, *args):
        pass


if __name__ == "__main__":
    print(f"Serving {ROOT} on http://0.0.0.0:{PORT}  (gzip + immutable asset cache)")
    ThreadingHTTPServer(("0.0.0.0", PORT), Handler).serve_forever()
