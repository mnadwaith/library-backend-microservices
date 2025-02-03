import express from 'express'
import eventRoutes from './route/eventSouricingRoutes.js'
import { dbConnect } from './util/dbConnect.js'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
app.use(express.json())

// Routes
app.use('/events', eventRoutes)

app.use('*', (req, res) => {
    res.status(404).json({ message: 'Endpoint Not Found' })
})

// Start server
app.listen(process.env.PORT, (error) => {
    try {
        dbConnect()
        if (error) throw new Error(error)
        console.log(`Event Server running on ${process.env.PORT}`)
    } catch (error) {
        console.error('Error: ' + error.message)
    }
})
