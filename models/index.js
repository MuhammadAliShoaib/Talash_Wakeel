import mongoose from "mongoose";
import { Firm } from "./Firm.js";
import { Lawyer } from "./Lawyer.js";
import { Client } from "./Client.js";
import { Counter } from "./Counter.js";

(async () => {
  await mongoose.connect(process.env.DB_CONNECTION_STRING);
})();

export const db = {
  Firm,
  Lawyer,
  Client,
  Counter,
};
