import { prisma } from "../../../prisma/client";
import { StatusFullError } from "../../../utilities/customError";

const createBike = async (payload: any) => {
  const result = await prisma.bike.create({
    data: payload,
  });
  return result;
};

const getAllBikes = async () => {
  const result = await prisma.bike.findMany();
  return result;
};
const getSingleBike = async (id: string) => {
  const result = await prisma.bike.findUnique({
    where: {
      bikeId: id,
    },
  });
  if (!result) {
    throw new StatusFullError(
      "NotFoundError",
      `Bike not found with this id: ${id}`,
      false,
      404
    );
  }
  return result;
};
export const BikeService = {
  getAllBikes,
  createBike,
  getSingleBike,
};
