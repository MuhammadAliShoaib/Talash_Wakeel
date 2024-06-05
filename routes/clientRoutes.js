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
  const firmCouncilId = Number(id);
  try {
    const lawyers = await db.Lawyer.aggregate([
      { $match: { firmCouncilId } },
      {
        $lookup: {
          from: "firms",
          localField: "firmCouncilId",
          foreignField: "firmCouncilId",
          as: "firmDetails",
        },
      },
      { $unwind: "$firmDetails" },
      {
        $project: {
          refreshToken: 0,
          "firmDetails.refreshToken": 0,
        },
      },
    ]);
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
    appointmentId,
    firmCouncilId,
    lawyerCouncilId,
    lawyerName,
    clientID,
    clientName,
    bookingDate,
    bookingTime,
    status,
    mode,
  } = req.body;
  try {
    await db.Booking.create({
      appointmentId,
      firmCouncilId,
      lawyerCouncilId,
      lawyerName,
      clientID,
      clientName,
      bookingDate,
      bookingTime,
      status,
      mode,
      isRated: false,
    });
    res.status(200).json({ message: "Booking Successfull" });
  } catch (error) {
    console.log("Error: ", error);
    res.sendStatus(500);
  }
});

router.get("/getAppointments", async (req, res) => {
  const { clientID } = req.query;
  const Id = Number(clientID);

  try {
    const bookings = await db.Booking.aggregate([
      { $match: { clientID: Id } },
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

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching appointments" });
  }
});

router.get("/getDetails", async (req, res) => {
  const { clientID } = req.query;
  try {
    const details = await db.Client.findOne({ clientID });
    if (!details) return res.status(404).json({ message: "User not found" });
    res.status(200).json(details);
  } catch (error) {
    console.log("Error: ", error);
    res.sendStatus(500);
  }
});

router.put("/updateProfile", async (req, res) => {
  // console.log("Data:.........", req.body);
  try {
    const client = await db.Client.findOne({ clientID: req.body.clientID });
    if (!client) return res.sendStatus(404);
    client.clientFirstName = req.body.clientFirstName;
    client.clientLastName = req.body.clientLastName;
    client.clientPhoneNumber = req.body.clientPhoneNumber;
    client.clientCity = req.body.clientCity;
    client.profileUrl = req.body.profileUrl;
    await client.save();

    res.status(200).json({ client, message: "Updated Successfully" });
  } catch (error) {
    console.log("Error: ", error);
    res.sendStatus(500);
  }
});

router.put("/updatePassword", async (req, res) => {
  try {
    const client = await db.Client.findOne({ clientID: req.body.Id });
    if (!client) return res.sendStatus(404);
    client.clientPassword = req.body.newHash;
    await client.save();

    res.status(200).json({ client, message: "Updated Successfully" });
  } catch (error) {
    console.log("Error: ", error);
    res.sendStatus(500);
  }
});

router.put("/cancelBooking", async (req, res) => {
  const { updatedStatus, appointmentId } = req.body;
  // console.log("ID: ", appointmentId);
  try {
    const booking = await db.Booking.findOne({ appointmentId });
    if (!booking) return res.sendStatus(404);

    booking.status = updatedStatus;
    booking.save();

    res.status(200).json({ message: "Appointment Canceled" });
  } catch (error) {
    console.log("Error: ", error);
    res.sendStatus(500);
  }
});

router.put("/rating", async (req, res) => {
  const { appointmentId, stars } = req.body;

  try {
    const booking = await db.Booking.findOne({ appointmentId });
    if (!booking) return res.sendStatus(404);

    booking.isRated = true;
    booking.lawyerRating = stars;
    await booking.save();

    const lawyer = await db.Lawyer.findOne({
      lawyerCouncilId: booking.lawyerCouncilId,
    });
    if (!lawyer) return res.sendStatus(404);
    const ratedBookings = await db.Booking.find({
      lawyerCouncilId: booking.lawyerCouncilId,
      isRated: true,
    });

    console.log("Bookings", ratedBookings);

    const totalRating = ratedBookings.reduce(
      (acc, booking) => acc + booking.lawyerRating,
      0
    );

    console.log(totalRating);
    console.log(typeof totalRating);
    const avgRating = totalRating / ratedBookings.length;
    lawyer.rating = avgRating;
    await lawyer.save();

    res.status(200).json({ message: "Rating Uploaded" });
  } catch (error) {
    console.log("Error: ", error);
    res.sendStatus(500);
  }
});

export default router;
