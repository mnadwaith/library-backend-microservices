import { getData } from "../service/getBooks.js"
import { getBookPM } from "../service/getMonthlyBooks.js"
import { getAvg } from "../service/getRating.js"

async function getTopBook(req, res) {
    try {
        const output = await getData(req.headers.Authorization || req.headers.authorization)
        return res.status(200).json(output)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getAvgRating(req, res) {
    try {
        const output = await getAvg(req.headers.Authorization || req.headers.authorization)
        res.status(200).json(output)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getBookAdded(req, res) {
    try {
        const output = await getBookPM()
        res.status(200).json(output)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export { getTopBook, getAvgRating, getBookAdded }