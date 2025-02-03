import mongoose, { Schema } from 'mongoose'

const reviewSchema = new mongoose.Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'BookData',
        required: true
    },
    review: {
        type: String,
        default: "NA"
    },
    rating: {
        type: Number,
        default: 0,
        enum: [0, 1, 2, 3, 4, 5]
    }
}, { versionKey: false })

const reviewModel = mongoose.model('BookReview', reviewSchema)

export default reviewModel