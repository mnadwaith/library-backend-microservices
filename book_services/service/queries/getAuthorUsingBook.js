import axios from "axios"

export async function getAuthorByBook(id, token) {
    try {
        const config = {
            headers: { 'authorization': token }
        }
        const cursor = await axios.get(`https://library-author-microservices.onrender.com/authors/${id}`, config)
        return cursor.data
    } catch (error) {
        console.log('Error' + error.message)
        throw new Error('Failed to fetch author')
    }
}