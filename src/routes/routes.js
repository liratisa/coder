import express from "express";
import ProductManager from "../ProductManager.js";
import CartManager from "../CartManager.js";

const router = express.Router();

const product = new ProductManager("products.json");

router.get("/products", async (req, res) => {
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

router.get("/products/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    res.send(product.getProductById(Number(pid)));
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

router.post("/products", async (req, res) => {
  try {
    const { title, description, price, thumbnail, stock, status } = req.body;
    product.addProduct({ title, description, price, thumbnail, stock, status });
    res.status(201).send({ message: "Product created sucessfully." });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.put("/products/:pid", (req, res) => {
  try {
    const id = req.params.pid;
    const { title, description, price, thumbnail, stock, status } = req.body;
    product.updateProduct(Number(id), {
      title,
      description,
      price,
      thumbnail,
      stock,
      status,
    });
    res.status(201).send({ message: "Product updated sucessfully." });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.delete("/products/:pid", (req, res) => {
  try {
    const id = req.params.pid;
    product.deleteProductById(Number(id));
    res.send({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

const cartArr = [];

const cart = new CartManager("cart.json");

router.get("/:cid", (req, res) => {
  try {
    const id = req.params.cid;
    res.send(cart.getCartById(Number(id)));
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post("/cart", (req, res) => {
  try {
    const product = req.body;
    cart.addProduct(product);
    res.status(201).send({ message: "New cart created successfully." });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post("/:cid/product/:pid", (req, res) => {
  try {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;

    //A ser implementado
    //res.status(201).send({ message: "Product successfully added." });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

export default router;
