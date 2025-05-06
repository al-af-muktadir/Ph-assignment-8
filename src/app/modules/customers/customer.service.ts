import { prisma } from "../../../prisma/client";
import { StatusFullError } from "../../../utilities/customError";

const createCustomer = async (payload: any) => {
  const result = await prisma.customer.create({
    data: payload,
  });
  return result;
};

const getAllCustomers = async () => {
  const result = await prisma.customer.findMany({
    where: {
      isDeleted: false,
    },
  });
  return result;
};

const getSingleCustomer = async (id: string) => {
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
      isDeleted: false,
    },
  });
  return result;
};

const updateCustomer = async (id: string, payload: any) => {
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
      isDeleted: false,
    },
    data: payload,
  });
  return result;
};

const deleteCustomer = async (id: string) => {
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
      isDeleted: false,
    },
    data: {
      isDeleted: true,
    },
  });

  return result;
};

export const CustomerService = {
  deleteCustomer,
  getAllCustomers,
  getSingleCustomer,
  createCustomer,
  updateCustomer,
};
