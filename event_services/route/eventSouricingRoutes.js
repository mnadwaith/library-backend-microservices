import { Router } from 'express';
import { getEvent, logEvent } from '../controller/eventController.js';
// import { tokenVerification } from '../middlewares/authMiddleware.js';
// import { roleVerification } from '../middlewares/roleMiddleware.js';

const router = Router()

router.get('/', getEvent)
router.post('/', logEvent)

export default router