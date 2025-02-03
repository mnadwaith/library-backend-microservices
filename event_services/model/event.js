import mongoose from 'mongoose'

const eventSchems = new mongoose.Schema({
    entity: {
        type: String,
        required: true,
        enum: ["Book", "Author", 'Review']
    },
    operation: {
        type: String,
        required: true,
        enum: ["CREATE", "UPDATE", "DELETE"]
    },
    data: {
        type: Object,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    }
}, { versionKey: false })

eventSchems.index({ entity: 1, operation: 1 })

const eventModel = mongoose.model('EventLogs', eventSchems)

export default eventModel