const Submission = require('../models/user');

// Fetch all submissions
exports.getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching submissions' });
  }
};

// Handle new submission
exports.createSubmission = async (req, res) => {
  try {
    const { name, socialHandle } = req.body;
    const images = req.files.map((file) => `/uploads/${file.filename}`);

    const newSubmission = new Submission({ name, socialHandle, images });
    await newSubmission.save();
    res.status(201).json(newSubmission);
  } catch (error) {
    res.status(500).json({ message: 'Error creating submission' });
  }
};
