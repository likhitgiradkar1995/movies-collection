import { useSelector } from "react-redux";

export default function useFilteredMovies() {
  const { list: movies, filters } = useSelector((state) => state.movies);
  const { search, language, rating, sortOption } = filters;

  let filteredMovies = movies
    .filter((m) => m.title.toLowerCase().includes(search.toLowerCase()))
    .filter((m) => (language ? m.original_language === language : true))
    .filter((m) => (rating ? m.vote_average >= Number(rating) : true));

  if (sortOption === "year") {
    filteredMovies.sort(
      (a, b) => new Date(b.release_date) - new Date(a.release_date)
    );
  } else if (sortOption === "az") {
    filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "za") {
    filteredMovies.sort((a, b) => b.title.localeCompare(a.title));
  }

  const languageOptions = Array.from(
    new Set(movies.map((m) => m.original_language))
  ).filter(Boolean);

  return { filteredMovies, languageOptions };
}
