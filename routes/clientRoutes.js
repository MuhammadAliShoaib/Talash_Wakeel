import express from "express";
const router = express.Router();
import { db } from "../models/index.js";

router.get("/getFirms", async (req, res) => {
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

router.get("/getLawyers", async (req, res) => {
  const { id } = req.query;
  console.log("Id: ", id);
  try {
    const lawyers = await db.Lawyer.find({ firmCouncilId: id });
    console.log(lawyers);
    if (lawyers == null) return res.sendStatus(404);
    res.status(200).json(lawyers);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default router;
