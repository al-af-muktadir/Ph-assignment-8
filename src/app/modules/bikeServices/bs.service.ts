import { subDays } from "date-fns";
import { prisma } from "../../../prisma/client";
import { StatusFullError } from "../../../utilities/customError";

export class ServiceRecordService {
    static async createServiceRecord(payload:any) {
        const result = await prisma.serviceRecord.create({
            data:payload
        })
        
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
    }

    static async getAllServiceRecords() {
        const result = await prisma.serviceRecord.findMany()
        if (!result) {
          throw new StatusFullError(
            "NotFoundError",
            "Services not found",
            false,
            404
          );
        }
        return result;
    }
    
    static async getSingleServiceRecord(id: string) {
        const result = await prisma.serviceRecord.findUnique({
            where: {
                serviceId:id
            }
        })
        if (!result) {
          throw new StatusFullError(
            "NotFoundError",
            `Service not found with this id: ${id}`,
            false,
            404
          );
        }
        return result;
    }

    static async updateServiceRecord(id: string, completionDate?: string) {
        const service = await prisma.serviceRecord.findUnique({
            where: {
                serviceId: id
            }
        })
        if (!service) {
            throw new StatusFullError(
              "NotFoundError",
              `Service not found with this id: ${id}`,
              false,
              404
            );
        }
        if (service.status === "done") {
            throw new StatusFullError("NotFoundError",'Service is already marked as completed',false,404)
        }

        const completedDate = completionDate ? new Date(completionDate) : new Date();

        const result = await prisma.serviceRecord.update({
            where: {
                serviceId:id
            },
            data: {
                completionDate: completedDate,
                status:"done"
            }
        })
        return result;
    }

    static async getAllPendingServiceRecords() {
        const weekAgo = subDays(new Date(), 7);
          const result = await prisma.serviceRecord.findMany({
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
    }

















}