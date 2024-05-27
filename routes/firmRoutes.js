import express from "express";
const router = express.Router();
import { db } from "../models/index.js";

router.post("/addLawyer", async (req, res) => {
  const {
    lawyerCouncilId,
    firmCouncilId,
    firstName,
    lastName,
    email,
    password,
    field,
  } = req.body;

  try {
    const lawyer = await db.Lawyer.findOne({ lawyerCouncilId, email });

    if (lawyer)
      return res.status(409).json({ message: "Lawyer Already Exists" });

    await db.Lawyer.create({
      firmCouncilId,
      lawyerCouncilId,
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
    const lawyers = await db.Lawyer.find({ firmCouncilId: id });
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
  const firmCouncilId = Number(id);
  try {
    const bookings = await db.Booking.aggregate([
      { $match: { firmCouncilId } },
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
    console.log(bookings);
    if (bookings == null) return res.sendStatus(404);
    res.status(200).json(bookings);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default router;
