import { createLocatario, deleteLocatario, findAllLocatario, findIdLocatario, updateLocatario,  } from "../modules/locatario.module";
import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
    try {
        const locatario  = await createLocatario(req.body)
        res.status(201).json(locatario)
    } catch (error) {
        res.status(400).json({messagem: error.message})
    }
}

export const findAll = async (req: Request, res: Response) => {
    try {
        const locatario  = await findAllLocatario()
        res.status(201).json(locatario)
    } catch (error) {
        res.status(400).json({messagem: error.message})
    }
}

export const findId = async (req: Request, res: Response) => {
    try {
        const locatario  = await findIdLocatario(req)
        res.status(201).json(locatario)
    } catch (error) {
        res.status(400).json({messagem: error.message})
    }
}

export const updateId = async (req: Request, res: Response) => {
    try {
        const locatario  = await updateLocatario(req)
        res.status(201).json(locatario)
    } catch (error) {
        res.status(400).json({messagem: error.message})
    }
}

export const deleteId = async (req: Request, res: Response) => {
    try {
        const edificios  = await deleteLocatario(req)
        res.status(201).json(edificios)
    } catch (error) {
        res.status(400).json({messagem: error.message})
    }
}
