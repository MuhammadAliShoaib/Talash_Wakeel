import "dotenv/config.js";
import express from "express";
const app = express();
import mongoose from "mongoose";
import firmAuth from "./routes/firmAuth.js";
import firmRoutes from "./routes/firmRoutes.js";
import clientAuth from "./routes/clientAuth.js";
import clientRoutes from "./routes/clientRoutes.js";
import lawyerAuth from "./routes/lawyerAuth.js";
import lawyerRoutes from "./routes/lawyerRoutes.js";
import adminAuth from "./routes/adminAuth.js";
import { verifyJWT } from "./middleware/verifyJWT.js";
import cookieParser from "cookie-parser";
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/firmAuth", firmAuth);
app.use("/clientAuth", clientAuth);
app.use("/lawyerAuth", lawyerAuth);
app.use("/adminAuth", adminAuth);

app.use(verifyJWT);
app.use("/client", clientRoutes);
app.use("/firm", firmRoutes);
app.use("/lawyer", lawyerRoutes);

mongoose.connection.once("open", () => {
  console.log("Connected to Database");
  app.listen(PORT, () => {
    console.log(`Live on PORT ${PORT}`);
  });
});
