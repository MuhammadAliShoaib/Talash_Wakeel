import express from "express";
const router = express.Router();
import { db } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

router.get("/getAppointments", async (req, res) => {
  const { id } = req.query;
  console.log("Id: ", id);
  try {
    const bookings = await db.Booking.find({ lawyerBarCouncilId: id });
    if (bookings == null) return res.sendStatus(404);
    console.log(bookings);
    res.status(200).json(bookings);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default router;
