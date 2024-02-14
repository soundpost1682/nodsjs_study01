const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.get("/", (요청, 응답) => {
  응답.sendFile(__dirname + "/index.html");
});

app.get("/news", (요청, 응답) => {
  db.collection("post").insertOne({ title: "blabla" });
  응답.send("rains a lot");
});

app.get("/list", async (요청, 응답) => {
  let result = await db.collection("post").find().toArray();
  console.log(result[0]);
  응답.render("list.ejs", { posts: result });
});

app.get("/about", (요청, 응답) => {
  응답.sendFile(__dirname + "/about.html");
});

app.get("/time", (요청, 응답) => {
  응답.render("time.ejs", { time: new Date() });
});

const { MongoClient } = require("mongodb");

let db;
const url =
  "mongodb+srv://guarneri1682:09201120@dbmong.0wqva6p.mongodb.net/?retryWrites=true&w=majority";
new MongoClient(url)
  .connect()
  .then((client) => {
    console.log("DB연결성공");
    db = client.db("forum");
    app.listen(8080, () => {
      console.log("http://localhost:8080 에서 running");
    });
  })
  .catch((err) => {
    console.log(err);
  });
