import express from 'express'
import { dbConnect } from './util/dbConnect.js'
import userRoutes from './route/userRoutes.js'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
// Routes
app.use('/auth', userRoutes)


app.use('*', (req, res) => {
    res.status(404).json({ message: 'Endpoint Not Found' })
})

// Start server
app.listen(process.env.PORT, (error) => {
    try {
        dbConnect()
        if (error) throw new Error(error)
        console.log(`User Microservice Server running on ${process.env.PORT}`)
    } catch (error) {
        console.error('Error: ' + error.message)
    }
})
