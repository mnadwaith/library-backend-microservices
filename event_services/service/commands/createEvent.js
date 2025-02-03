import eventModel from '../../model/event.js'

export async function postData(data) {
    try {
        await eventModel.create(data)
    } catch (error) {
        console.log("Error " + error.message)
        throw new Error("Failed to log the event")
    }
}