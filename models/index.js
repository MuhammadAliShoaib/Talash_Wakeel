import mongoose from "mongoose"
import { Lawyer } from "./Lawyer.js"

(async () => {
    await mongoose.connect(`mongodb://127.0.0.1:27017/talashWakeel`);
})();


export const db = {
    Lawyer,
};
