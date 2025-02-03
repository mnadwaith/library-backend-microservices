import { Router } from "express";
import { getAvgRating, getTopBook, getBookAdded } from "../controller/analyticController.js";

const router = Router()

router.get('/topBook', getTopBook)
router.get('/avgRating', getAvgRating)
router.get('/bookPerMonth', getBookAdded)


export default router