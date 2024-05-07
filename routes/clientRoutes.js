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

router.get("/getLawyers", async (req, res) => {
  const { id } = req.query;
  // console.log("Id: ", id);
  try {
    const lawyers = await db.Lawyer.find({ firmBarCouncilId: id });
    console.log(lawyers);
    if (lawyers == null) return res.sendStatus(404);
    res.status(200).json(lawyers);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post("/bookAppointment", async (req, res) => {
  const {
    firmBarCouncilId,
    lawyerBarCouncilId,
    lawyerName,
    clientID,
    clientName,
    bookingDate,
  } = req.body;
  try {
    await db.Booking.create({
      firmBarCouncilId,
      lawyerBarCouncilId,
      lawyerName,
      clientID,
      clientName,
      bookingDate,
    });
    res.status(200).json({ message: "Booking Successfull" });
  } catch (error) {
    console.log("Error: ", error);
    res.sendStatus(500);
  }
});

router.get("/getAppointments", async (req, res) => {
  const { clientID } = req.query;
  console.log(clientID);

  try {
    const bookings = await db.Booking.find({ clientID });

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching appointments" });
  }
});

export default router;
