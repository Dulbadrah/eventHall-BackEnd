import express from "express";
import { createUser } from "../controller/user/createUser.controller";

const userRouter = express.Router();

userRouter.post("/", createUser);

export default userRouter;
