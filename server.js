// Imports & Dependencies
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// Express Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mongoose stuff
mongoose.connect(
  process.env.MONGODB_URI ||
    'mongodb://localhost:27017/social-network',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.set('debug', true);

// API Routes
app.use(require('./routes'));

// Server connection
app.listen(PORT, () =>
  console.log(`🌍 Connected on localhost:${PORT}`)
);
