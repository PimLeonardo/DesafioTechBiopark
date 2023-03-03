import { Edificio } from "@prisma/client";
import { prisma } from "../../services/prisma";
import { edificiosDTO } from "./dtos/edificiosDTO";

export const createEdificio = async ({ nome, apartamentos }: edificiosDTO): Promise<Edificio> => {
  const edificio = await prisma.edificio.create({
    data: {
      nome,
      apartamentos,
    }
  });
  return edificio;
}

export const findAllEdificios = async (): Promise<Edificio[]> => {
  const edificios = await prisma.edificio.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
  return edificios;
}

export const findEdificio = async (req) => {
  const id =  parseInt(req.params.id)
  const edificio = await prisma.edificio.findUnique({
    where: {
      id: id,
    },
  });
  return edificio;
}

export const updateEdificio = async (req) => {
  const id =  parseInt(req.params.id)
  const edificio = await prisma.edificio.updateMany({
    where: {
      id: id,
    },
    data: req.body,
  })
  return edificio;
}

export const deleteEdificio = async (req) => {
  const id =  parseInt(req.params.id)
  const edificio = await prisma.edificio.delete({
    where:{
      id: id
    },
  })
  return edificio;
}