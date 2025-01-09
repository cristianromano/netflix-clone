import { Router } from "express";
import { signUp } from "../controller/user.controller.js";

const authRouter = Router();

authRouter.post("/signup", signUp);

export default authRouter;
