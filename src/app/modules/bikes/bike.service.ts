import { prisma } from "../../../prisma/client";
import { StatusFullError } from "../../../utilities/customError";

export class BikeService {
    static async createBike(payload:any) {
        const result = await prisma.bike.create({
            data:payload
        })
        return result;
    }

    static async getAllBikes() { 
        const result = await prisma.bike.findMany();
        return result;
    }
    static async getSingleBike(id: string) {
        const result = await prisma.bike.findUnique({
            where: {
                bikeId:id
            }
            
        })
        if (!result) {
            throw new StatusFullError(
              "NotFoundError",
              `Bike not found with this id: ${id}`,
              false,
              404
            );
        }
        return result;
    }
}