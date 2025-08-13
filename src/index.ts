
import cors from "cors";

import express from "express"
import authRouter from "./router/auto.router";
import userRouter from "./router/createUser.router";
 
const app = express();
const port = 4200;
 
app.use(express.json());
app.use(cors());
 
 
app.use("/auth",authRouter);    
app.use("/user",userRouter);    
 
app.listen(port, async () => {
  console.log(`hello prisma port http://localhost:${port}`);
});
 
