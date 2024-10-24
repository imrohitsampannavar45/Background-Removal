import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/Mongodb.js';
import userRouter from './routes/userRoute.js';

// Function to start the server
const startServer = async () => {
  // Connect to the database
  await connectDB();

  // App Config
  const PORT = process.env.PORT || 4000;
  const app = express();

  // Initialize Middlewares
  app.use(express.json());
  app.use(cors());

  // API Routes
  app.get("/", (req, res) => res.send("API Working"));

app.use('/api/user', userRouter)




  // Start the server
  app.listen(PORT, () => console.log("Server Running on port " + PORT));
};

// Start the server
startServer().catch(error => {
  console.error("Failed to start the server:", error);
  process.exit(1); // Exit the process with failure
});
