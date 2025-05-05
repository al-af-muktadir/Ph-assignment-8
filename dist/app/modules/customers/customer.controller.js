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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const catchAsync_1 = __importDefault(require("../../../utilities/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utilities/sendResponse"));
const customer_service_1 = require("./customer.service");
class CustomerController {
}
exports.CustomerController = CustomerController;
_a = CustomerController;
CustomerController.createCustomer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_service_1.CustomerService.createCustomer(req.body);
    const { updatedAt, isDeleted } = result, data = __rest(result, ["updatedAt", "isDeleted"]);
    const trimmedData = Object.assign({}, data);
    (0, sendResponse_1.default)(res, true, "Customer created successfully", undefined, trimmedData);
}));
CustomerController.getAllCustomers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_service_1.CustomerService.getAllCustomers();
    const filteredData = result.map((_b) => {
        var { updatedAt, isDeleted } = _b, rest = __rest(_b, ["updatedAt", "isDeleted"]);
        return (Object.assign({}, rest));
    });
    (0, sendResponse_1.default)(res, true, "Customers fetched successfully", undefined, filteredData);
}));
CustomerController.getSingleCustomer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_service_1.CustomerService.getSingleCustomer(req.params.id);
    if (!result) {
        throw new Error(`Customer could not found by this ${req.params.id}`);
    }
    const { updatedAt, isDeleted } = result, data = __rest(result, ["updatedAt", "isDeleted"]);
    const trimmedData = Object.assign({}, data);
    (0, sendResponse_1.default)(res, true, "Customer fetched successfully", undefined, trimmedData);
}));
CustomerController.updateCustomer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_service_1.CustomerService.updateCustomer(req.params.id, req.body);
    const { updatedAt, isDeleted } = result, data = __rest(result, ["updatedAt", "isDeleted"]);
    const trimmedData = Object.assign({}, data);
    (0, sendResponse_1.default)(res, true, "Customer updated successfully", undefined, trimmedData);
}));
CustomerController.deleteCustomer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_service_1.CustomerService.deleteCustomer(req.params.id);
    (0, sendResponse_1.default)(res, true, "Customer deleted successfully");
}));
