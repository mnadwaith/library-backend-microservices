import mongoose from 'mongoose'

let count = 0;
export async function dbConnect() {
    try {
        count++
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database is Connected")
    } catch (error) {
        if (count <= 5) {
            console.log('Retrying...')
            dbConnect();
        } else {
            console.log('Connection failed')
            console.log('Error ' + error.message)
        }
    }
}