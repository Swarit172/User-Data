import React, { useState } from 'react';
import axios from '../services/api';
import '../styles/App.css'

const UserSubmissionForm = () => {
  const [name, setName] = useState('');
  const [socialHandle, setSocialHandle] = useState('');
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('socialHandle', socialHandle);
    Array.from(images).forEach((image) => formData.append('images', image));

    try {
      await axios.post('/submissions', formData);
      alert('Submission successful!');
      // setName('');
      // setSocialHandle('');
      // setImages([]);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Submission failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>User Submission Form</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Social Handle" value={socialHandle} onChange={(e) => setSocialHandle(e.target.value)} required />
      <input type="file" multiple onChange={(e) => setImages(e.target.files)} required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserSubmissionForm;
