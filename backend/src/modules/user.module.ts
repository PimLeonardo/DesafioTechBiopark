import { User } from "@prisma/client";
import { prisma } from "../services/prisma";
import { userDTO } from "./dtos/userDTO";

export const createUser = async ({ nome, email, senha }: userDTO): Promise<User> => {
  const user = await prisma.user.create({
    data: {
      nome,
      email,
      senha
    }
  });
  return user;
};
