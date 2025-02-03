import bookModel from "../../model/book.js"

//Get book by ID
export async function getDataById(query) {
    try {
        let cursor = await bookModel.find(query)
        return cursor
    } catch (error) {
        console.log('Error' + error.message)
        throw new Error('Failed to fetch book')
    }
}