const express = require('express')
const app = express()
const cors = require('cors')
const userRoutes = require('./routes/user')

app.use(cors())
app.use(express.json())
let port = process.env.PORT

app.use(userRoutes)

app.listen(port)

console.log(`app listening on port ${port}`)