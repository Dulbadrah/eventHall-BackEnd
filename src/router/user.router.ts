import express from "express";
import { createUser } from "../controller/admin/createUser.controller";
import { loginUser } from "../controller/admin/getUser.controller";

const userRouter = express.Router();

userRouter.post("/sign-up", createUser);
userRouter.post("/sign-in", loginUser);

export default userRouter;
