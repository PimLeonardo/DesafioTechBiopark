import { Router } from "express";
import {create, findAll, findId, updateId, deleteId} from "../apartamentos/controllers/apartamentos.controller"

const apartamentosRoutes = Router()

apartamentosRoutes.get("/:id", findAll)
apartamentosRoutes.get("/apartamento/:id", findId)
apartamentosRoutes.put("/:id", updateId)
apartamentosRoutes.delete("/:id", deleteId)
apartamentosRoutes.post("/", create)

export default apartamentosRoutes