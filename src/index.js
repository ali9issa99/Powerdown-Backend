// import express from "express";
// import dotenv from "dotenv";
// import usersRoutes from "./routes/usersRoutes.js";
// import devicesRoutes from "./routes/devicesRoutes.js";
// import roomsRoutes from "./routes/roomsRoutes.js"
// import AISuggestionsRoutes from "./routes/AiSuggestionsRoutes.js";
// import analyticsRoutes  from "./routes/analyticsRoutes.js";
// import consumptionRoutes from "./routes/consumptionRoutes.js"
// import authRoutes from "./routes/authRoutes.js"; 
// import connectToDatabase from "./database/connection.js";



// dotenv.config();
// const app = express();

// app.use(express.json());

// app.use("/auth", authRoutes); 
// app.use("/users", usersRoutes);
// app.use('/devices',devicesRoutes);
// app.use('/rooms',roomsRoutes);
// app.use('/aisuggestion',AISuggestionsRoutes);
// app.use('/analytics',analyticsRoutes);
// app.use('/consumption',consumptionRoutes);

// app.listen(8080, () => {
//   console.log("Server running on port 8080");
//   connectToDatabase();
// });


import express from "express";
import dotenv from "dotenv";
import usersRoutes from "./routes/usersRoutes.js";
import authRoutes from "./routes/authRoutes.js"; 
import connectToDatabase from "./database/connection.js";

dotenv.config();
const app = express();

app.use(express.json());

// Authentication routes
app.use("/auth", authRoutes);

// User routes (includes embedded routes)
app.use("/users", usersRoutes);

app.listen(8080, () => {
  console.log("Server running on port 8080");
  connectToDatabase();
});

