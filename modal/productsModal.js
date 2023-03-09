const products = require("../data/products.json");
const { writeDataToFile } = require("../utils/utils");
const { v4: uuidv4 } = require("uuid");

function findAll() {
  return new Promise((res, rej) => {
    res(products);
  });
}

function findById(id) {
  return new Promise((res, rej) => {
    const product = products.find((p) => p.id === id);
    res(product);
  });
}

function create(product) {
  return new Promise((res, rej) => {
    const newProduct = { id: uuidv4(), ...product };
    products.push(newProduct);
    writeDataToFile("./data/products.json", products);
    res(newProduct);
  });
}

function update(id, product) {
  return new Promise((res, rej) => {
    const index = products.findIndex((p) => p.id === id);
    products[index] = {
      id,
      ...product,
    };
    writeDataToFile("./data/products.json", products);
    res(products[index]);
  });
}

function remove(id) {
  return new Promise((res, rej) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    writeDataToFile("./data/products.json", updatedProducts);
    res(updatedProducts);
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
