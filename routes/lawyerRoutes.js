import express from "express";
const router = express.Router();
import { db } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

router.get("/getAppointments", async (req, res) => {
  const { id } = req.query;
  const lawyerCouncilId = Number(id);
  // console.log("Id: ", id);
  try {
    const bookings = await db.Booking.aggregate([
      { $match: { lawyerCouncilId } },
      {
        $lookup: {
          from: "firms",
          localField: "firmCouncilId",
          foreignField: "firmCouncilId",
          as: "firmDetails",
        },
      },
      { $unwind: "$firmDetails" }, // Deconstruct the array to get a single object
      {
        $lookup: {
          from: "lawyers",
          localField: "lawyerCouncilId",
          foreignField: "lawyerCouncilId",
          as: "lawyerDetails",
        },
      },
      { $unwind: "$lawyerDetails" },
      {
        $lookup: {
          from: "clients",
          localField: "clientID",
          foreignField: "clientID",
          as: "clientDetails",
        },
      },
      { $unwind: "$clientDetails" },
      {
        $project: {
          "firmDetails.refreshToken": 0, // Exclude refreshToken from Firm
          "lawyerDetails.refreshToken": 0, // Exclude refreshToken from Firm
          "clientDetails.refreshToken": 0, // Exclude refreshToken from Firm
        },
      },
    ]);
    if (bookings == null) return res.sendStatus(404);
    console.log(bookings);
    res.status(200).json(bookings);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.put("/updateStatus", async (req, res) => {
  const { appointmentId, updatedStatus } = req.body;

  try {
    const booking = await db.Booking.findOne({ appointmentId });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = updatedStatus;
    await booking.save();

    console.log("Status updated:", updatedStatus);
    res.status(200).json({ message: "Status updated successfully" });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/rescheduleAppointment", async (req, res) => {
  const {
    appointmentId,
    updatedStatus,
    updatedBookingDate,
    updatedBookingTime,
  } = req.body;

  try {
    const booking = await db.Booking.findOne({ appointmentId });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.bookingDate = updatedBookingDate;
    booking.bookingTime = updatedBookingTime;
    booking.status = updatedStatus;
    await booking.save();

    res.status(200).json({ message: "Appointment Rescheduled" });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
