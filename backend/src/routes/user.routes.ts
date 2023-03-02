import { Router } from "express";
import {create} from "../controllers/user.controller"

const userRoutes = Router()
userRoutes.post("/", create)

export default userRoutes