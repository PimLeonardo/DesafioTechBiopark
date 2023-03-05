import { createApartamento, deleteApartamentos, findAllApartamentos, findIdApartamentos, updateApartamentos } from "../modules/apartamentos.module";
import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
    try {
        const apartamento  = await createApartamento(req.body)
        res.status(201).json(apartamento)
    } catch (error) {
        res.status(400).json({messagem: error.message})
    }
}

export const findAll = async (req: Request, res: Response) => {
    try {
        const apartamentos  = await findAllApartamentos(req)
        res.status(201).json(apartamentos)
    } catch (error) {
        res.status(400).json({messagem: error.message})
    }
}

export const findId = async (req: Request, res: Response) => {
    try {
        const apartamentos  = await findIdApartamentos(req)
        res.status(201).json(apartamentos)
    } catch (error) {
        res.status(400).json({messagem: error.message})
    }
}

export const updateId = async (req: Request, res: Response) => {
    try {
        const apartamentos  = await updateApartamentos(req)
        res.status(201).json(apartamentos)
    } catch (error) {
        res.status(400).json({messagem: error.message})
    }
}

export const deleteId = async (req: Request, res: Response) => {
    try {
        const apartamentos  = await deleteApartamentos(req)
        res.status(201).json(apartamentos)
    } catch (error) {
        res.status(500).json({messagem: error.message})
    }
}