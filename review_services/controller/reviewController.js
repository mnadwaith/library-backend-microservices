import { postData } from "../service/command/createReview.js"
import mongoose from "mongoose"
import io from 'socket.io-client'
import { getData } from "../service/query/getReview.js"


async function createReview(req, res) {
    const socket = io(process.env.URL)
    try {
        const data = {
            book: new mongoose.Types.ObjectId(req.params.id),
            review: req.body.review,
            rating: req.body.rating
        }
        const output = await postData(data, req.headers.Authorization || req.headers.authorization)

        // Web socket Communication
        socket.emit("reviewOrRatingChange", { type: "review", action: "created", data: output })

        res.status(200).json(output)
    } catch (error) {
        console.log('Error ' + error.message)
        res.status(500).json({ message: 'Review not created' })
    }
}

async function viewReview(req, res) {
    try {
        const limit = Number(req.query.limit)
        const output = await getData(limit)
        res.status(200).json(output)
    } catch (error) {
        console.log('Error ' + error.message)
        res.status(404).json({ message: 'Review not found' })
    }
}


export { createReview, viewReview }

