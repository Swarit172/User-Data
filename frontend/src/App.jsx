import React from 'react';
import UserSubmissionForm from './components/UserSubmissionForm';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  return (
    <div style={{ padding: '20px' }}>
      <UserSubmissionForm />
      <hr />
      <AdminDashboard />
    </div>
  );
};

export default App;
