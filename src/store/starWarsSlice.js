import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios  from 'axios'

export const fetchPeople = createAsyncThunk("people/fetchPeople", async (page) => {
  const response = await axios.get(`https://swapi.dev/api/people/?page=${page}`, {method:"GET"});
  return response.data;
});

const peopleSlice = createSlice({
  name: "people",
  initialState: {
    data: [],
    loading: false,
    error: null,
    activePage: 1,
  },
  reducers: {
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeople.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPeople.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload.results;
      })
      .addCase(fetchPeople.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { setActivePage } = peopleSlice.actions;

export default peopleSlice.reducer;
