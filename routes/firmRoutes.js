import express from "express";
const router = express.Router();
import { db } from "../models/index.js";

router.post("/addLawyer", async (req, res) => {
  const {
    lawyerBarCouncilId,
    firmBarCouncilId,
    firstName,
    lastName,
    email,
    password,
    field,
  } = req.body;

  try {
    const lawyer = await db.Lawyer.findOne({ lawyerBarCouncilId, email });

    if (lawyer)
      return res.status(409).json({ message: "Lawyer Already Exists" });

    await db.Lawyer.create({
      firmBarCouncilId,
      lawyerBarCouncilId,
      firstName,
      lastName,
      email,
      password,
      field,
      isDeleted: false,
    });

    res.status(200).json({ message: "Lawyer Registered" });
  } catch (error) {
    console.log("Error: ", error);
    res.sendStatus(500);
  }
});

router.get("/getLawyers", async (req, res) => {
  const { id } = req.query;
  console.log("Id: ", id);
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

router.get("/getAppointments", async (req, res) => {
  const { id } = req.query;
  console.log("Id: ", id);
  try {
    const bookings = await db.Booking.find({ firmBarCouncilId: id });
    console.log(bookings);
    if (bookings == null) return res.sendStatus(404);
    res.status(200).json(bookings);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default router;
