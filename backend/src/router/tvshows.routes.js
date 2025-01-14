import { Router } from "express";
import {
  getTvShowsDetails,
  getPopularTvShows,
  getTvShowsFromCategorie,
  getSimilarTvShows,
  getTrailerTv,
  getTrendingTvShows,
} from "../controller/tv.controller.js";
const tvShowsRouter = Router();

tvShowsRouter.get("/popular", getPopularTvShows);
tvShowsRouter.get("/trending", getTrendingTvShows);
tvShowsRouter.get("/:id/trailers", getTrailerTv);
tvShowsRouter.get("/:id/details", getTvShowsDetails);
tvShowsRouter.get("/:id/similar", getSimilarTvShows);
tvShowsRouter.get("/:category", getTvShowsFromCategorie);

export default tvShowsRouter;
