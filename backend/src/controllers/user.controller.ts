import { createUser } from "../modules/user.module";
import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
    try {
        const user = await createUser(req.body)
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json(error)
    }
}