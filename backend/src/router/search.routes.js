import { Router } from "express";
import {
  searchPerson,
  searchMovie,
  searchTv,
  getSearchHistory,
  clearSearchHistory,
  clearItemFromSearchHistory,
} from "../controller/search.controller.js";
import { protect } from "../middleware/authRoutes.js";
const searchRouter = Router();

searchRouter.get("/person/:query", protect, searchPerson);
searchRouter.get("/movie/:query", protect, searchMovie);
searchRouter.get("/tv/:query", protect, searchTv);
searchRouter.get("/search-history", protect, getSearchHistory);
searchRouter.patch("/history/clear", protect, clearSearchHistory);
searchRouter.patch("/history/clear/:id", protect, clearItemFromSearchHistory);
export default searchRouter;
