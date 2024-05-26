import express from "express";
const router = express.Router();
import { db } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

router.get("/getAppointments", async (req, res) => {
  const { id } = req.query;
  // console.log("Id: ", id);
  try {
    const bookings = await db.Booking.find({ lawyerCouncilId: id });
    if (bookings == null) return res.sendStatus(404);
    console.log(bookings);
    res.status(200).json(bookings);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.put("/updateStatus", async (req, res) => {
  const { appointmentId, status } = req.body;

  try {
    const booking = await db.Booking.findOne({ appointmentId });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status;
    await booking.save();

    console.log("Status updated:", status);
    res.status(200).json({ message: "Status updated successfully" });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
