import express from "express";
const router = express.Router();
import { db } from "../models/index.js";

router.delete("/removeFirm", async (req, res) => {
  const { firmCouncilId } = req.body;
  try {
    const firm = await db.Firm.findOneAndDelete({ firmCouncilId });
    if (!firm) {
      return res.status(404).json({ message: "Firm not found" });
    }

    await db.Lawyer.deleteMany({ firmCouncilId });

    res
      .status(200)
      .json({ message: "Firm and Associated Lawyers Removed Successfully" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
