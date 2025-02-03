import { getItem } from "../service/searchItem.js"

async function search(req, res) {
    try {
        const query = req.query.q || ''
        const filter = req.query.filter || ''
        const type = req.query.type || 'all'

        const output = await getItem(query, filter, type, req.headers.authorization || req.headers.Authorization)

        // if ((output && output.length == 0) || (output.author.length == 0 && output.book.length == 0)) {
        //     return res.status(404).json({ message: "No items found" })
        // }

        return res.status(200).json(output)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export { search }