import express from "express";
import dotenv from "dotenv";
import usersRoutes from "./routes/usersRoutes.js";
import devicesRoutes from "./routes/devicesRoutes.js";
import roomsRoutes from "./routes/roomsRoutes.js"
import AISuggestionsRoutes from "./routes/AiSuggestionsRoutes.js";
import connectToDatabase from "./database/connection.js";


dotenv.config();
const app = express();

app.use(express.json());

app.use("/users", usersRoutes);
app.use('/devices',devicesRoutes);
app.use('/rooms',roomsRoutes);
app.use('/aisuggestion',AISuggestionsRoutes);

app.listen(8080, () => {
  console.log("Server running on port 8080");
  connectToDatabase();
});
