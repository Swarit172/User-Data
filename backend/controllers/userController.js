const Submission = require('../models/user'); 
const cloudinary = require('../db/cloudinary'); 

// Fetch all submissions
exports.getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching submissions' });
  }
};


exports.createSubmission = async (req, res) => {
  try {
    const { name, socialHandle } = req.body;
    
    const images = [];
    for (const file of req.files) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream( 
        { folder: 'submissions', resource_type: 'auto' }, 
        (error, result) => {
          if(error) throw reject(error);
          resolve(result)
        }
        ).end(file.buffer);
      });

      // console.log(result)

      images.push({
        fileId: result.public_id,
        filename: result.original_filename,
        contentType: result.resource_type,
        url: result.secure_url,
      });
    }

    // Create a new submission in MongoDB
    const submission = new Submission({
      name,
      socialHandle,
      images,
    });

    await submission.save();

    res.status(201).json({ message: 'Submission created successfully', submission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating submission' });
  }
};
