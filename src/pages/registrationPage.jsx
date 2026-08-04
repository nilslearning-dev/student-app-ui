import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStudentsFetch,
  addStudentFetch,
  updateStudentFetch,
  deleteStudentFetch,
} from '../features/students/studentSlice';
import RegistrationForm from '../features/students/components/registrationForm';
import StudentList from '../features/students/components/studentList';

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.students);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    dispatch(getStudentsFetch());
  }, [dispatch]);

  const handleFormSubmit = (formData) => {
    if (selectedStudent) {
      dispatch(updateStudentFetch({ id: selectedStudent.id, studentData: formData }));
      setSelectedStudent(null);
    } else {
      dispatch(addStudentFetch(formData));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteStudentFetch(id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Student Registration Management</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <RegistrationForm
        onSubmit={handleFormSubmit}
        selectedStudent={selectedStudent}
        clearSelection={() => setSelectedStudent(null)}
      />
      {loading ? <p>Loading students...</p> : <StudentList students={students} onEdit={setSelectedStudent} onDelete={handleDelete} />}
    </div>
  );
};

export default RegistrationPage;