import { deleteData } from "../service/commands/deleteAuthor.js"
import { getData } from "../service/queries/getAuthors.js"
import { updateData } from "../service/commands/updateAuthor.js"
import { postData } from "../service/commands/createAuthor.js"
import { getBooksByAuthor } from "../service/queries/getBookUsingAuthor.js"
import { getDataById } from "../service/queries/getAuthorById.js"
import client from "../util/redisClient.js"
import mongoose from "mongoose"
import io from 'socket.io-client'

//Get all authors
async function getAllAuthors(req, res) {
    try {
        const { name } = req.query
        let query = { isDelete: false }

        if (name) query.name = name

        let skip
        let page = Number(req.query.page)
        let limit = Number(req.query.limit)
        if (page && limit) {
            skip = (page - 1) * limit
        }

        let output = await getData(query, skip, limit)

        // Cash the data for 1 hour
        client.setEx(req.originalUrl, 3600, JSON.stringify(output))

        res.status(200).json(output)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Get authors by id
async function getAuthorById(req, res) {
    try {
        let query = { _id: new mongoose.Types.ObjectId(req.params.id), isDelete: false }
        let output = await getDataById(query)
        if (output.length == 0) {
            return res.status(404).json({ message: "Author not found" })
        }
        res.status(200).json(output)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Soft delete an author
async function deleteAuthor(req, res) {
    try {
        const socket = io(process.env.URL)
        let filter = req.params.id
        let output = await deleteData(filter)
        if (output.length == 0) {
            return res.status(404).json({ message: "Author already deleted" })
        }
        // Web socket Communication
        socket.emit("newBookorAuthor", { type: "author", action: "deleted", data: output })
        res.status(200).json(output)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Update author details
async function updateAuthor(req, res) {
    try {
        const socket = io(process.env.URL)
        let filter = req.params.id
        let newData = req.body
        let updateOpp = '$set'
        if (req.headers.updateopp) {
            updateOpp = req.headers.updateopp
        }
        let output = await updateData(filter, newData, updateOpp)
        // Web socket Communication
        socket.emit("newBookorAuthor", { type: "author", action: "updated", data: output })
        res.status(200).json(output)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// Create new author
async function createAuthor(req, res) {
    try {
        const socket = io(process.env.URL)
        let data = req.body
        let output = await postData(data)
        // Web socket Communication
        socket.emit("newBookorAuthor", { type: "author", action: "created", data: output })
        res.status(200).json(output)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Get books of author
async function getBooksofAuthor(req, res) {
    try {
        let query = { author: req.params.id }
        let output = await getBooksByAuthor(query, req.headers.Authorization || req.headers.authorization)
        if (output.length == 0) {
            return res.status(404).json({ message: "There are no book by this author" })
        }
        res.status(200).json(output)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export { getAllAuthors, getAuthorById, deleteAuthor, updateAuthor, createAuthor, getBooksofAuthor }