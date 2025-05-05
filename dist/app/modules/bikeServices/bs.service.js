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
exports.ServiceRecordService = void 0;
const date_fns_1 = require("date-fns");
const client_1 = require("../../../prisma/client");
const customError_1 = require("../../../utilities/customError");
class ServiceRecordService {
    static createServiceRecord(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield client_1.prisma.serviceRecord.create({
                data: payload
            });
            //   data: [
            //     {
            //     //   serviceId: "111",
            //       bikeId: "a01e73e8-760c-4870-a3ca-fbc21015e1e2",
            //       serviceDate: new Date("2025-04-01T10:00:00Z"), // more than 7 days ago
            //       description: "Oil change",
            //       status: "pending",
            //     },
            //     {
            //     //   serviceId: "222",
            //       bikeId: "a01e73e8-760c-4870-a3ca-fbc21015e1e2",
            //       serviceDate: new Date("2025-04-02T10:00:00Z"), // more than 7 days ago
            //       description: "Tuning",
            //       status: "in_progress",
            //     },
            //     {
            //     //   serviceId: "333",
            //       bikeId: "a01e73e8-760c-4870-a3ca-fbc21015e1e2",
            //       serviceDate: new Date(), // today
            //       description: "Brake fix",
            //       status: "pending",
            //     },
            //     {
            //     //   serviceId: "444",
            //       bikeId: "36bffd1f-03be-41cd-8fe6-64498775d842",
            //       serviceDate: new Date("2025-04-01T10:00:00Z"),
            //       description: "Fixing chain",
            //       status: "done",
            //     },
            //   ],
            // });
            return result;
        });
    }
    static getAllServiceRecords() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield client_1.prisma.serviceRecord.findMany();
            if (!result) {
                throw new customError_1.StatusFullError("NotFoundError", "Services not found", false, 404);
            }
            return result;
        });
    }
    static getSingleServiceRecord(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield client_1.prisma.serviceRecord.findUnique({
                where: {
                    serviceId: id
                }
            });
            if (!result) {
                throw new customError_1.StatusFullError("NotFoundError", `Service not found with this id: ${id}`, false, 404);
            }
            return result;
        });
    }
    static updateServiceRecord(id, completionDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = yield client_1.prisma.serviceRecord.findUnique({
                where: {
                    serviceId: id
                }
            });
            if (!service) {
                throw new customError_1.StatusFullError("NotFoundError", `Service not found with this id: ${id}`, false, 404);
            }
            if (service.status === "done") {
                throw new customError_1.StatusFullError("NotFoundError", 'Service is already marked as completed', false, 404);
            }
            const completedDate = completionDate ? new Date(completionDate) : new Date();
            const result = yield client_1.prisma.serviceRecord.update({
                where: {
                    serviceId: id
                },
                data: {
                    completionDate: completedDate,
                    status: "done"
                }
            });
            return result;
        });
    }
    static getAllPendingServiceRecords() {
        return __awaiter(this, void 0, void 0, function* () {
            const weekAgo = (0, date_fns_1.subDays)(new Date(), 7);
            const result = yield client_1.prisma.serviceRecord.findMany({
                where: {
                    AND: [
                        {
                            OR: [
                                {
                                    status: {
                                        in: ["pending", "in_progress"],
                                    },
                                },
                            ],
                        },
                        {
                            serviceDate: {
                                lt: weekAgo,
                            },
                        },
                    ],
                },
            });
            return result;
        });
    }
}
exports.ServiceRecordService = ServiceRecordService;
