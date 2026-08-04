import API from '../../../services/api';

export const fetchStudentsApi = () => API.get('/students');
export const createStudentApi = (studentData) => API.post('/students', studentData);
export const updateStudentApi = (id, studentData) => API.put(`/students/${id}`, studentData);
export const deleteStudentApi = (id) => API.delete(`/students/${id}`);