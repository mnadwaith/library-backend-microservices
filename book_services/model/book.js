//Import the requred modules
import mongoose from 'mongoose'
const { Schema } = mongoose

// Create the Sechema
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'AuthorData',
        required: true,
    },
    publishedDate: {
        type: Date,
        required: false,
    },
    pages: {
        type: Number,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    }
}, { versionKey: false }) // setting version key as false

bookSchema.index({ author: 1, publishedDate: -1 })
bookSchema.index({ genre: 1 })
bookSchema.index({ title: 'text', genre: 'text' }, { weights: { title: 5, genre: 2 } })
// Create the model
const bookModel = mongoose.model('BookData', bookSchema)

// Export the model
export default bookModel