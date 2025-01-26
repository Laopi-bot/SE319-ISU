var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
const port = "8081";
const host = "localhost";

const { MongoClient } = require("mongodb");

// MongoDB
const url = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);

app.post("/addProduct", async (req, res) => {
  try {
    await client.connect();

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send({ error: "Bad request: No data provided." });
    }

    const values = Object.values(req.body);

    const collections = await db
      .listCollections({ name: "fakestore_catelog" })
      .toArray();
    if (collections.length === 0) {
      return res
        .status(404)
        .send({ error: "Not found: collection does not exist." });
    }

    const newDocument = {
      id: values[0], // also "id": req.body.id,
      title: values[1], // also "name": req.body.name,
      price: values[2], // also "price": req.body.price,
      description: values[3], // also "description": req.body.description,
      category: values[4], //also "category" req.body.category,
      image: values[5], // also "image": req.body.imageUrl
      rating: values[6], //contains the rating and the amount of rating
    };
    console.log(newDocument);

    const existingDoc = await db
      .collection("fakestore_catelog")
      .findOne({ id: newDocument.id });
    if (existingDoc) {
      return res
        .status(409)
        .send({ error: "Conflict: A robot with this ID already exists." });
    }

    const results = await db
      .collection("fakestore_catelog")
      .insertOne(newDocument);
    res.status(200).send(results);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ error: "An internal server error occurred" });
  }
});

app.get("/listProducts", async (req, res) => {
  await client.connect();
  console.log("Node connected successfully to GET MongoDB");
  const query = {};
  const results = await db
    .collection("fakestore_catelog")
    .find(query)
    .limit(100)
    .toArray();
  console.log(results);
  res.status(200);
  res.send(results);
});

app.get("/:id", async (req, res) => {
  const productId = Number(req.params.id);
  console.log("Product to find :", productId);
  await client.connect();
  console.log("Node connected successfully to GET-id MongoDB");
  const query = { id: productId };
  const results = await db.collection("fakestore_catelog").findOne(query);
  console.log("Results :", results);
  if (!results) res.send("Not Found").status(404);
  else res.send(results).status(200);
});

app.put("/updateProduct/:id", async (req, res) => {
  const id = Number(req.params.id);
  const query = { id: id };

  await client.connect();
  console.log("Product to Update: ", id);

  //data for updating
  console.log(req.body);

  const updateData = {
    $set: {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      image: req.body.image,
      rating: req.body.rating,
    },
  };

  const options = {};
  const results = await db
    .collection("fakestore_catelog")
    .updateOne(query, updateData, options);

  res.status(200);
  res.send(results);
});

app.delete("/deleteProduct/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await client.connect();
    console.log("Product to delete: ", id);

    const query = { id: id };

    //read data from robot to delete
    const productDeleted = await db
      .collection("fakestore_catelog")
      .findOne(query);

    //delete
    const results = await db.collection("fakestore_catelog").deleteOne(query);
    res.status(200);
    res.send(productDeleted);
  } catch (error) {
    console.error("Error deleting product: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});
