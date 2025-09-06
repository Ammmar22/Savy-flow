import { createSlice } from '@reduxjs/toolkit';

const answerSlice = createSlice({
  name: 'answers',
  initialState: {
    answers: [], // tableau des objets réponses {ref, value}
  },
  reducers: {
    setAnswers: (state, action) => {
      state.answers = action.payload;
    },
    addAnswer: (state, action) => {
      const existingIndex = state.answers.findIndex(
        (ans) => ans.ref === action.payload.ref
      );

      if (existingIndex !== -1) {
        state.answers[existingIndex] = action.payload; // si la ref existe, on remplace
      } else {
        state.answers.push(action.payload); // sinon on ajoute
      }
    },
    resetAnswers: (state) => {
      state.answers = [];
    },
  },
});

export const { setAnswers, addAnswer, resetAnswers } = answerSlice.actions;

export default answerSlice.reducer;
