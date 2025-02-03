import { Router } from "express";
import { authenticate, login, register, showUsers, editUsers } from "../controller/userController.js";
import tokenVerification from "../middleware/authMiddleware.js";
import roleVerification from "../middleware/roleMiddleware.js";

const router = Router()

router.post('/login', login) // Login route
router.post('/register', register) // Register route
router.get('/authenticate', authenticate) // Authenticate user
router.get('/manage', showUsers)
router.put('/manage/:id', tokenVerification, roleVerification('admin'), editUsers)

export default router