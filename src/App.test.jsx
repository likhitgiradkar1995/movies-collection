import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App";
import moviesReducer from "./store/moviesSlice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});

test("renders search input", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const searchInput = screen.getByPlaceholderText(/search movie name/i);
  expect(searchInput).toBeInTheDocument();
});
