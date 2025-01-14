import { Router } from "express";
import {
  searchPerson,
  searchMovie,
  searchTv,
} from "../controller/search.controller.js";
import { protect } from "../middleware/authRoutes.js";
const searchRouter = Router();

searchRouter.get("/person/:query", protect, searchPerson);
searchRouter.get("/movie/:query", protect, searchMovie);
searchRouter.get("/tv/:query", protect, searchTv);

export default searchRouter;
