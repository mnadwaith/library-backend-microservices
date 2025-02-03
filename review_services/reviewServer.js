import express from 'express'
import dotenv from 'dotenv'
import { dbConnect } from './util/dbConnect.js'
import reviewRoutes from './route/reviewRoutes.js'
import cors from 'cors'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.use('/review', reviewRoutes)

app.listen(process.env.PORT, (error) => {
    try {
        if (error) throw error
        console.log(`Review Server listening to port ${process.env.PORT}`)
        dbConnect()
    } catch (error) {
        console.log('Error ' + error.message)
    }
})