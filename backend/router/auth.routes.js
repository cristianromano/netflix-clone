import { Router } from "express";
import { signIn, signOut, signUp } from "../controller/user.controller.js";

const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/signout", signOut);
authRouter.post("/signin", signIn);

export default authRouter;
