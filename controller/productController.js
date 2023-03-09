const Products = require("../modal/productsModal");
const { getPostData } = require("../utils/utils");

async function getProducts(req, res) {
  try {
    const products = await Products.findAll();
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.write(JSON.stringify(products));
    res.end();
  } catch (error) {
    console.log(error);
  }
}

async function getProduct(req, res, id) {
  try {
    const product = await Products.findById(id);
    if (!product) {
      res.writeHead(404, {
        "Content-Type": "application/json",
      });
      res.write(JSON.stringify({ message: "Product not found!" }));
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.write(JSON.stringify(product));
    }
    res.end();
  } catch (error) {
    console.log(error);
  }
}

async function createProduct(req, res) {
  try {
    const body = await getPostData(req);
    const { name, description, price } = JSON.parse(body);
    const product = {
      name,
      description,
      price,
    };

    const newProduct = await Products.create(product);
    res.writeHead(201, {
      "Content-Type": "application/json",
    });
    res.write(JSON.stringify(newProduct));
    res.end();
  } catch (error) {
    console.log(error);
  }
}

async function updateProduct(req, res, id) {
  try {
    const product = await Products.findById(id);
    if (!product) {
      res.writeHead(404, {
        "Content-Type": "application/json",
      });
      res.write(JSON.stringify({ message: "Product not found!" }));
    } else {
      const body = await getPostData(req);
      const { name, description, price } = JSON.parse(body);
      const productData = {
        name: name || product.name,
        description: description || product.description,
        price: price || product.price,
      };
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      const updatedProduct = await Products.update(id, productData);
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.write(JSON.stringify(updatedProduct));
    }
    res.end();
  } catch (error) {
    console.log(error);
  }
}

async function deleteProduct(req, res, id) {
  try {
    const product = await Products.findById(id);
    if (!product) {
      res.writeHead(404, {
        "Content-Type": "application/json",
      });
      res.write(JSON.stringify({ message: "product not found" }));
    } else {
      await Products.remove(id);
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.write(JSON.stringify({ message: `Product ${id} deleted` }));
    }
    res.end();
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
