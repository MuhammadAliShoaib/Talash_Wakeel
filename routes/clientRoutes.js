import express from "express";
const router = express.Router();
import { db } from "../models/index.js";

router.get("/testing", async (req, res) => {
  console.log("This shit be bussin bussin.");
  res.status(200).json({ message: "Cool Cool" });
});

export default router;
