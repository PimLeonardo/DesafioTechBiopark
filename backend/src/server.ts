import express from "express";
import routes from "./routes";


const PORT = 3333
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(PORT, () => console.log(`Server running port: ${PORT}`))