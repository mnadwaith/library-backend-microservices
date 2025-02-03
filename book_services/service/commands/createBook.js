import bookModel from "../../model/book.js"
import axios from "axios";

export async function postData(data, token) {
    let output;
    let result = []
    try {
        // Checks if the body is an arrary or not
        const items = Array.isArray(data) ? data : [data]
        for (let item of items) { // Iterates over the array element and push the data into the database
            let config = {
                headers: { 'authorization': token }
            }
            //Validating the author id
            const authorExists = await axios.get(`https://library-author-microservices.onrender.com/authors/${item.author}`, config)
            if (!authorExists) {
                throw new Error('Referenced author does not exist')
            }

            output = await bookModel.create(item)
            config = {
                headers: { 'updateOpp': '$push', 'authorization': token }
            }
            await axios.put(`https://library-author-microservices.onrender.com/authors/${item.author}`, { books: output._id }, config)
            result.push(output)
        }
        return result;
    } catch (error) {
        console.log('Error' + error.message)
        throw new Error('Failed to create the book')
    }
}

