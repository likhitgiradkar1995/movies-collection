import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress } from "@mui/material";
import MoviesTable from "./components/moviesTable";
import { fetchMovies } from "./store/moviesSlice";
import useFilteredMovies from "./hooks/useFilteredMovies";
import FilterBar from "./components/FilterBar";
import ThemeToggleButton from "./components/ThemeToggleButton";
import { useThemeContext } from "./context/ThemeContext";

function App() {
  const dispatch = useDispatch();
  const { loading, error, filters } = useSelector((state) => state.movies);
  const { filteredMovies, languageOptions } = useFilteredMovies();

  useEffect(() => {
    dispatch(fetchMovies({ year: filters.year }));
  }, [filters.year, dispatch]);

  return (
    <>
      <header
        style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}
      >
        <ThemeToggleButton />
      </header>
      <Box sx={{ p: 3 }}>
        <FilterBar languageOptions={languageOptions} />

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", height: 120 }}>
            <CircularProgress color="primary" size={48} />
          </Box>
        )}

        {error && (
          <Box sx={{ p: 4, textAlign: "center", color: "red" }}>{error}</Box>
        )}
        {!loading && !error && <MoviesTable movies={filteredMovies} />}
      </Box>
    </>
  );
}

export default App;
