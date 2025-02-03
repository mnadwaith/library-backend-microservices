import axios from "axios";
import bookModel from "../../model/book.js";

export async function deleteData(filter, token) {
    try {
        let output
        const currentBook = await bookModel.findOne({ _id: filter })
        const currentAuthor = currentBook.author

        const config = {
            headers: { 'updateOpp': '$pull', 'authorization': token }
        }

        await axios.put(`https://library-author-microservices.onrender.com/authors/${currentAuthor}`, { books: filter }, config)
        output = await bookModel.findByIdAndDelete(filter)
        return output
    } catch (error) {
        console.log('Error' + error.message)
        throw new Error('Failed to delete the book')
    }
}
