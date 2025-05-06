"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const client_1 = require("../../../prisma/client");
const customError_1 = require("../../../utilities/customError");
const createCustomer = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield client_1.prisma.customer.create({
        data: payload,
    });
    return result;
});
const getAllCustomers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield client_1.prisma.customer.findMany({
        where: {
            isDeleted: false,
        },
    });
    return result;
});
const getSingleCustomer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield client_1.prisma.customer.findUnique({
        where: {
            customerId: id,
        },
    });
    if (!customer) {
        throw new customError_1.StatusFullError("NotFoundError", `Customer not found with this id: ${id}`, false, 404);
    }
    const result = yield client_1.prisma.customer.findUnique({
        where: {
            customerId: id,
            isDeleted: false,
        },
    });
    return result;
});
const updateCustomer = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield client_1.prisma.customer.findUnique({
        where: {
            customerId: id,
        },
    });
    if (!customer) {
        throw new customError_1.StatusFullError("NotFoundError", `Customer not found with this id: ${id}`, false, 404);
    }
    const result = yield client_1.prisma.customer.update({
        where: {
            customerId: id,
            isDeleted: false,
        },
        data: payload,
    });
    return result;
});
const deleteCustomer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield client_1.prisma.customer.findUnique({
        where: {
            customerId: id,
        },
    });
    if (!customer) {
        throw new customError_1.StatusFullError("NotFoundError", `Customer not found with this id: ${id}`, false, 404);
    }
    const result = yield client_1.prisma.customer.update({
        where: {
            customerId: id,
            isDeleted: false,
        },
        data: {
            isDeleted: true,
        },
    });
    return result;
});
exports.CustomerService = {
    deleteCustomer,
    getAllCustomers,
    getSingleCustomer,
    createCustomer,
    updateCustomer,
};
