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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRecordController = void 0;
const catchAsync_1 = __importDefault(require("../../../utilities/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utilities/sendResponse"));
const bs_service_1 = require("./bs.service");
const createServiceRecord = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bs_service_1.ServiceRecordService.createServiceRecord(req.body);
    (0, sendResponse_1.default)(res, true, "Service record created successfully", undefined, result);
}));
const getAllServiceRecords = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bs_service_1.ServiceRecordService.getAllServiceRecords();
    (0, sendResponse_1.default)(res, true, "Service records fetched successfully", undefined, result);
}));
const getSingleServiceRecord = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bs_service_1.ServiceRecordService.getSingleServiceRecord(req.params.id);
    (0, sendResponse_1.default)(res, true, "Service record fetched successfully", undefined, result);
}));
const updateServiceRecord = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const result = yield bs_service_1.ServiceRecordService.updateServiceRecord((_a = req.params) === null || _a === void 0 ? void 0 : _a.id, (_b = req.body) === null || _b === void 0 ? void 0 : _b.completionDate);
    (0, sendResponse_1.default)(res, true, "Service marked as completed", undefined, result);
}));
const getAllPendingServiceRecords = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bs_service_1.ServiceRecordService.getAllPendingServiceRecords();
    (0, sendResponse_1.default)(res, true, "Overdue or pending services fetched successfully", undefined, result);
}));
exports.ServiceRecordController = {
    getAllPendingServiceRecords,
    updateServiceRecord,
    getSingleServiceRecord,
    getAllServiceRecords,
    createServiceRecord,
};
