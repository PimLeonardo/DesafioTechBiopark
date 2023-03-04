import express from "express";
import routes from "./routes";
import bodyParser from 'body-parser';

const PORT = 3333
let app = express()
const cors = require('cors')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(PORT, () => console.log(`Server running port: ${PORT}`))