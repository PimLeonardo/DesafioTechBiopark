import { Locatario } from "@prisma/client";
import { prisma } from "../../services/prisma";
import { locatarioDTO } from "./dtos/locatarioDTO";

export const createLocatario = async ({ nome, cpf, id_apartamento }: locatarioDTO): Promise<Locatario> => {
  const locatario = await prisma.locatario.create({
    data: {
      nome, 
      cpf, 
      id_apartamento,
    }
  });
  return locatario;
};

export const findAllLocatario = async (): Promise<Locatario[]> => {
  const locatario = await prisma.locatario.findMany({where:{}});
  return locatario;
};

export const findIdLocatario = async (req) => {
  const id_apartamento =  parseInt(req.params.id)
  const locatario = await prisma.locatario.findMany({
    where:{
      id_apartamento
    }
  });
  return locatario;
};

export const updateLocatario = async (req) => {
  const id_apartamento =  parseInt(req.params.id)
  const locatario = await prisma.locatario.updateMany({
    where: {
      id_apartamento,
    },
    data: req.body,
  })
  return locatario;
}

export const deleteLocatario = async (req) => {
  const id_apartamento =  parseInt(req.params.id)
  const locatario = await prisma.locatario.delete({
    where:{
      id_apartamento
    },
  })
  return locatario;
}