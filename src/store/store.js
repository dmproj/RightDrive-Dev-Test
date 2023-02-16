import { configureStore } from "@reduxjs/toolkit";
import peopleReducer from "./starWarsSlice";

const store = configureStore({
  reducer: {
    people: peopleReducer,
  },
});

export default store;
