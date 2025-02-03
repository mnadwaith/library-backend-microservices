import bookModel from "../../model/book.js"
import axios from "axios"
import mongoose from "mongoose"

export async function updateData(filter, newData, token) {
    try {
        let output
        const currentBook = await bookModel.findOne(filter)
        const currentAuthor = currentBook.author
        const newAuthor = newData.author
        output = await bookModel.updateOne(filter, { $set: newData })
        if (currentAuthor != newAuthor) {
            let config = {
                headers: { 'updateOpp': '$pull', 'authorization': token }
            }
            await axios.put(`https://library-author-microservices.onrender.com/authors/${currentAuthor}`, { books: filter._id }, config)
            config = {
                headers: { 'updateOpp': '$push', 'authorization': token }
            }
            await axios.put(`https://library-author-microservices.onrender.com/authors/${newAuthor}`, { books: filter._id }, config)
        }
        return output
    } catch (error) {
        console.log('Error' + error.message)
        throw new Error('Failed to update the book')
    }
}
