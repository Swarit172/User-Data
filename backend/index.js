const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const submissionRoutes = require('./routes/user');

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors({
    origin: FRONTEND_URL,
    methods: ['GET', 'POST']
}))

app.use('/api/submissions',submissionRoutes)

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Database connection error:', err));

// Routes
app.use('/api/submissions', submissionRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
