import mongoose from "mongoose";
import { Firm } from "./Firm.js";
import { Lawyer } from "./Lawyer.js";
import { Client } from "./Client.js";
import { Counter } from "./Counter.js";
import { Booking } from "./Booking.js";
import { Admin } from "./Admin.js";

(async () => {
  try {
    // console.log("URI", process.env.DB_CONNECTION_STRING);
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
})();

export const db = {
  Firm,
  Lawyer,
  Client,
  Counter,
  Booking,
  Admin,
};
