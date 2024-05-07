import { db } from "./models/index.js";

const clientId = 2;

db.Booking.aggregate([
  {
    $match: { clientId: clientId },
  },
  {
    $lookup: {
      from: "Firm",
      localField: "firmId",
      foreignField: "barCouncilId",
      as: "firm",
    },
  },
])
  .then((res) => console.log(JSON.stringify(res)))
  .then((res) => process.exit());
