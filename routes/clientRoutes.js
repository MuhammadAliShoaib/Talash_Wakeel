import express from "express";
const router = express.Router();
import { db } from "../models/index.js";

router.get("/getFirm", async (req, res) => {
  try {
    const firms = await db.Firm.find();
    console.log(firms);
    if (firms !== null) {
      res.status(200).json(firms);
    } else res.status(404).json({ message: "No Firms Found" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default router;
