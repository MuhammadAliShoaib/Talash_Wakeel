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
        { user: client.clientEmail },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "5m" }
      );
      const refreshToken = jwt.sign(
        { user: client.clientEmail },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      client.refreshToken = refreshToken;
      await client.save();

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ client, accessToken });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/refreshToken", async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  try {
    console.log("Cookie: ", cookies.jwt);
    const refreshToken = cookies.jwt;

    const client = await db.Client.findOne({ refreshToken: refreshToken });
    if (client === null) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      const accessToken = jwt.sign(
        { user: user },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "5m" }
      );
      res.status(200).json({ accessToken });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/logout", async (req, res) => {
  const cookies = req.cookies;
  try {
    if (!cookies.jwt) return res.sendStatus(204); // 204 is for no content
    const refreshToken = cookies.jwt;

    const client = await db.Client.findOne({ refreshToken: refreshToken });
    if (client === null) {
      res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      return res.sendStatus(204);
    }

    client.refreshToken = "";
    await client.save();
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(200).json({ message: "Logout Successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
