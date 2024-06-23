import supertest from "supertest";
import { app, sequelize } from "../express";

describe("E2E /products", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await supertest(app).post("/products").send({
      name: "Product test",
      price: 20,
    });

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(expect.any(String));
    expect(response.body.name).toEqual("Product test");
    expect(response.body.price).toEqual(20);
  });

  it("should not create a product", async () => {
    const response = await supertest(app).post("/products").send({
      name: "Product test",
    });

    expect(response.status).toEqual(500);
  });

  it("should list a products ", async () => {
    const response1 = await supertest(app).post("/products").send({
      name: "Product test 1",
      price: 20,
    });

    const response2 = await supertest(app).post("/products").send({
      name: "Product test 2",
      price: 30,
    });

    const listResponseProducts = await supertest(app).get("/products");

    expect(listResponseProducts.status).toBe(200);
    expect(listResponseProducts.body.products.length).toEqual(2);
    expect(listResponseProducts.body.products[0]).toEqual(response1.body);
    expect(listResponseProducts.body.products[1]).toEqual(response2.body);
  });

  it("should list all customers xml", async () => {
    const response1 = await supertest(app).post("/products").send({
      name: "Product test 1",
      price: 20,
    });

    const response2 = await supertest(app).post("/products").send({
      name: "Product test 2",
      price: 30,
    });

    const listResponseProductsXML = await supertest(app)
      .get("/products")
      .set("Accept", "application/xml")
      .send();

    
    expect(listResponseProductsXML.status).toBe(200);
    expect(listResponseProductsXML.status).toBe(200);
    expect(listResponseProductsXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
    expect(listResponseProductsXML.text).toContain(`<products>`);
    expect(listResponseProductsXML.text).toContain(`<product>`);
    expect(listResponseProductsXML.text).toContain(`<name>Product test 1</name>`);
    expect(listResponseProductsXML.text).toContain(`<price>20</price>`);
    expect(listResponseProductsXML.text).toContain(`</product>`);
    expect(listResponseProductsXML.text).toContain(`<product>`);
    expect(listResponseProductsXML.text).toContain(`<name>Product test 2</name>`);
    expect(listResponseProductsXML.text).toContain(`<price>30</price>`);
    expect(listResponseProductsXML.text).toContain(`</product>`);
    expect(listResponseProductsXML.text).toContain(`</products>`);
  });
});
