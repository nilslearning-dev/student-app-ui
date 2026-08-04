import React, { useState, useEffect } from 'react';

const RegistrationForm = ({ onSubmit, selectedStudent, clearSelection }) => {
  const [formData, setFormData] = useState({ name: '', email: '', course: '' });

  useEffect(() => {
    if (selectedStudent) {
      setFormData({ name: selectedStudent.name, email: selectedStudent.email, course: selectedStudent.course });
    } else {
      setFormData({ name: '', email: '', course: '' });
    }
  }, [selectedStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', email: '', course: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc' }}>
      <h3>{selectedStudent ? 'Edit Student' : 'Register New Student'}</h3>
      <input
        type="text"
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Course Name"
        value={formData.course}
        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
        required
      />
      <button type="submit">{selectedStudent ? 'Update Student' : 'Register'}</button>
      {selectedStudent && <button type="button" onClick={clearSelection}>Cancel</button>}
    </form>
  );
};

export default RegistrationForm;