import express from "express";
import { createUser } from "../controller/user/createUser.controller";
import { loginUser } from "../controller/user/getUser.controller";

const userRouter = express.Router();

userRouter.post("/sign-up", createUser);
userRouter.post("/sign-in", loginUser);

export default userRouter;
