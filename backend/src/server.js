import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); //allows to get req.body as json

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(3000, () => {
    console.log("running");
  });
});
