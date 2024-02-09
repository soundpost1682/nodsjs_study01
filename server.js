const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));

app.listen(8080, () => {
  console.log("http://localhost:8080 에서 running");
});

app.get("/", (요청, 응답) => {
  응답.sendFile(__dirname + "/index.html");
});

app.get("/news", (요청, 응답) => {
  응답.send("rains a lot");
});

app.get("/about", (요청, 응답) => {
  응답.sendFile(__dirname + "/about.html");
});
