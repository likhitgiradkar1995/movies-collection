// components/FilterBar.js
import {
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SortIcon from "@mui/icons-material/Sort";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../store/moviesSlice";
import { useTheme } from "@mui/material/styles";
// import { setFilter } from "../features/movies/moviesSlice";

export default function FilterBar({ languageOptions }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.movies.filters);

  const handleChange = (key, value) => {
    dispatch(setFilter({ [key]: value }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        justifyContent: "center",
        mb: 3,
      }}
    >
      <FormControl sx={{ minWidth: 200 }}>
        <OutlinedInput
          placeholder="Search movie name..."
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
          sx={{
            borderRadius: 2,
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        />
      </FormControl>

      <FormControl
        sx={{
          minWidth: 140,
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <InputLabel>Year</InputLabel>
        <Select
          value={filters.year}
          onChange={(e) => handleChange("year", e.target.value)}
          IconComponent={ArrowDropDownIcon}
        >
          <MenuItem value="">All Years</MenuItem>
          {Array.from({ length: 25 }, (_, i) => 2025 - i).map((y) => (
            <MenuItem key={y} value={y}>
              {y}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        sx={{
          minWidth: 140,
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <InputLabel>Language</InputLabel>
        <Select
          value={filters.language}
          onChange={(e) => handleChange("language", e.target.value)}
          IconComponent={ArrowDropDownIcon}
        >
          <MenuItem value="">All Languages</MenuItem>
          {languageOptions.map((lang) => (
            <MenuItem key={lang} value={lang}>
              {lang.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        sx={{
          minWidth: 140,
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <InputLabel>Rating</InputLabel>
        <Select
          value={filters.rating}
          onChange={(e) => handleChange("rating", e.target.value)}
          IconComponent={ArrowDropDownIcon}
        >
          <MenuItem value="">All Ratings</MenuItem>
          <MenuItem value="7">7+</MenuItem>
          <MenuItem value="8">8+</MenuItem>
          <MenuItem value="9">9+</MenuItem>
        </Select>
      </FormControl>

      <FormControl
        sx={{
          minWidth: 200,
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <InputLabel>
          <SortIcon sx={{ mr: 1 }} />
          Sort By
        </InputLabel>
        <Select
          value={filters.sortOption}
          onChange={(e) => handleChange("sortOption", e.target.value)}
          IconComponent={ArrowDropDownIcon}
        >
          <MenuItem value="suggestions">Suggestions for you</MenuItem>
          <MenuItem value="year">Year Released</MenuItem>
          <MenuItem value="az">A-Z</MenuItem>
          <MenuItem value="za">Z-A</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
