import { Router } from "express";
import { CustomerController } from "./customer.controller";

const CustomerRoute: Router = Router();

CustomerRoute.post('/', CustomerController.createCustomer)
CustomerRoute.get('/',CustomerController.getAllCustomers)
CustomerRoute.get("/:id", CustomerController.getSingleCustomer);
CustomerRoute.put('/:id', CustomerController.updateCustomer);
CustomerRoute.delete('/:id',CustomerController.deleteCustomer)
export default CustomerRoute;