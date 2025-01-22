const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  socialHandle: { type: String, required: true },
  images: [{ type: String, required: true }], // Array of image paths
});

module.exports = mongoose.model('Submission', submissionSchema);
