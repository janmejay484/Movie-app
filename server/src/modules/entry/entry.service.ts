import prisma from "../../config/prisma";

export const createEntry = async (data: any) => {
  // Remove id if it comes from frontend
  const { id, ...rest } = data;
  return prisma.entry.create({ data: rest });
};


export const getEntries = async (userId: number, page: number, limit: number) => {
  const skip = (page - 1) * limit;
  return prisma.entry.findMany({
    where: { userId },
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  });
};

export const updateEntry = async (id: number, data: any) =>
  prisma.entry.update({ where: { id }, data });

export const deleteEntry = async (id: number) =>
  prisma.entry.delete({ where: { id } });
