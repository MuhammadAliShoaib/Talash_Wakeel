import "dotenv/config.js";
import express from "express";
const app = express();
import mongoose from "mongoose";
import firmAuth from "./routes/firmAuth.js";
import clientAuth from "./routes/clientAuth.js";
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/firmAuth", firmAuth);
app.use("/clientAuth", clientAuth);

mongoose.connection.once("open", () => {
  console.log("Connected to Database");
  app.listen(PORT, () => {
    console.log(`Live on PORT ${PORT}`);
  });
});
