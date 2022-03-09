const http = require("http");
const server = http
  .createServer(function (req, res) {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>Divyesh Shah</h1>");
    res.write("<h1>Divyesh SHah SHah  </h1>");
    res.end();
  })
  .listen(4000, () => console.log("Server Running on Port 4000 "));
