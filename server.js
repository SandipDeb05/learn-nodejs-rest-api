const http = require("http");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./controller/productController");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/api/products" && method === "GET") {
    getProducts(req, res);
  } else if (url.match(/\/api\/products\/([0-9]+)/) && method === "GET") {
    const id = url.split("/")[3];
    getProduct(req, res, id);
  } else if (url.match(/\/api\/products\/([0-9]+)/) && method === "PUT") {
    const id = url.split("/")[3];
    updateProduct(req, res, id);
  } else if (url.match(/\/api\/products\/([0-9]+)/) && method === "DELETE") {
    const id = url.split("/")[3];
    deleteProduct(req, res, id);
  } else if (url === "/api/products" && method === "POST") {
    createProduct(req, res);
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });
    res.write(JSON.stringify({ message: "Route not found!" }));
    res.end();
  }
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, (error) => {
  if (error) {
    console.log("Something went wrong! ", error);
  } else {
    console.log("Listening on", PORT);
  }
});
