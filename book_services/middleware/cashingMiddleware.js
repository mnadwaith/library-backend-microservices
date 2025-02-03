import client from "../util/redisClient.js"

export async function cashing(req, res, next) {
    const key = req.originalUrl
    try {
        const data = await client.get(key)
        if (data !== null) {
            return res.status(200).json(JSON.parse(data))
        } else {
            next()
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export function invalidate(pattern) {
    return async (req, res, next) => {
        try {
            let cursor = 0
            let key = []
            do {
                const result = await client.scan(cursor, { MATCH: pattern, COUNT: 100 })
                cursor = result.cursor
                key.push(...result.keys)
            } while (cursor !== 0)
            if (key.length > 0) {
                await client.del(key)
            }
            next()
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}