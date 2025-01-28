import React, { useState } from 'react';
import axios from '../services/api';
import '../styles/App.css';

const UserSubmissionForm = () => {
  const [name, setName] = useState('');
  const [socialHandle, setSocialHandle] = useState('');
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('socialHandle', socialHandle);
    Array.from(images).forEach((image) => formData.append('images', image));

    try {
      await axios.post('/submissions', formData); // Ensure your backend URL is correct
      setMessage({ type: 'success', text: 'Submission successful!' });
      setName('');
      setSocialHandle('');
      setImages([]);
      window.location.reload(); // Refresh the page after submission
    } catch (err) {
      console.error(err);
      const errorText =
        err.response?.data?.message || 'Submission failed. Please try again later.';
      setMessage({ type: 'error', text: errorText });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="submission-form">
        <h2>User Submission Form</h2>

        {message.text && (
          <p className={`message ${message.type}`}>
            {message.text}
          </p>
        )}

        <label>
          Name:
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Social Handle:
          <input
            type="text"
            placeholder="Enter your social handle"
            value={socialHandle}
            onChange={(e) => setSocialHandle(e.target.value)}
            required
          />
        </label>

        <label>
          Images:
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            accept="image/*"
            required
          />
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default UserSubmissionForm;
