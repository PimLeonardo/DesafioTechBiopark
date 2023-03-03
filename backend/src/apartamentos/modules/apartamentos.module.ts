import { Apartamento } from "@prisma/client";
import { prisma } from "../../services/prisma";
import { apartamentosDTO } from "./dtos/apartamentosDTO";

export const createApartamento = async ({ numero, aluguel, locatario, locador, disponivel, id_edificio }: apartamentosDTO): Promise<Apartamento> => {
  const apartamento = await prisma.apartamento.create({
    data: {
      numero, 
      aluguel, 
      locatario, 
      locador, 
      disponivel, 
      id_edificio,
    }
  });
  return apartamento;
};

export const findAllApartamentos = async (req): Promise<Apartamento[]> => {
  const id =  parseInt(req.params.id)
  const apartamentos = await prisma.apartamento.findMany({
    where:{
      id_edificio: id
    },
    orderBy: {
      numero: 'desc',
    },
  })
  return apartamentos;
}

export const findIdApartamentos = async (req) => {
  const id =  parseInt(req.params.id)
  const apartamentos = await prisma.apartamento.findUnique({
    where:{
      id: id
    },
  })
  return apartamentos;
}

export const updateApartamentos = async (req) => {
  const id =  parseInt(req.params.id)
  const apartamentos = await prisma.apartamento.updateMany({
    where: {
      id: id,
    },
    data: req.body,
  })
  return apartamentos;
}

export const deleteApartamentos = async (req) => {
  const id =  parseInt(req.params.id)
  const apartamentos = await prisma.apartamento.delete({
    where:{
      id: id
    },
  })
  return apartamentos;
}