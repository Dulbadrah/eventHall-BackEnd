import express from "express";

import { createUser } from "../controller/admin/createUser.controller";
import { loginUser } from "../controller/admin/getUser.controller";
import { SignUp } from "../controller/signup/SignUp";

const authRouter = express.Router();

authRouter.post("/sign-up", createUser);
authRouter.post("/login", loginUser);
authRouter.post("/sign-user", SignUp);



export default authRouter;