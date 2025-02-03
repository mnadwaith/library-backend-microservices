import { Router } from 'express'
import { createNewBook, deleteBook, getAllBooks, getBooksById, updateBook, getAuthorOfBook } from '../controller/bookController.js'
import { tokenVerification } from '../middleware/authMiddleware.js'
import { roleVerification } from '../middleware/roleMiddleware.js'
import { eventLogging } from '../middleware/eventSourcing.js'
import { cashing, invalidate } from '../middleware/cashingMiddleware.js'


const router = Router()

// api routes
router.get('/', tokenVerification, roleVerification('user', 'admin'), cashing, getAllBooks) // get all books
router.get('/:id', tokenVerification, roleVerification('user', 'admin'), getBooksById) // get book of given id
router.get('/:id/author', tokenVerification, roleVerification('user', 'admin'), getAuthorOfBook) // get author details of the give book
router.delete('/:id', tokenVerification, roleVerification('admin'), eventLogging("Book"), invalidate('/books*'), deleteBook) // delete the book
router.put('/:id', tokenVerification, roleVerification('admin'), eventLogging("Book"), invalidate('/books*'), updateBook) // update the book details
router.post('/', tokenVerification, roleVerification('admin'), eventLogging("Book"), invalidate('/books*'), createNewBook) // add new books

export default router