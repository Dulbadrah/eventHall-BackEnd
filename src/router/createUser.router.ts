import express from "express";
import { SignUp } from "../controller/sign-up/sign-up.controller";
import { createUser } from "../controller/user/createUser.controller";




const userRouter = express.Router();

userRouter.post("/", createUser);


export default userRouter;