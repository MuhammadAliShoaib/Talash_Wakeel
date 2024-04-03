import express from "express";
const router = express.Router();
import { db } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getUpdatedSequence = async (sequenceName) => {
  const res = await db.Counter.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  return res.seq;
};

router.post("/register", async (req, res) => {
  try {
    const {
      clientFirstName,
      clientLastName,
      clientEmail,
      clientPhoneNumber,
      clientCity,
      clientPassword,
    } = req.body;

    const clientExists = await db.Client.findOne({ clientEmail });

    if (clientExists !== null) {
      res.status(409).json({ message: "Client already exists" });
    } else {
      const sequenceValue = await getUpdatedSequence("client");

      await db.Client.create({
        clientID: sequenceValue,
        clientFirstName,
        clientLastName,
        clientEmail,
        clientPhoneNumber,
        clientCity,
        clientPassword,
        isDeleted: false,
      });

      res.status(201).json({ message: "Client Registered" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await db.Client.findOne({ clientEmail: email });
    if (client === null)
      return res.status(404).json({ message: "Client Not Found" });
    const match = bcrypt.compareSync(password, client.clientPassword);

    if (match) {
      // jwt Auth
      const accessToken = jwt.sign(
        { email: client.clientEmail },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        { email: client.clientEmail },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      res.status(200).json(client);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
