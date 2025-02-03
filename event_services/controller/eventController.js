import { getData } from '../service/queries/getAllEvents.js'
import { postData } from '../service/commands/createEvent.js'

// Get all the events
async function getEvent(req, res) {
    try {
        let filter = {}
        const entity = req.query.entity
        const operation = req.query.operation
        const date = req.query.date
        if (entity && operation) {
            filter = {
                "entity": entity,
                "operation": operation
            }
        }
        let output = await getData(filter, date)
        return res.status(200).json(output)
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}


// Log the event
async function logEvent(req, res) {
    try {
        let data = req.body
        await postData(data)
        res.status(200).json()
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}
export { getEvent, logEvent }