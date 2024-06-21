import express from "express";
import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../customer/repository/sequelize/customer.model";
import { customerRoutes } from "./routes/customer.routing";
import { productRoutes } from "./routes/product.routing";
import { ProductModel } from "../product/repository/sequelize/product.model";

export const app = express();
export let sequelize: Sequelize;
app.use(express.json());
app.use("/customers", customerRoutes);
app.use("/products", productRoutes);

async function setupDB() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });

  await sequelize.addModels([CustomerModel, ProductModel]);
  await sequelize.sync();
}

setupDB();