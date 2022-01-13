const fs = require("fs");
const http = require("http");
const path = require("path");
const url = require("url");

http
  .createServer((req, res) => {
    let parsed = url.parse(req.url);
    let fileName = path.parse(parsed.pathname);
    let filen = fileName.name == "" ? "index" : fileName.name;
    let ext = fileName.ext == "" ? ".html" : fileName.ext;
    let dir = fileName.dir == "/" ? "" : fileName.dir + "/";
    let page = fileName.name == "" ? "index" : fileName.name + fileName.ext;

    let f = (dir + filen + ext).replace("/", "");
    const mimeTypes = {
      ".html": "text/html",
      ".js": "test/javascript",
      ".css": "text/css",
      ".png": "image/png",
      ".jpg": "image/jpg",
      ".gif": "image/gif",
    };

    if (f) {
      fs.readFile(f, function (err, data) {
        if (page) {
          if (mimeTypes.hasOwnProperty(ext)) {
            res.writeHead(200, {
              "Content-Type": mimeTypes[ext],
            });
            ext === ".html"
              ? res.write(`<script> var page="${page}";
              </script>`)
              : null;
            res.end(data, "utf-8");
          }
        }
      });
    }
  })
  .listen("8080", () => {
    console.log("info", "Server is on port: " + 8080);
  });
