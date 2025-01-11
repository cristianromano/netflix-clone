import { Router } from "express";
import {
  getAllUsers,
  signIn,
  signOut,
  signUp,
} from "../controller/user.controller.js";

const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/signout", signOut);
authRouter.post("/signin", signIn);
authRouter.get("/all", getAllUsers);
export default authRouter;
