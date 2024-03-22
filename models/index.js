import mongoose from "mongoose"
import { Firm } from "./Firm.js";
import { Lawyer } from "./Lawyer.js"
import { Client } from "./Client.js";

(async () => {
    await mongoose.connect(`mongodb://127.0.0.1:27017/talashWakeel`);
})();


export const db = {
    Firm,
    Lawyer,
    Client,
};
