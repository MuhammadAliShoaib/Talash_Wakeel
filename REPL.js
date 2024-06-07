import "dotenv/config.js";
import { db } from "./models/index.js";
import bcrypt from "bcryptjs";

// const firmCouncilId = 305;

// db.Lawyer.aggregate([
//   { $match: { firmCouncilId: firmCouncilId } },
//   {
//     $lookup: {
//       from: "firms",
//       localField: "firmCouncilId",
//       foreignField: "firmCouncilId",
//       as: "firmDetails",
//     },
//   },
//   { $unwind: "$firmDetails" }, // Deconstruct the array to get a single object
//   {
//     $project: {
//       refreshToken: 0, // Exclude refreshToken from Lawyer
//       "firmDetails.refreshToken": 0, // Exclude refreshToken from Firm
//     },
//   },
// ])
//   .then((res) => console.log(JSON.stringify(res, null, 2)))
//   .then((res) => process.exit());

// const lawyerCouncilId = 281;

// db.Booking.aggregate([
//   { $match: { lawyerCouncilId } },
//   {
//     $lookup: {
//       from: "firms",
//       localField: "firmCouncilId",
//       foreignField: "firmCouncilId",
//       as: "firmDetails",
//     },
//   },
//   { $unwind: "$firmDetails" }, // Deconstruct the array to get a single object
//   {
//     $lookup: {
//       from: "lawyers",
//       localField: "lawyerCouncilId",
//       foreignField: "lawyerCouncilId",
//       as: "lawyerDetails",
//     },
//   },
//   { $unwind: "$lawyerDetails" },
//   {
//     $lookup: {
//       from: "clients",
//       localField: "clientID",
//       foreignField: "clientID",
//       as: "clientDetails",
//     },
//   },
//   { $unwind: "$clientDetails" },
//   {
//     $project: {
//       "firmDetails.refreshToken": 0, // Exclude refreshToken from Firm
//       "lawyerDetails.refreshToken": 0, // Exclude refreshToken from Firm
//       "clientDetails.refreshToken": 0, // Exclude refreshToken from Firm
//     },
//   },
// ])
//   .then((res) => console.log(JSON.stringify(res, null, 2)))
//   .then((res) => process.exit());

const name = "Muneeb";
const email = "muneeb@talashwakeel.com";
const password = "admin.123";
const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(password, salt);

db.Admin.create({
  adminName: name,
  adminEmail: email,
  adminPassword: hashedPassword,
})
  .then((res) => console.log(JSON.stringify(res, null, 2)))
  .then((res) => process.exit());
