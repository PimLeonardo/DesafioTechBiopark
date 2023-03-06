import { Router } from "express";
import {create, findAll, findId, updateId, deleteId} from "../locatario/controllers/locatario.controller"

const locatarioRoutes = Router()

locatarioRoutes.get("/", findAll)
locatarioRoutes.get("/:id", findId)
locatarioRoutes.put("/:id", updateId)
locatarioRoutes.delete("/:id", deleteId)
locatarioRoutes.post("/", create)

export default locatarioRoutes