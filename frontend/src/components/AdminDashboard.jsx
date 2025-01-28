// export default AdminDashboard;
import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import '../styles/App.css';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const { data } = await axios.get('/submissions'); // Ensure the endpoint matches your backend
        setSubmissions(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch submissions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>

      {loading ? (
        <p>Loading submissions...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : submissions.length > 0 ? (
        submissions.map((submission, index) => (
          <div key={index} className="submission">
            <h3>{submission.name}</h3>
            <p>Social Media: {submission.socialHandle}</p>
            <div className="images">
              {submission.images.map((image, imgIndex) => (
                <img
                  key={imgIndex}
                  src={`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}${image}`}
                  alt={`Submission ${index + 1} Image ${imgIndex + 1}`}
                  className="submission-image"
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No submissions yet.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
