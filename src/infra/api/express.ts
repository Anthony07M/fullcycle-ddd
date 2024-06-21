import express from "express";
import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../customer/repository/sequelize/customer.model";
import { customerRoutes } from "./routes/customer.routing";

export const app = express();
export let sequelize: Sequelize;
app.use(express.json());
app.use("/customers", customerRoutes);

async function setupDB() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });

  await sequelize.addModels([CustomerModel]);
  await sequelize.sync();
}

setupDB();