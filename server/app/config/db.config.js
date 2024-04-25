// app/models/db.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const url = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to the database!');
  } catch (err) {
    console.error('Cannot connect to the database!', err);
    process.exit(1); // Exit process with failure
  }
};

export { connectDB, mongoose };
