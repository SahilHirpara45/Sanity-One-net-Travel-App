// filters.slice.jsx
import { createSlice } from "@reduxjs/toolkit";

export const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    selectedFilter: null, // No filter selected initially
  },
  reducers: {
    setSelectedFilter: (state, action) => {
      state.selectedFilter = action.payload;
    },
  },
});

export const { setSelectedFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
