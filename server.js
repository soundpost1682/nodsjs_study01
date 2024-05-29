const express = require("express");
const app = express();
const { MongoClient, ObjectId } = require("mongodb");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (요청, 응답) => {
  응답.sendFile(__dirname + "/index.html");
});

app.get("/news", (요청, 응답) => {
  db.collection("post").insertOne({ title: "blabla" });
  응답.send("rains a lot");
});

app.get("/list", async (요청, 응답) => {
  let result = await db.collection("post").find().toArray();
  응답.render("list.ejs", { posts: result });
});

app.get("/about", (요청, 응답) => {
  응답.sendFile(__dirname + "/about.html");
});

app.get("/time", (요청, 응답) => {
  응답.render("time.ejs", { time: new Date() });
});

app.get("/write", (요청, 응답) => {
  응답.render("write.ejs");
});

app.post("/add", async (요청, 응답) => {
  console.log(요청.body);

  try {
    if (요청.body.title == "") {
      응답.send("fill the title");
    } else {
      await db
        .collection("post")
        .insertOne({ title: 요청.body.title, content: 요청.body.content });
      응답.redirect("/list");
    }
  } catch (e) {
    console.log(e);
    응답.status(500).send("server blew up");
  }
});

app.get("/detail/:id", async (요청, 응답) => {
  try {
    let result = await db
      .collection("post")
      .findOne({ _id: new ObjectId(요청.params.id) });

    응답.render("detail.ejs", { result: result });
  } catch (e) {
    console.log(e);
    응답.status(400).send("wrong URL");
  }
});

app.get("/edit/:id", async (요청, 응답) => {
  db.collection("post").updateOne({ a: 1 }, { $set: { title: "babo" } });
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(요청.params.id) });
  응답.render("edit.ejs", { result: result });
});

app.put("/edit", async (요청, 응답) => {
  await db
    .collection("post")
    .updateOne(
      { _id: new ObjectId(요청.body.id) },
      { $set: { title: 요청.body.title, content: 요청.body.content } }
    );
  응답.redirect("list");
});

app.delete("/delete", async (요청, 응답) => {
  console.log(요청.query);
  await db
    .collection("post")
    .deleteOne({ _id: new ObjectId(요청.query.docid) });
  응답.send("Delete Complted");
});

let db;
const url =
  "mongodb+srv://guarneri1682:09201120@dbmong.0wqva6p.mongodb.net/?retryWrites=true&w=majority";
new MongoClient(url)
  .connect()
  .then((client) => {
    console.log("connected your DB");
    db = client.db("forum");
    app.listen(8080, () => {
      console.log("http://localhost:8080 running");
    });
  })
  .catch((err) => {
    console.log(err);
  });
