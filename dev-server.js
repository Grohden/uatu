const connect = require("connect");
const static = require("serve-static");

const server = connect();

server.use(static(__dirname + "/dist"));

server.listen(8080);

const livereload = require("livereload");
const lrserver = livereload.createServer();
lrserver.watch(__dirname + "/dist");

console.log("http://localhost:8080/");
