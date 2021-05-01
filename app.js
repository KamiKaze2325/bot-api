const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

const appRoute = require('./src/routes/routes-photos.js')
app.use('/',appRoute)

app.listen(3000, () => {
    console.log('Server Berjalan pada port : 3000')
})