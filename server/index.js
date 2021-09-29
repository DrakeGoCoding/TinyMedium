const dotenv = require('dotenv')
dotenv.config()

const port = process.env.PORT || 8080
const express = require('express')
const app = express()
const cors = require('cors')

const connection = require('./db')
const db = async () => await connection();
db()

const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const profileRoute = require('./routes/profileRoute')
const articleRoute = require('./routes/articleRoute')

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.use('/users', authRoute)
app.use('/user', userRoute)
app.use('/profiles', profileRoute)
app.use('/articles', articleRoute)

app.use((error, req, res, next) => {
	res.status(500).json({ error: error.message })
})

app.listen(port, () => { console.log('Listening to PORT:' + port) })

module.exports = app
