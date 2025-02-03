import { postData } from "../service/commands/createBook.js"
import { deleteData } from "../service/commands/deleteBook.js"
import { updateData } from "../service/commands/updateBook.js"
import { getAuthorByBook } from "../service/queries/getAuthorUsingBook.js"
import { getDataById } from "../service/queries/getBookById.js"
import { getData } from "../service/queries/getBooks.js"
import mongoose from "mongoose"
import client from "../util/redisClient.js"
import io from 'socket.io-client'

// Get all the books
async function getAllBooks(req, res) {
    try {
        const { title, author, genre } = req.query
        let query = {}
        if (genre) query.genre = genre
        if (author) query.author = new mongoose.Types.ObjectId(author)
        if (title) query.title = title
        let output = await getData(query)
        client.setEx(req.originalUrl, 3600, JSON.stringify(output))
        res.status(200).json(output)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// Get book by ID
async function getBooksById(req, res) {
    try {
        let query = { _id: req.params.id }
        let output = await getDataById(query)
        res.status(200).json(output)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// Create new book
async function createNewBook(req, res) {
    try {
        const socket = io(process.env.SOCKET_URL)
        let data = req.body
        let output = await postData(data, req.headers.Authorization || req.headers.authorization)
        // Web socket Communication
        socket.emit("newBookorAuthor", { type: "book", action: "created", data: output })
        res.status(200).json(output)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Delete a book
async function deleteBook(req, res) {
    try {
        const socket = io(process.env.SOCKET_URL)
        let filter = req.params.id
        let output = await deleteData(filter, req.headers.Authorization || req.headers.authorization)
        // Web socket Communication
        socket.emit("newBookorAuthor", { type: "book", action: "deleted", data: output })
        res.status(200).json(output)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Delete a book
async function updateBook(req, res) {
    try {
        const socket = io(process.env.SOCKET_URL)
        let filter = { _id: req.params.id }
        let newData = req.body
        let output = await updateData(filter, newData, req.headers.Authorization || req.headers.authorization)
        // Web socket Communication
        socket.emit("newBookorAuthor", { type: "book", action: "updated", data: output })
        res.status(200).json(output)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Get author of the book
async function getAuthorOfBook(req, res) {
    try {
        let query = { _id: req.params.id };
        let currentBook = await getDataById(query)
        if (!currentBook || currentBook.length == 0) {
            return res.status(404).json({ message: 'Book not found' })
        }
        let output = await getAuthorByBook(currentBook[0].author, req.headers.Authorization || req.headers.authorization)
        if (output.length == 0) {
            return res.status(404).json({ message: "Author does not exist" })
        }
        res.status(200).json(output)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export { getAllBooks, getBooksById, createNewBook, deleteBook, updateBook, getAuthorOfBook }