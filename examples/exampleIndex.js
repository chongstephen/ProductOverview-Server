const express = require("express")
const compression = require("compression");

const {
  Product,
  Feature,
  Style,
  Photo,
  Sku,
  Related
} = require("./database.js");
const {Op} = require("sequelize");

const app = express();
const port = 3002;

app.use(compression());

