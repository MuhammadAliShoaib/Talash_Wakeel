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
      const accessToken = jwt.sign(
        { user: firm.firmEmail },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "5m" }
      );
      const refreshToken = jwt.sign(
        { user: firm.firmEmail },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      firm.refreshToken = refreshToken;
      await firm.save();

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ accessToken });
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

    const firm = await db.Firm.findOne({ refreshToken: refreshToken });
    if (firm === null) return res.sendStatus(403);

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

    const firm = await db.Firm.findOne({ refreshToken: refreshToken });
    if (firm === null) {
      res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      return res.sendStatus(204);
    }

    firm.refreshToken = "";
    await firm.save();
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(200).json({ message: "Logout Successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
