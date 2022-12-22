// const write = require('csv-write,stream');
// const parse = require('../');
// const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');


const getAllProducts = () => {
  let results = []
  return new Promise((resolve, reject) => {
    fs.createReadStream('products.csv')
    .on('error', (err) => {
      reject(err);
    })
    .pipe(csv())

    .on('results', (row) => {
      results.push(row)
    })

    .on('end', () => {
      resolve(results);
    })
})

}



const startEtlPipeline = async () => {
  try {
    let products = await getAllProducts();
  } catch (err) {
    console.log('error', err);
  }
}

startEtlPipeline();