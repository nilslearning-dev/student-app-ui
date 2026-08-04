import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [],
  loading: false,
  error: null,
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    // Saga Action Triggers
    getStudentsFetch: (state) => {
      state.loading = true;
    },
    addStudentFetch: (state) => {
      state.loading = true;
    },
    updateStudentFetch: (state) => {
      state.loading = true;
    },
    deleteStudentFetch: (state) => {
      state.loading = true;
    },

    // Success Reducers
    getStudentsSuccess: (state, action) => {
      state.students = action.payload;
      state.loading = false;
    },
    addStudentSuccess: (state, action) => {
      state.students.push(action.payload);
      state.loading = false;
    },
    updateStudentSuccess: (state, action) => {
      state.students = state.students.map((s) =>
        s.id === action.payload.id ? action.payload : s
      );
      state.loading = false;
    },
    deleteStudentSuccess: (state, action) => {
      state.students = state.students.filter((s) => s.id !== action.payload);
      state.loading = false;
    },

    // Failure Reducer
    studentOperationFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
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