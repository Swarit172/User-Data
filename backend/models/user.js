const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  fileId: String, // Cloudinary unique file ID
  filename: String, // Original file name
  contentType: String, // MIME type
  url: String, // URL to access the image
});

const submissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  socialHandle: { type: String, required: true },
  images: [imageSchema],
});

module.exports = mongoose.model('Submission', submissionSchema);
