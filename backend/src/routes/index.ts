import { Router } from "express";
import apartamentosRoutes from "./apartamentos.routes";
import edificiosRoutes from "./edificios.routes";
import locatarioRoutes from "./locatario.routes";

const routes = Router()

routes.use("/edificios", edificiosRoutes)
routes.use("/apartamentos", apartamentosRoutes)
routes.use("/locatario", locatarioRoutes)

export default routes