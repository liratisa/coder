import express from "express";
import productRoutes from "./routes/routes.js";

const app = express();

const PORT = 8080;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(productRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
