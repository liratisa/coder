import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
    this.code = this.getProducts().length;
    this.products = this.getProducts();
  }

  addProduct(productInfo) {
    const emptyCheck = Object.values(productInfo).some((element) => !element);

    if (emptyCheck) {
      throw new Error("Todos os campos são obrigatórios.");
    }

    this.products.push({ ...productInfo, code: this.code++ });
    const jsonArr = JSON.stringify(this.products);

    fs.writeFileSync(this.path, jsonArr);
  }

  getProducts() {
    try {
      return JSON.parse(fs.readFileSync(this.path));
    } catch {
      return [];
    }
  }

  getProductById(id) {
    const searchById = this.products.find((item) => item.code === id);

    if (searchById) {
      return searchById;
    }

    throw new Error("Produto não encontrado");
  }

  updateProduct(id, attributes) {
    const searchById = this.products.findIndex((item) => item.code === id);

    if (searchById != -1) {
      const updatedObject = { ...this.products[searchById], ...attributes };

      this.products.splice(searchById, 1, updatedObject);

      const jsonArr = JSON.stringify(this.products);
      fs.writeFileSync(this.path, jsonArr);

      return this.products;
    }

    return "Produto não encontrado.";
  }

  deleteProductById(id) {
    const searchById = this.products.findIndex((item) => item.code === id);

    if (searchById != -1) {
      this.products.splice(searchById, 1);

      const jsonArr = JSON.stringify(this.products);
      fs.writeFileSync(this.path, jsonArr);

      return this.products;
    }

    return "Produto não encontrado.";
  }
}

export default ProductManager;
// const productBase = new ProductManager("products.json");

// productBase.addProduct({
//   title: "Notebook",
//   description: "Computador pessoal portátil",
//   price: 4500,
//   thumbnail: "foto.jpg",
//   stock: 15,
// });

// productBase.addProduct({
//   title: "Teclado Gamer",
//   description: "Teclado para jogos online",
//   price: 270,
//   thumbnail: "foto.jpg",
//   stock: 8,
// });

// productBase.getProductById(1);

// productBase.updateProduct(1, {
//   title: "Novo título",
//   description: "Nova descrição",
//   price: 48,
//   thumbnail: "nova_foto.jpg",
//   stock: 1,
// });
