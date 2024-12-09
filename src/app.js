import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const product = new ProductManager("products.json");

app.get("/products", async (req, res) => {
  try {
    const allProducts = product.getProducts();
    const limit = req.query?.limit;

    if (limit) {
      return res.send({ products: allProducts.splice(0, limit) });
    }

    res.send({ products: allProducts });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    res.send(product.getProductById(Number(pid)));
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

app.post("/products", async (req, res) => {
  try {
    const { title, description, price, thumbnail, stock } = req.body;
    product.addProduct({ title, description, price, thumbnail, stock });
    res.status(201).send({ message: "Product created!" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.listen(8080, () => {
  console.log("Rodando na porta 8080");
});
