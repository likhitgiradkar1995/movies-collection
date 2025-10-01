import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  TablePagination,
  Stack,
  Chip,
  Tooltip,
  Avatar,
  Box,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import LanguageIcon from "@mui/icons-material/Language";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// ...existing imports...

export default function MoviesTable({ movies }) {
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 6;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: 4 }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography fontWeight="bold" color="primary">
                  TITLE
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold" color="primary">
                  <CalendarMonthIcon fontSize="small" sx={{ mr: 1 }} />
                  RELEASE DATE
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold" color="primary">
                  <LanguageIcon fontSize="small" sx={{ mr: 1 }} />
                  LANGUAGE
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold" color="primary">
                  <StarIcon fontSize="small" sx={{ mr: 1, color: "#FFD700" }} />
                  RATING
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold" color="primary">
                  VOTE COUNT
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold" color="primary">
                  DETAILS
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography color="text.secondary" sx={{ py: 4 }}>
                    No movies found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              movies
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={row.id || index} hover>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar
                          variant="rounded"
                          src={
                            row.poster_path
                              ? `https://image.tmdb.org/t/p/w92${row.poster_path}`
                              : undefined
                          }
                          alt={row.title}
                          sx={{ width: 48, height: 64, bgcolor: "#eee" }}
                        >
                          {row.title[0]}
                        </Avatar>
                        <Box>
                          <Typography fontWeight="600">{row.title}</Typography>
                          <Chip
                            label={
                              row.genre_ids?.length
                                ? `Genres: ${row.genre_ids.length}`
                                : "No Genre"
                            }
                            size="small"
                            sx={{ mt: 0.5 }}
                          />
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Tooltip title={row.release_date}>
                        <Typography color="primary">
                          {row.release_date
                            ? new Date(row.release_date).toLocaleDateString()
                            : "N/A"}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={<LanguageIcon />}
                        label={row.original_language?.toUpperCase()}
                        color="info"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <StarIcon sx={{ color: "#FFD700" }} fontSize="small" />
                        <Typography fontWeight="bold">
                          {row.vote_average}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography>{row.vote_count}</Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        startIcon={<InfoOutlinedIcon />}
                        href={`https://www.themoviedb.org/movie/${row.id}`}
                        target="_blank"
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" justifyContent="flex-end" sx={{ p: 2 }}>
        <TablePagination
          component="div"
          count={movies.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
        />
      </Stack>
    </Paper>
  );
}
