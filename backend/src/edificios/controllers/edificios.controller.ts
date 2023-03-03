import { createEdificio, deleteEdificio, findAllEdificios, findEdificio, updateEdificio } from "../modules/edificios.module";
import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
    try {
        const edificio  = await createEdificio(req.body)
        res.status(201).json(edificio)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const findAll = async (req: Request, res: Response) => {
    try {
        const edificios  = await findAllEdificios()
        res.status(201).json(edificios)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const findId = async (req: Request, res: Response) => {
    try {
        const edificios  = await findEdificio(req)
        res.status(201).json(edificios)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const updateId = async (req: Request, res: Response) => {
    try {
        const edificios  = await updateEdificio(req)
        res.status(201).json(edificios)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const deleteId = async (req: Request, res: Response) => {
    try {
        const edificios  = await deleteEdificio(req)
        res.status(201).json(edificios)
    } catch (error) {
        res.status(400).json(error)
    }
}