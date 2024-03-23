import express from "express";
const router = express.Router();
import { db } from "../models/index.js";

router.post("/createFirm", async (req, res) => {
  try {
    const {
      firmID,
      firmName,
      firmEmail,
      firmPhoneNumber,
      firmCity,
      firmPassword,
    } = req.body;
    const firm = await db.Firm.findOne({ firmName });

    if (!firm) {
      await db.Firm.create({
        firmID,
        firmName,
        firmEmail,
        firmPhoneNumber,
        firmCity,
        firmPassword,
      });

      res.status(201).json({ message: "Firm Registered" });
    } else {
      res.status(409).json({ messgae: "Firm already Exists" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const firm = await db.Firm.findOne({ firmEmail: req.body.email });

    if (firm !== null) {
      res.status(200).json(firm);
    } else {
      res.status(404).json({ message: "Firm Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
