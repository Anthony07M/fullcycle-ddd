import { Request, Response, Router } from "express";
import { CreateCustomerUseCase } from "../../../usecase/customer/create/create-customer.usecase";
import { CustomerRepository } from "../../customer/repository/sequelize/customer.repository";
import { InputCreateCustomerDto } from "../../../usecase/customer/create/dto/create-customer.dto";
import { ListCustomersUseCase } from "../../../usecase/customer/list/list-customers.usecase";

export const customerRoutes = Router();

customerRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const createCustomerUsecase = new CreateCustomerUseCase(
      new CustomerRepository(),
    );
    const inputDto: InputCreateCustomerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        number: req.body.address.number,
        zip: req.body.address.zip,
      },
    };

    const output = await createCustomerUsecase.execute(inputDto);
    return res.send(output);
    
  } catch (err) {
    return res.status(500).send(err);
  }
});


customerRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const listCustomersUseCase = new ListCustomersUseCase(
      new CustomerRepository(),
    );

    const output = await listCustomersUseCase.execute({});

    return res.send(output);
    
  } catch (err) {
    return res.status(500).send(err);
  }
});