import { createSlice } from '@reduxjs/toolkit';

const startupSlice = createSlice({
  name: 'startups',
  initialState: {
    startups: [],
  },
  reducers: {
    setStartups: (state, action) => {
      state.startups = action.payload;
    },
    addStartup: (state, action) => {
      state.startups.push(action.payload); // Ajoute une nouvelle startup à l'état
    },
    updateStartup: (state, action) => {
      const index = state.startups.findIndex(startup => startup._id === action.payload._id);
      if (index !== -1) {
        state.startups[index] = action.payload; // Met à jour la startup existante
      }
    },
    deleteStartup: (state, action) => {
      state.startups = state.startups.filter(startup => startup._id !== action.payload); // Supprime la startup
    },
  },
});

export const { setStartups, addStartup, updateStartup, deleteStartup } = startupSlice.actions;

export default startupSlice.reducer;
