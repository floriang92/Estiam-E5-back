"use strict";
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();
const port = 3002;
const MONGOUSER = "root"
const MONGOPASSWORD = "example"
const MONGOCONNECT = `mongodb://${MONGOUSER}:${MONGOPASSWORD}@mongo/ny?authSource=admin`

app.set("view engine", "pug");

// App middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan("dev"));
app.use("/static", express.static("./static"));

// App routes
app.use("/", require("./router"));

// App initialisation
mongoose.connect(MONGOCONNECT);

mongoose.connection
  .once('open', () => {
    console.log("Connexion à Mongo réussie")
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  .on('error', (error) => {
    console.warn('Warning', error);
  });
