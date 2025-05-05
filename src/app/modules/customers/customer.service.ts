import { prisma } from "../../../prisma/client";
import { StatusFullError } from "../../../utilities/customError";





export class CustomerService {
    static async createCustomer(payload: any) {
        const result = await prisma.customer.create({
            data: payload
        })
        return result;
    }

    static async getAllCustomers() {
        const result = await prisma.customer.findMany({
            where: {
                isDeleted: false
            }
        });
        return result;
    }

    static async getSingleCustomer(id: string) {
        const customer = await prisma.customer.findUnique({
          where: {
            customerId: id,
          },
        });
        if (!customer) {
          throw new StatusFullError(
            "NotFoundError",
            `Customer not found with this id: ${id}`,
            false,
            404
          );
        }
        const result = await prisma.customer.findUnique({
            where: {
                customerId: id,
                isDeleted: false
           }
        });
        return result;
    }

    static async updateCustomer(id: string, payload: any) {
        const customer = await prisma.customer.findUnique({
            where: {
                customerId: id
            }
        })
        if(!customer){
            throw new StatusFullError(
              "NotFoundError",
              `Customer not found with this id: ${id}`,
              false,
              404
            );
        }
        const result = await prisma.customer.update({
            where: {
                customerId: id,
                isDeleted: false
            },
            data: payload
        })
        return result;
    }


    static async deleteCustomer(id: string) {
        const customer = await prisma.customer.findUnique({
          where: {
            customerId: id,
          },
        });
        if (!customer) {
          throw new StatusFullError(
            "NotFoundError",
            `Customer not found with this id: ${id}`,
            false,
            404
          );
        }
        const result = await prisma.customer.update({
            where: {
                customerId: id,
                isDeleted:false
            },
            data: {
                isDeleted:true
            }
        })
        
        return result;
    }

}