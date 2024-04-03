import express from "express";
const router = express.Router();
import { db } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

router.post("/createFirm", async (req, res) => {
  try {
    const {
      firmID,
      firmName,
      barCouncilId,
      firmEmail,
      firmPhoneNumber,
      firmCity,
      firmPassword,
    } = req.body;
    const firm = await db.Firm.findOne({ firmName });
    if (firm !== null)
      return res.status(409).json({ message: "Firm Already Exists" });

    if (!firm) {
      await db.Firm.create({
        firmID,
        firmName,
        barCouncilId,
        firmEmail,
        firmPhoneNumber,
        firmCity,
        firmPassword,
      });

      res.status(201).json({ message: "Firm Registered" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const firm = await db.Firm.findOne({ firmEmail: email });
    if (firm === null)
      return res.status(404).json({ message: "Firm Not Found" });
    const match = bcrypt.compareSync(password, firm.firmPassword);

    if (match) {
      // jwt Auth
      res.status(200).json(firm);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
