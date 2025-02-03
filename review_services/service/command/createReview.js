import reviewModel from '../../model/review.js'
import axios from 'axios'

export async function postData(data, token) {
    try {
        const config = {
            headers: { 'authorization': token }
        }
        const bookExists = await axios.get(`https://library-book-microservices.onrender.com/books/${data.book}`, config)
        if (!bookExists) {
            throw new Error('Referenced book does not exist')
        }
        const output = await reviewModel.create(data)
        return output
    } catch (error) {
        console.log('Error ' + error)
        throw new Error('Failed to create data')
    }
}