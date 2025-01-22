import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import '../styles/App.css';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const { data } = await axios.get('/submissions');
        setSubmissions(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      {submissions.length > 0 ? (
        submissions.map((submission, index) => (
          <div key={index} className="submission">
            <h3>{submission.name}</h3>
            <p>Social Media: {submission.socialHandle}</p>
            <div className="images">
              {submission.images.map((image, imgIndex) => (
                <img
                  key={imgIndex}
                  src={`${import.meta.env.VITE_BACKEND_URL}${image}`}
                  alt={`Submission ${index + 1} Image ${imgIndex + 1}`}
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
