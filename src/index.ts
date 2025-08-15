  import express from "express";
import cors from "cors";
import userRouter from "./router/user.router";
import venueRouter from "./router/venue.router";
import authRouter from "./router/auth.router";

const app = express();
const port = 4200;

app.use(express.json());
app.use(cors());

app.use("/api", userRouter);
app.use("/venue",venueRouter)
app.use("/auth", authRouter);

app.listen(port, async () => {
  console.log(`hello prisma port http://localhost:${port}`);
});
