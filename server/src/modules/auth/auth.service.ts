import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../config/prisma";

const SECRET = process.env.JWT_SECRET || "supersecret";

export const registerUser = async (name: string, email: string, password: string) => {
  const hashed = await bcrypt.hash(password, 10);
  return prisma.user.create({ data: { name, email, password: hashed } });
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "1d" });
  return { token, user: { id: user.id, name: user.name, email: user.email } };
};
