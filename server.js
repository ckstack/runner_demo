const http = require("http");
const express = require("express");
const app = express();

const PORT = 3000;
const HOSTNAME = "127.0.0.1";

app.use(express.static("./public"));

app.get("/", function (req, res, next) {
    res.send("/index");
});

const server = http.createServer(app);

server.listen(PORT, HOSTNAME, function () {
    const addr = this.address();
    console.log("server running on http://"+addr.address+":"+addr.port);
});