import express from "express";
import dotenv from "dotenv";
import usersRoutes from "./routes/usersRoutes.js";
import connectToDatabase from "./database/connection.js";


dotenv.config();
const app = express();

app.use(express.json());

app.use("/users", usersRoutes);

app.listen(8080, () => {
  console.log("Server running on port 8080");
  connectToDatabase();
});
