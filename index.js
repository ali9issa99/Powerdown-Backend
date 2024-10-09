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
dotenv.config();
import usersRoutes from "./src/routes/usersRoutes.js";
import authRoutes from "./src/routes/authRoutes.js"; 
import connectToDatabase from "./src/database/connection.js";
import cors from 'cors';
import { spawn } from 'child_process';


// Start websockets.js as a child process
const webSocketProcess = spawn('node', ['./src/services/websockets.js'], {
  stdio: 'inherit' // This will pipe the output from websockets.js to the main terminal
});

webSocketProcess.on('error', (error) => {
  console.error(`WebSocket server failed to start: ${error.message}`);
});

webSocketProcess.on('close', (code) => {
  console.log(`websockets.js process exited with code ${code}`);
});

// Rest of your index.js logic...
console.log('index.js is running...');

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Authentication routes
app.use("/auth", authRoutes);

// User routes (includes embedded routes)
app.use("/users", usersRoutes);

app.listen(8080, () => {
  console.log("Server running on port 8080");
  connectToDatabase();
});

