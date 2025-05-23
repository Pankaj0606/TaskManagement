const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// --- 1. INITIALIZE APP ---
const app = express();

// --- 2. MIDDLEWARE ---
// This line tells Express to parse incoming JSON.
// It MUST come before you register your routes.
app.use(express.json());

// --- 3. ROUTES ---
// Import your route files
const userRoutes = require('./routes/user.routes');
const taskRoutes = require('./routes/task.routes');

// Register the routes
app.use('/api', userRoutes);
app.use('/api', taskRoutes);

// --- 4. DEFINE PORT ---
const PORT = process.env.PORT || 3000;

// --- 5. CONNECT TO DATABASE & START SERVER ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Only start listening for requests after the DB connection is successful
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1); // Exit the process if DB connection fails
  });