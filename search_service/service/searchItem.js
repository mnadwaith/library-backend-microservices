import axios from "axios"

export async function getItem(query, filter, type, token) {
    try {

        let searchResult = { author: [], book: [] }


        if (type == 'author' || type == 'all') {
            // fetch the author details
            let config = {
                headers: { 'authorization': token },
                params: { name: { $regex: query, $options: 'i' } }
            }
            const result = await axios.get('http://localhost:3002/authors', config)
            searchResult.author = result.data
        }

        if (type == 'book' || type == 'all') {
            // fetch book details
            let config = {
                headers: { 'authorization': token },
                params: {
                    title: { $regex: query, $options: 'i' },
                    genre: filter
                }
            }
            const result = await axios.get('http://localhost:3003/books', config)
            searchResult.book = result.data
        }

        if (type == 'author') {
            return searchResult.author
        } else if (type == 'book') {
            return searchResult.book
        } else {
            return searchResult
        }


    } catch (error) {
        console.log("Error " + error.message)
        throw new Error("Failed to search the item.")
    }
}