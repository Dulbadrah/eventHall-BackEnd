<<<<<<< HEAD

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
 
=======
  import express from "express";
import cors from "cors";
import userRouter from "./router/user.router";
import venueRouter from "./router/venue.router";

const app = express();
const port = 3002;

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/venue",venueRouter)
app.listen(port, async () => {
  console.log(`hello prisma port http://localhost:${port}`);
});
>>>>>>> 18d2958 (1)
