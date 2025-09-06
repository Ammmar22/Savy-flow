import { createSlice } from '@reduxjs/toolkit';

const flowSlice = createSlice({
  name: 'flows',
  initialState: {
    flows: [],
  },
  reducers: {
    setFlows: (state, action) => {
      state.flows = action.payload;
    },
    addFlow: (state, action) => {
      state.flows.push(action.payload); // Ajoute un nouveau flow à l'état
    },
    updateFlow: (state, action) => {
      const index = state.flows.findIndex(flow => flow._id === action.payload._id);
      if (index !== -1) {
        state.flows[index] = action.payload; // Met à jour le flow existant
      }
    },
    deleteFlow: (state, action) => {
      state.flows = state.flows.filter(flow => flow._id !== action.payload); // Supprime le flow
    },
  },
});

export const { setFlows, addFlow, updateFlow, deleteFlow } = flowSlice.actions;

export default flowSlice.reducer;
