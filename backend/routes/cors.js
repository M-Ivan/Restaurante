const cors = require("cors");
const express = require("express");
const app = express();

const whitelist = [
  "http://localhost:3000",
  "https://localhost:3443",
  "http://Ubuntu-Ivan:3001",
  "http://localhost:3006",
  "http://localhost:5000",
  "https://localhost:5443",
];

var corsOptionsDelegate = (req, callback) => {
  var corsOptions;

  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
