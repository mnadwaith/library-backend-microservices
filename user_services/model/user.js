import mongoose from 'mongoose'

// Define user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true, // each user has unique email
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    }

}, { versionKey: false })

// build the model
const userModel = mongoose.model('UserData', userSchema)

export default userModel