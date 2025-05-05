import catchAsync from "../../../utilities/catchAsync";
import sendResponse from "../../../utilities/sendResponse";
import { CustomerService } from "./customer.service";

export class CustomerController {
    static createCustomer = catchAsync(async (req, res) => {
        const result = await CustomerService.createCustomer(req.body);
        const { updatedAt,isDeleted, ...data } = result;
        const trimmedData = {...data};
        sendResponse(res,true,"Customer created successfully",undefined,trimmedData)
    })


    static getAllCustomers = catchAsync(async (req, res) => {
        const result = await CustomerService.getAllCustomers();
        const filteredData = result.map(({updatedAt,isDeleted,...rest})=>({...rest}))
        sendResponse(res,true,"Customers fetched successfully",undefined,filteredData)
    })

    static getSingleCustomer = catchAsync(async (req, res) => {
        const result = await CustomerService.getSingleCustomer(req.params.id);
        if (!result) {
          throw new Error(`Customer could not found by this ${req.params.id}`)
        }
        const { updatedAt, isDeleted, ...data } = result;
        const trimmedData = { ...data };
        sendResponse(
          res,
          true,
          "Customer fetched successfully",
          undefined,
          trimmedData
        );
    })


    static updateCustomer = catchAsync(async (req, res) => {
        const result = await CustomerService.updateCustomer(req.params.id, req.body);
        const { updatedAt, isDeleted, ...data } = result;
        const trimmedData = { ...data };
        sendResponse(
          res,
          true,
          "Customer updated successfully",
          undefined,
          trimmedData
        );
    })


    static deleteCustomer = catchAsync(async (req, res) => {
        const result = await CustomerService.deleteCustomer(req.params.id);
        sendResponse(res,true,"Customer deleted successfully")
    })
}