var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
const port = "8081";
const host = "localhost";

/*
<p>Student name : Lawson Port</p>
<p>email : lport@iastate.edu</p>
<p>date : 4/14/2024/p>
*/

const { MongoClient } = require("mongodb");

// MongoDB
const url = "mongodb://127.0.0.1:27017";
const dbName = "secoms319";
const client = new MongoClient(url);
const db = client.db(dbName);

app.get("/listRobots", async (req, res) => {
  await client.connect();
  console.log("Node connected successfully to GET MongoDB");
  const query = {};
  const results = await db.collection("robot").find(query).limit(100).toArray();
  console.log(results);
  res.status(200);
  res.send(results);
});

app.get("/:id", async (req, res) => {
  const robotid = Number(req.params.id);
  console.log("Robot to find :", robotid);
  await client.connect();
  console.log("Node connected successfully to GET-id MongoDB");
  const query = { id: robotid };
  const results = await db.collection("robot").findOne(query);
  console.log("Results :", results);
  if (!results) res.send("Not Found").status(404);
  else res.send(results).status(200);
});

app.put("/updateRobot/:id", async(req, res) => {
  const id = Number(req.params.id);
  const query = {id: id};

  await client.connect();
  console.log("Robot to Update: ", id);

  //data for updating
  console.log(req.body);

  const updateData = {
    $set:{
        "name": req.body.name,
        "price": req.body.price,
        "description": req.body.description,
        "imageUrl": req.body.imageUrl
    }
  };

  const options = { };
  const results = await db.collection("robot").updateOne(query, updateData, options);

  res.status(200);
  res.send(results);
});


app.post("/addRobot", async (req, res) => {
  try {
    await client.connect();

    if(!req.body || Object.keys(req.body).length === 0){
      return res.status(400).send({error: 'Bad request: No data provided.'});
    }

    const values = Object.values(req.body);

    const collections = await db.listCollections({name: "robot"}).toArray();
      if(collections.length === 0){
        return res.status(404).send({ error: 'Not found: collection does not exist.'});
      }

    const newDocument = {
      id: values[0], // also "id": req.body.id,
      name: values[1], // also "name": req.body.name,
      price: values[2], // also "price": req.body.price,
      description: values[3], // also "description": req.body.description,
      imageUrl: values[4], // also "imageUrl": req.body.imageUrl
    };
    console.log(newDocument);

    const existingDoc = await db.collection("robot").findOne({ "id": newDocument.id});
    if(existingDoc){
      return res.status(409).send({ error: 'Conflict: A robot with this ID already exists.'});
    }


    const results = await db.collection("robot").insertOne(newDocument);
    res.status(200).send(results);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ error: "An internal server error occurred" });
  }
});

app.delete("/deleteRobot/:id", async (req, res) => {
  try{
    const id = Number(req.params.id);

    await client.connect();
    console.log("Robot to delete: ", id);

    const query = { id: id};

    //read data from robot to delete
    const robotDeleted = await db.collection("robot").findOne(query);

    //delete
    const results = await db.collection("robot").deleteOne(query);
    res.status(200);
    res.send(robotDeleted);
  }
  catch(error){
    console.error("Error deleting robot: ", error);
    res.status(500).send({message: 'Internal Server Error'});
  }
});

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});
