const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const app = express();
const path = require("path");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mern");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
} else {
  app.use(express.static(__dirname + "/client/public"));
}

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/nytreact");










const PORT = process.env.PORT || 3001;
app.listen(PORT);
