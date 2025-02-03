import { Router } from "express";
import { search } from "../controller/searchController.js"

const router = Router()

router.get('/', search)

export default router