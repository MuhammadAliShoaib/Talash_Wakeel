import express from "express";
const router = express.Router();
import { db } from "../models/index.js";

router.get("/getFirms", async (req, res) => {
  try {
    const firms = await db.Firm.find();
    // console.log(firms);
    if (firms !== null) {
      res.status(200).json(firms);
    } else res.status(404).json({ message: "No Firms Found" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/getClients", async (req, res) => {
  try {
    const client = await db.Client.find();
    // console.log(client);
    if (client !== null) {
      res.status(200).json(client);
    } else res.status(404).json({ message: "No client Found" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

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

router.delete("/removeClient", async (req, res) => {
  const { clientID } = req.body;
  try {
    const client = await db.Client.findOneAndDelete({ clientID });
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({ message: "Client Removed Successfully" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
