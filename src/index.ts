
 
import cors from "cors";

import express from "express"
import authRouter from "./router/auto.router";
 
const app = express();
const port = 4200;
 
app.use(cors());
 
 
app.use("/auth",authRouter);    
 
app.listen(port, async () => {
  console.log(`hello prisma port http://localhost:${port}`);
});
 
app.use(express.json());
app.use(cors());