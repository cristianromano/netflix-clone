import { Router } from "express";
import {
  getAllUsers,
  signIn,
  signOut,
  signUp,
} from "../controller/user.controller.js";
import { protect } from "../middleware/authRoutes.js";

const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/signout", signOut);
authRouter.post("/signin", signIn);
authRouter.get("/all", protect, getAllUsers);
export default authRouter;
