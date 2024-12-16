import fs from "fs";

class CartManager {
  constructor(path) {
    this.path = path;
    this.id = this.getCart().length;
    this.products = this.getCart();
  }

  addProduct(productInfo) {
    const emptyCheck = Object.values(productInfo).some((element) => !element);

    if (emptyCheck) {
      throw new Error("All fields are required.");
    }

    this.products.push({ ...productInfo, id: this.id++ });
    const jsonArr = JSON.stringify(this.products);

    fs.writeFileSync(this.path, jsonArr);
  }

  getCart() {
    try {
      return JSON.parse(fs.readFileSync(this.path));
    } catch {
      return [];
    }
  }

  getCartById(id) {
    const searchById = this.products.find((item) => item.id === id);

    if (searchById) {
      return searchById;
    }
    throw new Error("Cart not found.");
  }

  updateCart(id, attributes) {
    const searchById = this.products.findIndex((item) => item.id === id);

    if (searchById != -1) {
      const updatedObject = { ...this.products[searchById], ...attributes };

      this.products.splice(searchById, 1, updatedObject);

      const jsonArr = JSON.stringify(this.products);
      fs.writeFileSync(this.path, jsonArr);

      return this.products;
    }

    throw new Error("Cart not found.");
  }
}

export default CartManager;
