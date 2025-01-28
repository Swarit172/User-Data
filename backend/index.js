const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const submissionRoutes = require('./routes/user');
require("./db/mongoosee")

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;


app.use(express.json());
app.use(cors({
    origin: FRONTEND_URL,
    methods: ['GET', 'POST']
}));

app.use('/api/submissions', submissionRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server' });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
