"""Local preview for the multi-page site. Serves only the public pages."""
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parent.parent
ROUTES = {
    "/": ROOT / "concept-two.html",
    "/index.html": ROOT / "concept-two.html",
    "/concept-two.html": ROOT / "concept-two.html",
    "/about-us": ROOT / "about.html",
    "/about-us/": ROOT / "about.html",
    "/about.html": ROOT / "about.html",
    "/services": ROOT / "services.html",
    "/services/": ROOT / "services.html",
    "/services.html": ROOT / "services.html",
    "/downloads": ROOT / "downloads.html",
    "/downloads/": ROOT / "downloads.html",
    "/downloads.html": ROOT / "downloads.html",
    "/testimonial": ROOT / "testimonials.html",
    "/testimonial/": ROOT / "testimonials.html",
    "/testimonials.html": ROOT / "testimonials.html",
    "/contact-us": ROOT / "contact.html",
    "/contact-us/": ROOT / "contact.html",
    "/contact.html": ROOT / "contact.html",
    "/appointments": ROOT / "appointments.html",
    "/appointments/": ROOT / "appointments.html",
    "/appointments.html": ROOT / "appointments.html",
    "/blog": ROOT / "blog.html",
    "/blog/": ROOT / "blog.html",
    "/blog.html": ROOT / "blog.html",
    "/concept-two.css": ROOT / "concept-two.css",
    "/concept-two.js": ROOT / "concept-two.js",
}
TYPES = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
}


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        path = unquote(urlparse(self.path).path)
        if path.endswith("/concept-two.css"):
            path = "/concept-two.css"
        elif path.endswith("/concept-two.js"):
            path = "/concept-two.js"
        target = ROUTES.get(path)
        if target is None or not target.is_file():
            body = b"Not found"
            self.send_response(404)
            self.send_header("Content-Type", "text/plain; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        data = target.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", TYPES.get(target.suffix, "application/octet-stream"))
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(data)

    def log_message(self, fmt, *args):
        print("%s - %s" % (self.address_string(), fmt % args))


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", 8091), Handler)
    print("preview http://127.0.0.1:8091/")
    server.serve_forever()
