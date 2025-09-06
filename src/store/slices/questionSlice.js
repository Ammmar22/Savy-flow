import { createSlice } from '@reduxjs/toolkit';

const questionSlice = createSlice({
  name: 'questions',
  initialState: {
    questions: [],
  },
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    addQuestion: (state, action) => {
      state.questions.push(action.payload); 
    },
    updateQuestion: (state, action) => {
      const index = state.questions.findIndex(question => question._id === action.payload._id);
      if (index !== -1) {
        state.questions[index] = action.payload;
      }
    },
    deleteQuestion: (state, action) => {
      state.questions = state.questions.filter(question => question._id !== action.payload); // Supprime la question
    },
  },
});

export const { setQuestions, addQuestion, updateQuestion, deleteQuestion } = questionSlice.actions;

export default questionSlice.reducer;
