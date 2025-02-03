import express from 'express'
import dotenv from 'dotenv'
import searchRoutes from './route/searchRoutes.js'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/search', searchRoutes)

app.use('*', (req, res) => {
    res.status(404).json({ message: "Endpoint not found" })
})

app.listen(process.env.PORT, (error) => {
    try {
        if (error) throw error
        console.log(`Search server running on port ${process.env.PORT}`)
    } catch (error) {
        console.log(error)
    }
})