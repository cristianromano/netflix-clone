import { Router } from "express";

const tvShowsRouter = Router();

tvShowsRouter.get("/popular", getPopularMovies);
tvShowsRouter.get("/trending", getTrendingMovie);
tvShowsRouter.get("/:id/trailers", getTrailerMovie);
tvShowsRouter.get("/:id/details", getMovieDetails);
tvShowsRouter.get("/:id/similar", getSimilarMovies);
tvShowsRouter.get("/:category", getMovieFromCategorie);

export default tvShowsRouter;
