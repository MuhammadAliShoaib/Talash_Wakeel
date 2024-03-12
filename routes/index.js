import express from 'express'
const router = express.Router();
import { db } from '../models/index.js'


router.get("/lawyers", async (req, res) => {
    const result = await db.Lawyer.find();
    res.json(result)
})


export default router;