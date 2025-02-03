import axios from 'axios'

export function eventLogging(entity) {
    return async (req, res, next) => {
        try {
            let operation = req.method
            if (req.method == "POST") {
                operation = "CREATE"
            } else if (req.method == "PUT") {
                operation = "UPDATE"
            }
            let data = {
                body: {
                    ...req.body
                },
                parametes: {
                    ...req.params
                }
            }
            await axios.post('http://localhost:3004/events/', { entity: entity, operation: operation, data: data, timestamp: new Date().toISOString() }, { timeout: 5000 })
            next()
        } catch (error) {
            console.log(error.message)
            return res.status(406).json({ message: "Invalid informations" })
        }
    }
}