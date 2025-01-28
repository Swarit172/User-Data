const express = require('express');
const multer = require('multer');
const { getSubmissions, createSubmission } = require('../controllers/userController');

const router = express.Router();

// Multer Configuration
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
  },
});

// Routes
router.get('/', getSubmissions);
router.post('/', upload.array('images', 10), createSubmission);

module.exports = router;
