const express = require('express');
const app = express();
const urlprefix = '/api';
const mongoose = require('mongoose');
const fs = require('fs');
const cert = fs.readFileSync('keys/localhost.pem');

// SSL Options
const options = {
  server: { ssLCA: cert }
};

// MongoDB Connection String
const connstring = "mongodb+srv://Yuvin:mongoPassword12@apds.nefendu.mongodb.net/";

// Import Routes
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

// Connect to MongoDB
mongoose.connect(connstring)
  .then(() => {
    console.log('Connected');
  })
  .catch(() => {
    console.log('Not connected');
  });

// Middleware
app.use(express.json());

// CORS Configuration
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
  res.setHeader('Access-Control-Allow-Methods', '*');
  next();
});

// Routes
app.get(urlprefix + '/', (req, res) => {
  res.send('Hello Express');
});

app.use(urlprefix + '/posts', postRoutes);
app.use(urlprefix + '/users', userRoutes);

module.exports = app;
