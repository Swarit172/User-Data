const express = require('express');
const multer = require('multer');
const { getSubmissions, createSubmission } = require('../controllers/userController');

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only images are allowed'), false);
    }
    cb(null, true);
  },
});

// Routes
router.get('/', getSubmissions);
router.post('/', upload.array('images', 10), createSubmission);

module.exports = router;
