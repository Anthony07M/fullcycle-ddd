import supertest from "supertest";
import { app, sequelize } from "../express";

describe("E2E /customers", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await supertest(app)
      .post("/customers")
      .send({
        name: "Jonh Doe",
        address: {
          street: "street",
          city: "city",
          number: 1,
          zip: "000000",
        },
      });

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual("Jonh Doe");
    expect(response.body.address.street).toEqual("street");
    expect(response.body.address.city).toEqual("city");
    expect(response.body.address.number).toEqual(1);
    expect(response.body.address.zip).toEqual("000000");
  });

  it("should not create a customer", async () => {
    const response = await supertest(app).post("/customers").send({
      name: "Jonh Doe",
    });

    expect(response.status).toBe(500);
  });

  it("should list all customers", async () => {
    const response1 = await supertest(app)
      .post("/customers")
      .send({
        name: "Jonh Doe",
        address: {
          street: "street",
          city: "city",
          number: 1,
          zip: "000000",
        },
      });

    const response2 = await supertest(app)
      .post("/customers")
      .send({
        name: "Jane Doe",
        address: {
          street: "street 2",
          city: "city 2",
          number: 2,
          zip: "000002",
        },
      });

    const listResponseCustomers = await supertest(app).get("/customers");

    expect(listResponseCustomers.status).toEqual(200);
    expect(listResponseCustomers.body.customers.length).toEqual(2);

    expect(listResponseCustomers.body.customers[0]).toEqual(response1.body);
    expect(listResponseCustomers.body.customers[1]).toEqual(response2.body);
  });

  it("should list all customers xml", async () => {
    const response1 = await supertest(app)
      .post("/customers")
      .send({
        name: "John Doe",
        address: {
          street: "street",
          city: "city",
          number: 1,
          zip: "000000",
        },
      });

    const response2 = await supertest(app)
      .post("/customers")
      .send({
        name: "Jane Doe",
        address: {
          street: "street 2",
          city: "city 2",
          number: 2,
          zip: "000002",
        },
      });

    const listResponseCustomersXML = await supertest(app)
      .get("/customers")
      .set("Accept", "application/xml")
      .send();


    expect(listResponseCustomersXML.status).toBe(200);
    expect(listResponseCustomersXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
    expect(listResponseCustomersXML.text).toContain(`<customers>`);
    expect(listResponseCustomersXML.text).toContain(`<customer>`);
    expect(listResponseCustomersXML.text).toContain(`<name>John Doe</name>`);
    expect(listResponseCustomersXML.text).toContain(`<address>`);
    expect(listResponseCustomersXML.text).toContain(`<street>street</street>`);
    expect(listResponseCustomersXML.text).toContain(`<city>city</city>`);
    expect(listResponseCustomersXML.text).toContain(`<number>1</number>`);
    expect(listResponseCustomersXML.text).toContain(`<zip>000000</zip>`);
    expect(listResponseCustomersXML.text).toContain(`</address>`);
    expect(listResponseCustomersXML.text).toContain(`</customer>`);
    expect(listResponseCustomersXML.text).toContain(`<name>Jane Doe</name>`);
    expect(listResponseCustomersXML.text).toContain(`<street>street 2</street>`);
    expect(listResponseCustomersXML.text).toContain(`<city>city 2</city>`);
    expect(listResponseCustomersXML.text).toContain(`<number>2</number>`);
    expect(listResponseCustomersXML.text).toContain(`<zip>000002</zip>`);
    expect(listResponseCustomersXML.text).toContain(`</customers>`);
  });
});
