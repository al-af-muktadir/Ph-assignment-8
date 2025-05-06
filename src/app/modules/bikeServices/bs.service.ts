import { subDays } from "date-fns";
import { prisma } from "../../../prisma/client";
import { StatusFullError } from "../../../utilities/customError";

const createServiceRecord = async (payload: any) => {
  const result = await prisma.serviceRecord.create({
    data: payload,
  });

  return result;
};

const getAllServiceRecords = async () => {
  const result = await prisma.serviceRecord.findMany();
  if (!result) {
    throw new StatusFullError(
      "NotFoundError",
      "Services not found",
      false,
      404
    );
  }
  return result;
};

const getSingleServiceRecord = async (id: string) => {
  const result = await prisma.serviceRecord.findUnique({
    where: {
      serviceId: id,
    },
  });
  if (!result) {
    throw new StatusFullError(
      "NotFoundError",
      `Service not found with this id: ${id}`,
      false,
      404
    );
  }
  return result;
};

const updateServiceRecord = async (id: string, completionDate?: string) => {
  const service = await prisma.serviceRecord.findUnique({
    where: {
      serviceId: id,
    },
  });
  if (!service) {
    throw new StatusFullError(
      "NotFoundError",
      `Service not found with this id: ${id}`,
      false,
      404
    );
  }
  if (service.status === "done") {
    throw new StatusFullError("NotFoundError", "ALready Completed", false, 404);
  }

  const completedDate = completionDate ? new Date(completionDate) : new Date();

  const result = await prisma.serviceRecord.update({
    where: {
      serviceId: id,
    },
    data: {
      completionDate: completedDate,
      status: "done",
    },
  });
  return result;
};

const getAllPendingServiceRecords = async () => {
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
};
export const ServiceRecordService = {
  getAllServiceRecords,
  createServiceRecord,
  getSingleServiceRecord,
  updateServiceRecord,
  getAllPendingServiceRecords,
};
