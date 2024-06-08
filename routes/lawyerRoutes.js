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

router.put("/followUpAppointment", async (req, res) => {
  const {
    appointmentId,
    updatedMode,
    updatedStatus,
    updatedBookingDate,
    updatedBookingTime,
  } = req.body;

  try {
    const booking = await db.Booking.findOne({ appointmentId });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.mode = updatedMode;
    booking.bookingDate = updatedBookingDate;
    booking.bookingTime = updatedBookingTime;
    booking.status = updatedStatus;
    await booking.save();

    res.status(200).json({ message: "Follow Up Updated" });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getDetails", async (req, res) => {
  const { lawyerCouncilId } = req.query;
  try {
    const details = await db.Lawyer.findOne({ lawyerCouncilId });
    if (!details) return res.status(404).json({ message: "Lawyer not found" });
    res.status(200).json(details);
  } catch (error) {
    console.log("Error: ", error);
    res.sendStatus(500);
  }
});

router.put("/updateProfile", async (req, res) => {
  // console.log("Data:.........", req.body);
  try {
    const lawyer = await db.Lawyer.findOne({
      lawyerCouncilId: req.body.lawyerCouncilId,
    });
    if (!lawyer) return res.sendStatus(404);
    lawyer.firstName = req.body.firstName;
    lawyer.lastName = req.body.lastName;
    lawyer.field = req.body.field;
    lawyer.profileUrl = req.body.profileUrl;
    await lawyer.save();

    res.status(200).json({ lawyer, message: "Updated Successfully" });
  } catch (error) {
    console.log("Error: ", error);
    res.sendStatus(500);
  }
});

router.put("/updatePassword", async (req, res) => {
  try {
    const lawyer = await db.Lawyer.findOne({ lawyerCouncilId: req.body.Id });
    if (!lawyer) return res.sendStatus(404);
    lawyer.password = req.body.newHash;
    await lawyer.save();

    res.status(200).json({ lawyer, message: "Updated Successfully" });
  } catch (error) {
    console.log("Error: ", error);
    res.sendStatus(500);
  }
});

router.post("/uploadDocument", async (req, res) => {
  try {
    console.log("Request...", JSON.stringify(req.body, null, 4));
    await db.Document.create({
      ownerId: req.body.ownerId,
      title: req.body.title,
      docURL: req.body.documentUrl,
    });

    res.status(200).json({ message: "Document Uploaded" });
  } catch (error) {
    console.log("Error: ", error);
    res.sendStatus(500);
  }
});

router.get("/getDocuments", async (req, res) => {
  const { ownerId } = req.query;
  try {
    console.log("Request...", JSON.stringify(req.query, null, 4));
    const documents = await db.Document.find({ ownerId });
    if (documents === null) {
      res.status(404).json({ message: "Document Not Found" });
    }

    res.status(200).json({ documents });
  } catch (error) {
    console.log("Error: ", error);
    res.sendStatus(500);
  }
});

export default router;
