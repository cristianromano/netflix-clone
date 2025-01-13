import { Router } from "express";
import {
  getPopularMovies,
  getTrailerMovie,
  getTrendingMovie,
  getMovieDetails,
  getSimilarMovies,
  getMovieFromCategorie,
} from "../controller/movie.controller.js";

const movieRouter = Router();

movieRouter.get("/popular", getPopularMovies);
movieRouter.get("/trending", getTrendingMovie);
movieRouter.get("/:id/trailers", getTrailerMovie);
movieRouter.get("/:id/details", getMovieDetails);
movieRouter.get("/:id/similar", getSimilarMovies);
movieRouter.get("/:category", getMovieFromCategorie);

export default movieRouter;
