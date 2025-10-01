import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTllZDY4OTNlYTBmNDg0OWVmYWQ1M2JjOWQ2MTYxOCIsIm5iZiI6MTQ5MzQ4NzA0Ni42NTI5OTk5LCJzdWIiOiI1OTA0Y2RjM2MzYTM2ODRhNjgwMGViNDIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hfl5rWbUostoR-8CjhfWE2YoXEdoMop9LgEsgHdun1U";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ year }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            accept: "application/json",
          },
          params: {
            include_adult: false,
            include_video: false,
            language: "en-US",
            page: 1,
            ...(year && { primary_release_year: year }),
          },
        }
      );
      return res.data.results;
    } catch (err) {
      return rejectWithValue("Failed to fetch movies.");
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    list: [],
    loading: false,
    error: "",
    filters: {
      search: "",
      year: "",
      language: "",
      rating: "",
      sortOption: "suggestions",
    },
  },
  reducers: {
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setFilter } = moviesSlice.actions;
export default moviesSlice.reducer;
