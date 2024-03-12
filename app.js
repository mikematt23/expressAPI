const express = require('express')
const app = express()
const cors = require('cors')


app.use(cors())
app.use(express.json())

app.listen(port)

console.log(`app listening on port ${port}`)