import { Router } from "express";
import {create, findId, findAll, updateId, deleteId} from "../edificios/controllers/edificios.controller"

const edificiosRoutes = Router()

edificiosRoutes.get("/", findAll)

edificiosRoutes.get("/:id", findId)

edificiosRoutes.put("/:id", updateId)

edificiosRoutes.delete("/:id", deleteId)

edificiosRoutes.post("/", create)

export default edificiosRoutes