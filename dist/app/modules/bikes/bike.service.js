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
exports.BikeService = void 0;
const client_1 = require("../../../prisma/client");
const customError_1 = require("../../../utilities/customError");
class BikeService {
    static createBike(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield client_1.prisma.bike.create({
                data: payload
            });
            return result;
        });
    }
    static getAllBikes() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield client_1.prisma.bike.findMany();
            return result;
        });
    }
    static getSingleBike(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield client_1.prisma.bike.findUnique({
                where: {
                    bikeId: id
                }
            });
            if (!result) {
                throw new customError_1.StatusFullError("NotFoundError", `Bike not found with this id: ${id}`, false, 404);
            }
            return result;
        });
    }
}
exports.BikeService = BikeService;
