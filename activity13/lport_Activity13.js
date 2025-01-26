var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");

//Lawson Port
//netid: lport
//4/12/24

app.use(cors());
app.use(bodyParser.json());

const person = {
  name : 'alex',
  email : 'alex@mail.com',
  job : 'software dev'
  };
  


  app.get("/person", (req, res) => {
    const person = {
    name : 'alex',
    email : 'alex@mail.com',
    job : 'software dev'
    };
    console.log(person);
    res.status(200);
    res.send(person);
    });

    

const port = "8081";
const host = "localhost";

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
    })