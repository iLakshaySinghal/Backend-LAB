const http = require("http");
const fs = require("fs");

const PORT = 3000;
const filePath = "Ques3.txt";

const server = http.createServer((req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Error: File not found!");
      } else {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Server Error: " + err.message);
      }
    } else {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
