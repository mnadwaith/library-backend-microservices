import { Router } from 'express'
import { createAuthor, deleteAuthor, getAllAuthors, getAuthorById, getBooksofAuthor, updateAuthor } from '../controller/authorController.js'
import { roleVerification } from '../middleware/roleMiddleware.js'
import { tokenVerification } from '../middleware/authMiddleware.js'
import { eventLogging } from '../middleware/eventSourcing.js'
import { cashing, invalidate } from '../middleware/cashingMiddleware.js'

const router = Router()

// api routes
router.get('/', tokenVerification, roleVerification('admin', 'user'), cashing, getAllAuthors) // get all authors
router.get('/:id', tokenVerification, roleVerification('admin', 'user'), getAuthorById) // get author of given id
router.get('/:id/books', tokenVerification, roleVerification('admin', 'user'), getBooksofAuthor) // get books of given author
router.delete('/:id', tokenVerification, roleVerification('admin'), eventLogging("Author"), invalidate('/authors*'), deleteAuthor) // soft delete an author
router.put('/:id', tokenVerification, roleVerification('admin'), eventLogging("Author"), invalidate('/authors*'), updateAuthor) // update author
router.post('/', tokenVerification, roleVerification('admin'), eventLogging("Author"), invalidate('/authors*'), createAuthor) // add new author

export default router