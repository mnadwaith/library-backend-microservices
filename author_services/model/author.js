import mongoose from 'mongoose'
const { Schema } = mongoose

// Create the Author Schema 
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: false
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'BookData',
        required: false
    }],
    isDelete: {
        type: Boolean,
        default: false
    }
}, { versionKey: false })

authorSchema.index({ isDelete: 1, name: 1 })
authorSchema.index({ name: 'text' })
// Build the Author data model
const authorModel = mongoose.model('AuthorData', authorSchema)

// Export model
export default authorModel