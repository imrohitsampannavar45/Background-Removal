import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Event listeners for the mongoose connection
    mongoose.connection.on('connected', () => {
      console.log("Database Connected");
    });

    mongoose.connection.on('error', (err) => {
      console.error(`Database connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log("Database Disconnected");
    });

    // Connect to MongoDB without deprecated options
    await mongoose.connect(`${process.env.MONGODB_URI}/bg-removal`);

    console.log("MongoDB connection established successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
