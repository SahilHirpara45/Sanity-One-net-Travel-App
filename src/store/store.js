import { configureStore } from "@reduxjs/toolkit";
import placesSlice from "./places/places.slice";
import filtersSlice from "./places/filters.slice";

export const store = configureStore({
  reducer: {
    places: placesSlice,
  },
});
