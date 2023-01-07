require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./postgresSQL.js');
const controller = require('./controller.js');

const app = express();
module.exports.app = app;

app.use(express.json());
app.use(cors());

console.log('Print', db)
app.get('/products', controller.get);
app.get('/products/:product_id', controller.getOne);
console.log('hello')
app.get('/products/:product_id/styles', controller.getStyles);
app.get('/products/:product_id/related', controller.getRelated);

app.listen(process.env.PORT, () => {
  console.log('Listening on 3000')
});