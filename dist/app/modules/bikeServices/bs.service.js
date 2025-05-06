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
const createServiceRecord = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield client_1.prisma.serviceRecord.create({
        data: payload,
    });
    return result;
});
const getAllServiceRecords = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield client_1.prisma.serviceRecord.findMany();
    if (!result) {
        throw new customError_1.StatusFullError("NotFoundError", "Services not found", false, 404);
    }
    return result;
});
const getSingleServiceRecord = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield client_1.prisma.serviceRecord.findUnique({
        where: {
            serviceId: id,
        },
    });
    if (!result) {
        throw new customError_1.StatusFullError("NotFoundError", `Service not found with this id: ${id}`, false, 404);
    }
    return result;
});
const updateServiceRecord = (id, completionDate) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield client_1.prisma.serviceRecord.findUnique({
        where: {
            serviceId: id,
        },
    });
    if (!service) {
        throw new customError_1.StatusFullError("NotFoundError", `Service not found with this id: ${id}`, false, 404);
    }
    if (service.status === "done") {
        throw new customError_1.StatusFullError("NotFoundError", "ALready Completed", false, 404);
    }
    const completedDate = completionDate ? new Date(completionDate) : new Date();
    const result = yield client_1.prisma.serviceRecord.update({
        where: {
            serviceId: id,
        },
        data: {
            completionDate: completedDate,
            status: "done",
        },
    });
    return result;
});
const getAllPendingServiceRecords = () => __awaiter(void 0, void 0, void 0, function* () {
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
exports.ServiceRecordService = {
    getAllServiceRecords,
    createServiceRecord,
    getSingleServiceRecord,
    updateServiceRecord,
    getAllPendingServiceRecords,
};
