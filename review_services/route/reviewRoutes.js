import { Router } from "express";
import { createReview, viewReview } from "../controller/reviewController.js";
import { eventLogging } from "../middleware/eventSourcing.js";
import { cashing, invalidate } from "../middleware/cashingMiddleware.js";
import { tokenVerification } from '../middleware/authMiddleware.js'
import { roleVerification } from '../middleware/roleMiddleware.js'

const router = Router()

router.get('/', tokenVerification, roleVerification('admin', 'user'), cashing, viewReview)
router.post('/:id', tokenVerification, roleVerification('admin', 'user'), eventLogging('Review'), invalidate('/review*'), createReview)

export default router