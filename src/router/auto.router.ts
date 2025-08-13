import express from "express";
import { SignUp } from "../controller/sign-up/sign-up.controller";




const authRouter = express.Router();

authRouter.post("/sign-up", SignUp);


export default authRouter;