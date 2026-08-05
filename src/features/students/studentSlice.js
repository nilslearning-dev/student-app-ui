import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [],
  loading: false,
  error: null,
  message: null,
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    // Saga Action Triggers
    getStudentsFetch: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addStudentFetch: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateStudentFetch: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteStudentFetch: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    // Success Reducers
    getStudentsSuccess: (state, action) => {
      state.students = action.payload;
      state.loading = false;
      state.message = null;
      state.error = null;
    },
    addStudentSuccess: (state, action) => {
      state.students.push(action.payload);
      state.loading = false;
      state.message = 'Student added successfully.';
      state.error = null;
    },
    updateStudentSuccess: (state, action) => {
      state.students = state.students.map((s) =>
        s.id === action.payload.id ? action.payload : s
      );
      state.loading = false;
      state.message = 'Student updated successfully.';
      state.error = null;
    },
    deleteStudentSuccess: (state, action) => {
      state.students = state.students.filter((s) => s.id !== action.payload);
      state.loading = false;
      state.message = 'Student deleted successfully.';
      state.error = null;
    },

    // Failure Reducer
    studentOperationFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
  },
});

export const {
  getStudentsFetch,
  addStudentFetch,
  updateStudentFetch,
  deleteStudentFetch,
  getStudentsSuccess,
  addStudentSuccess,
  updateStudentSuccess,
  deleteStudentSuccess,
  studentOperationFailure,
} = studentSlice.actions;

export default studentSlice.reducer;