import axios from "axios"

export async function getBooksByAuthor(query, token) {
    try {
        const config = {
            headers: { 'authorization': token },
            params: query
        }
        const cursor = await axios.get('https://library-book-microservices.onrender.com/books/', config)
        return cursor.data
    } catch (error) {
        console.log('Error' + error.message)
        throw new Error('Failed to fetch book')
    }
}