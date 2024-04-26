import express from 'express';
import cors from 'cors';
import morgan from "morgan";
import { connectDB } from "./app/config/db.config.js"; 
import ticketRoutes from "./app/routes/ticket.routes.js";
import authRoutes from "./app/routes/auth.routes.js"

const app = express();

const corsOptions = {
  origin: 'http://localhost:4200'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev")); // HTTP request logger middleware

connectDB(); // Connect to MongoDB

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my application.' });
});

//use auth routes
app.use('/api', authRoutes);
// Use tutorial routes
app.use('/api/ticket', ticketRoutes);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
