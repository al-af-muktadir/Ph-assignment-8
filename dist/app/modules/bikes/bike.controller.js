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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeController = void 0;
const catchAsync_1 = __importDefault(require("../../../utilities/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utilities/sendResponse"));
const bike_service_1 = require("./bike.service");
class BikeController {
}
exports.BikeController = BikeController;
_a = BikeController;
BikeController.createBike = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_service_1.BikeService.createBike(req.body);
    (0, sendResponse_1.default)(res, true, "Bike added successfully", undefined, result);
}));
BikeController.getAllBikes = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_service_1.BikeService.getAllBikes();
    (0, sendResponse_1.default)(res, true, "Bikes fetched successfully", undefined, result);
}));
BikeController.getSingleBike = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_service_1.BikeService.getSingleBike(req.params.id);
    (0, sendResponse_1.default)(res, true, "Bike fetched successfully", undefined, result);
}));
