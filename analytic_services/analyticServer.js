import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import analyticRoutes from './route/analyticRoutes.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/analytics', analyticRoutes)


app.use('*', (req, res) => {
    res.status(404).json({ message: "Endpoint not found" })
})

app.listen(process.env.PORT, (error) => {
    try {
        if (error) throw error
        console.log(`Analytic Service running at port ${process.env.PORT}`)
    } catch (error) {
        console.log(error.message)
    }
})